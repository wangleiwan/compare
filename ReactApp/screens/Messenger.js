import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';
import {GiftedChat, Actions, Composer} from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

// App Globals
import AppStyles, {Style,underlayColor, backgroundColor} from '../styles'

import MessengerActions from '../components/messenger-actions';
import Message from '../components/messenger-message';
import MessageText from '../components/messenger-text';
import MessageImage from '../components/messenger-image';
import Bubble from '../components/messenger-bubble';
import A from '../components/anchor';
import MiText from '../components/text';

import MiTransText from '../components/MiTransText';

import {loadMsgs, createMsg, loadAttachment, sendAttachment} from '../redux/conversations';
import {subscribe, unsubscribe} from '../redux/conversations';

//localization wrapper
import I18n from 'react-native-i18n';
import Translations from '../TranslationWrapper';

const back = require('../assets/images/navbar/back@2x.png');
const call = require('../assets/images/navbar/call@2x.png');
const loadingGif = require('../assets/images/loading.gif');

export class Messenger extends React.Component {
  constructor(props) {
    super(props);
    
    const loadEarlier = props.data && props.data.conversationId && 
                        props.conversations && props.conversations.messages && props.conversations.messages[props.data.conversationId] 
                        ? props.conversations.messages[props.data.conversationId].earlierMessages : false;

    this.state = {
      messages: [],
      loadEarlier: loadEarlier,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderComposer = this.renderComposer.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    if(this.props.data && this.props.data.conversationId) {
      this.props.loadMsgs(this.props.data.conversationId);
    }
  }

  componentDidMount() {
    if(this.props.data && this.props.data.conversationId) {
      this.props.subscribe(this.props.data.conversationId);
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
    // built-in notifications
    if (this.props.data.conversationId) {
      this.props.unsubscribe(this.props.data.conversationId);
    }

    // raw notifications unsubscribe
    /*if (this.props.conversations.subscription) {
      this.props.unsubscribe(this.props.conversations.subscription);
    }*/
  }

  componentWillReceiveProps(nextProps) {
      if(!this.props.data || !this.props.data.conversationId) return;

      const j = JSON.stringify(nextProps.conversations.messages[this.props.data.conversationId]);
      if (!j) return;
      this.setState({messages: JSON.parse(j).map(msg => {
              if (msg.body.attachment && !msg.body.image) {
                  this.props.loadAttachment(this.props.data.conversationId, msg.body.attachment.name);
                  msg.body.image = loadingGif;
              }

              return {
                  ...msg.body,
                  _id: msg.messageId,
                  user: { _id: msg.createdBy, ...this.props.users.mappedUsers[msg.createdBy] },
              }
          })
      })
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  formatImage(rawImage) {
    const arr = rawImage.name.split('.');

    let format = '';
    if (arr.length > 0) {
        format = arr[arr.length-1];
    }
    format = format.toLowerCase();

    const name = uuid() + '.' + format;
    const type = 'image/' + format;
    return { name, type, data: 'data:'+type+';base64,'+rawImage.data};
  }

  onSend(messages = []) {
    if(!this.props.data || !this.props.data.conversationId) return;

    messages.forEach(msg => {

        if (msg.image) {
            const image = this.formatImage(msg.image);
            delete msg.image;

            this.props.sendAttachment(this.props.data.conversationId, image).then(() => {
                msg.body = JSON.stringify({ attachment: { name: image.name, type: image.type } });
                this.props.createMsg(this.props.data.conversationId, msg);
            });

            return;
        }

        msg.body = JSON.stringify({ text: msg.text, location: msg.location, image: msg.image});

        this.props.createMsg(this.props.data.conversationId, msg);
    })
  }

  getCurrentUser() {
    return this.props.auth && this.props.auth.user ? { _id:this.props.auth.user.userId, ...this.props.auth.user } : null;
  }

  renderCustomActions(props) {
    return (
        <MessengerActions
          {...props}
        />
      );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderMessage(props) {
    return (
      <Message
        {...props}
      />
    );
  }

  renderMessageText(props) {
    return (
      <MessageText
        {...props}
      />
    );
  }

  renderMessageImage(props) {
    return (
      <MessageImage
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={[styles.footerContainer, {height: 30}]}>
          <MiText>
            {this.state.typingText}
          </MiText>
        </View>
      );
    }
    return <View style={{height: 30}}/>;
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        placeholder={I18n.t('TypeAMessage')}
      />
    );
  }

  renderTitle() {
    const title = this.props.data ? this.props.data.name : '';
    return <View>
            <MiTransText color={"dark"} center>{title}</MiTransText>
          </View>
    /*
    return <TextInput
                    style={{height: 40, borderWidth: 0}}
                    placeholder={'Search'}
                    onChangeText={(searchTerm) => this.setState({searchTerm})}
                    value={this.state.searchTerm}
                />
    */
  }

  render() {
    return (<View style={{flex:1, padding: 10}}>
            <View style ={[styles.row]}>
                <A onPress={this.props.navigator.pop} style={[styles.corner]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={back} />
                </A>
                <View style={[styles.textInputOuter]}>
                    {this.renderTitle()}
                </View>
                <A onPress={()=>{}} style={[styles.corner]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={call} />
                </A>
            </View>
            <View style={[{flex:1, backgroundColor: backgroundColor}]}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}

                    user={this.getCurrentUser()}

                    renderMessage={this.renderMessage}
                    renderMessageText={this.renderMessageText}
                    renderMessageImage={this.renderMessageImage}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderComposer={this.renderComposer}
                    renderFooter={this.renderFooter}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: Style.getHeight(50),
    },
    corner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        width: Style.getWidth(40),
        height: Style.getHeight(40),
    },
    profileImage: {
        height: 18,
    },
    textInputOuter: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        padding: 5,
        flex: 1,
        height: Style.getHeight(40)
    },
    footerContainer: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  conversations: state.conversations,
  users: state.users,
  auth: state.auth
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    loadMsgs,
    createMsg,
    loadAttachment,
    sendAttachment,
    subscribe,
    unsubscribe
};

I18n.fallbacks = true;
I18n.translations = Translations;


export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
