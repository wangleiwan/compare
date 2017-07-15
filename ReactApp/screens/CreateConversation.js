import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

// App Globals
import AppStyles, {underlayColor} from '../styles';

import { createConv as createConversation } from '../redux/conversations';
import ListRow from '../components/list.row';
import Messenger from './Messenger';
import MiTextInput from '../components/MiTextInput';
import A from '../components/anchor';

const back = require('../assets/images/navbar/back@2x.png');
const call = require('../assets/images/navbar/call@2x.png');

export class CreateConversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this._isMounted = false;
    this.renderTitle = this.renderTitle.bind(this);
    this.renderSearchItems = this.renderSearchItems.bind(this);
  }

  goToConversation(convoTitle, convoId) {
    this.props.navigator.replace({
      pageId: convoId,
      title: convoTitle,
      component: Messenger,
      index: 1
    });
  }

  appendToMemberList(contact) {
    this.props.createConversation({"participants": [contact]}).then(()=>{
        this.goToConversation(contact, '');
    })
  }

  renderTitle() {
    return <MiTextInput
        underlineColorAndroid="transparent"
        style={{height: 40, borderWidth: 0}}
        placeholder={'Chat members...'}
        onChangeText={(searchTerm) => this.setState({searchTerm})}
        value={this.state.searchTerm}
    />
  }

  renderSearchItems(searchTerm) {
        let i = 0;
        let tiles = this.props.users.mixed
            .filter(contact => contact.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
            .map(contact => {
                i++;
                const profileImage = contact.photoUrl ? {uri: contact.photoUrl}: null;

                const name = contact.name ? contact.name: '.';
                if (!name) return null;

                return (<ListRow onClick={()=>{this.appendToMemberList(contact.userId)}} key={i} imageSrc={profileImage} leftText={name} />)
            });

        return tiles;
  }

  render() {
    return (<View style={{flex:1, padding: 10}}>
            <View style ={[styles.row]}>
                <A onPress={this.props.navigator.pop} style={[styles.corner, {backgroundColor: 'lightgrey'}]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={back} />
                </A>
                <View style={[styles.textInputOuter]}>
                    {this.renderTitle()}
                </View>
                <A onPress={()=>{}} style={[styles.corner]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={call} />
                </A>
            </View>
            <ScrollView contentContainerStyle={[styles.list, {marginBottom: 20}]}>
                {this.renderSearchItems(this.state.searchTerm)}
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 50,
    },
    corner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: 40,
        height: 40,
    },
    profileImage: {
        height: 18,
    },
    textInputOuter: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 5,
        flex: 1,
        height: 40
    },
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  users: state.users
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    createConversation,
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateConversation);
