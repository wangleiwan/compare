/**
 * Form SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Button from '../components/button';
import A from '../components/anchor';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles'
import AppUtil from '../util'

//Components
import ListSearch from '../components/list.search';
import ListRow from '../components/list.row'
import Messenger from './Messenger';
import ActionBar from '../components/actionbar';

const more = require('../assets/images/navbar/more@2x.png');
const hamburger = require('../assets/images/navbar/hamburger.png');

export class Search extends Component {

  constructor(props){
    super(props);

    this.state = { searchTerm: '' };
    this.renderSearchItems = this.renderSearchItems.bind(this);
    this.more = {
        options: [],
        adjustFrame: ()=>{},
        onSelect: ()=>{},
        onDropdownWillShow: ()=>{},
        onDropdownWillHide: ()=>{},
        renderRow: ()=>{}
    };
  }

  navigate(navbarTitle, pageId) {
    this.props.navigator.push({
      pageId: pageId,
      title: navbarTitle,
      component: Messenger,
      index: 1
    });
  }

  renderSearchItems(searchTerm) {
    if (!searchTerm) return;

        let i = 0;
        let tiles = this.props.users.mixed
            .filter(contact => contact.name.indexOf(searchTerm) !== -1)
            .map(contact => {
                i++;
                const profileImage = contact.photoUrl ? {uri: contact.photoUrl}: null;

            const name = contact.name ? contact.name: '.';
            if (!name) return null;

            return (<ListRow onClick={()=>{this.navigate('','')}} key={i} imageSrc={profileImage} leftText={name} />)
        });

    return tiles;
  }

  componentDidMount() {
    // Get setting from local DB to populate fields

  }

  render(){
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return (
      <View style={[padding, AppStyles.tabView]}>
        {Platform.OS === 'android' &&
        <ActionBar pageLabel={'Search'} drawer={this.props.drawer} more={this.more} />
        }
        <View style={[listPadding]}>
          <ListSearch
            type={'solid'}
            onChangeText={(searchTerm) => this.setState({searchTerm})}
            searchTerm={this.state.searchTerm}
            />
          <ScrollView contentContainerStyle={[{marginBottom: 20}]}>
            {this.state.searchTerm === '' && this.renderSearchItems(this.state.searchTerm)}
            {!this.state.searchTerm && <View style={[styles.serp]}>
                <Text>{'No search results'}</Text>
            </View>}
          </ScrollView>
        </View>
      </View>
    )
  }


}

const styles = StyleSheet.create({
    serp: {
        height: Style.DEVICE_HEIGHT / 2,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
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
  users: state.users
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);
