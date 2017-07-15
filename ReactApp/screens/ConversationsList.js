'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'

// Screens
import Messenger from './Messenger';
import CreateConversation from './CreateConversation';

// Components
import Button from '../components/button';
import ListRow from '../components/list.row';
import ListSearch from '../components/list.search';
import A from '../components/anchor';
import MiText from '../components/text';
import MiTransText from '../components/MiTransText';
import ActionBar from '../components/actionbar';

// Images
const more = require('../assets/images/navbar/more@2x.png');
const hamburger = require('../assets/images/navbar/hamburger.png');

export class ConversationsList extends Component {

  constructor(props){
    super(props);

    this.state = {
        moreActive: false,
        moreOption: -1,
        searchTerm: ''
    }
    this.renderRow = this.renderRow.bind(this);
    this.renderConversations = this.renderConversations.bind(this);
    this.onDropdownWillShow = this.onDropdownWillShow.bind(this);
    this.onDropdownWillHide = this.onDropdownWillHide.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.more = {
        options: ['New Chat', 'Organize'],
        adjustFrame: this.adjustFrame,
        onSelect: this.onSelect,
        onDropdownWillShow: this.onDropdownWillShow,
        onDropdownWillHide: this.onDropdownWillHide,
        renderRow: this.renderRow
    };
  }

  componentDidMount() {
    this.refs.scrollView.scrollTo({x:0, y: Style.UNIT_Y, animated: false});
  }

  goToConversation(name, convo) {
    this.props.navigator.push({
      title: name,
      data: convo,
      component: Messenger,
      index: 1
    });
  }

  createConversation() {
    this.props.navigator.push({
      pageId: '',
      title: '',
      component: CreateConversation,
      index: 1
    });
  }

  renderConversations() {
        let i = 0;
        let tiles = this.props.conversations.data
          .map(convo => {
            i++;
            const profileImage = convo.photoUrl ? {uri: convo.photoUrl}: null;

            let name = convo.stream ? convo.name : null;
            if (!name && convo._embedded.participants.count > 1) {
                name = convo._embedded.participants._embedded.items.reduce((a, b) => {
                    if (!a || !a.userId) {
                        return 'Sales';
                    }
                    return a.userId.split('@')[0] + ', ' + b.userId.split('@')[0]
                });
            } else if (!name && convo._embedded.participants.count > 0) {
                name = convo._embedded.participants._embedded.items[0].userId.split('@')[0];
            }

            let preview = 'No messages';
            if (!preview && convo._embedded.messages.count > 0) {
                preview = convo._embedded.messages._embedded.items[0];
            }

            return {
              name: name,
              convo: convo,
              profileImage,
              preview,
              key: i
            }
          })
          .filter(convo => convo.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1)
          .map(data => {
            return (<ListRow
                    disabled={this.state.moreActive}
                    color={'#404141'}
                    onClick={()=>{this.goToConversation(data.name, data.convo)}}
                    key={data.key}
                    imageSrc={data.profileImage}
                    leftText={data.name}
                    rightText={data.preview} />)
        });

        return tiles;
  }

  renderRow(rowData, rowID, highlighted) {
    return (
      <View><A>
        <View style={[AppStyles.row,styles.dropdown_row]}>
          <MiText style={[styles.dropdown_row_text, highlighted && {color: 'mediumaquamarine'}]}>
            {rowData}
          </MiText>
        </View>
      </A></View>
    );
  }

  adjustFrame(style) {
    style.right += 1;
    return style;
  }

  onSelect(index, value) {
    this.setState({moreOption: index});
  }

  onDropdownWillShow() {
    this.setState({moreActive: true});
  }

  onDropdownWillHide() {
    this.setState({moreActive: false});
  }

  componentWillUpdate(nextProps, nextState) {
      if (nextState.moreOption != -1 && !nextState.moreActive) {
        this.createConversation();
    }
  }

  render(){
    const bgC = this.state.moreActive ? 'rgba(0,0,0,0.4)' : null;
    const padding = Platform.OS === 'ios' ? {padding: Style.PADDING, paddingTop: Style.getHeight(200)} : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return <View style={[{flex:1, backgroundColor: bgC}, padding]}>

        {Platform.OS === 'android' &&
        <ActionBar pageLabel={'Chats'} drawer={this.props.drawer} more={this.more} />
        }
        {Platform.OS === 'ios' &&
        <ActionBar pageLabel={'Chats'} drawer={null} more={this.more} />
        }

        <ScrollView ref={'scrollView'} style={[listPadding]} contentContainerStyle={[{marginBottom: 20}]}>
            <ListSearch
                onChangeText={(searchTerm) => this.setState({searchTerm})}
                searchTerm={this.state.searchTerm}
            />
            {this.renderConversations()}
        </ScrollView>
    </View>
  }


}

const styles = StyleSheet.create({
    dropdown_row_text: {
        marginHorizontal: 4,
        fontSize: 14,
        color: 'navy',
        textAlignVertical: 'center',
    },
    dropdown: {
        width: Style.getWidth(200),
        height: Style.getHeight(100),
        margin:1,
        borderWidth: 0,
        shadowColor: 'transparent'
    },
    dropdown_row: {
        width: Style.getWidth(200),
        alignItems: 'center',
    },
    hamburger: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: Style.PADDING,
        flex: 1
    }
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  conversations: state.conversations
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);
