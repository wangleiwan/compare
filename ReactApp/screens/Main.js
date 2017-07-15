'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    Linking
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// Screens
import Messenger from './Messenger';
import ConversationsList from './ConversationsList';
import ContactsList from './ContactsList';
import CallHistory from './CallHistory';
import Search from './Search';
import Home from './Home';
import Settings from './Settings';
// Components
import Overlay from '../components/Overlay';
import TabBar from '../components/navbar';
// aws mobile analytics
import mobileAnalyticsClient from '../mobileAnalyticsClient'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {msgrModal: false, chModal: false, searchModal: false};
  }

  componentDidMount() {
    mobileAnalyticsClient.recordEvent('MainPage', {
      'attribute_1': 'main',
      'attribute_2': 'page'
    }, {
      'metric_1': 1
    });
  }

  navigate(navbarTitle, pageId) {
    this.props.navigator.push({
      pageId: pageId,
      title: navbarTitle,
      navigator: this.props.navigator,
      component: Messenger,
      index: 1
    });
  }

  render() {
    return (
      <ScrollableTabView
        locked={true}
        renderTabBar={() => <TabBar />}
        tabBarPosition="bottom"
        initialPage={0}
        ref={(scrollTabView) => {
          this.tabView = scrollTabView;
        }}>

        <View style={[{flex:1}]} tabLabel={{ icon:'home', func: () => { this.setState({msgrModal: false, chModal: false, searchModal: false}) }}} >
            <Home navigator={this.props.navigator} />
            {this.state.msgrModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({msgrModal: !this.state.msgrModal, chModal: false, searchModal: false}) }><ConversationsList navigator={this.props.navigator} /></Overlay> : null }

            {this.state.chModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({chModal: !this.state.chModal, msgrModal: false, searchModal: false}) }><CallHistory /></Overlay> : null }

            {this.state.searchModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({searchModal: !this.state.searchModal, msgrModal: false, chModal: false}) }>
                <View style={[{flex:1, justifyContent: 'center'}]}>
                    <Search navigator={this.props.navigator} />
                </View>
                </Overlay> : null }
        </View>

        <View style={[{flex:1}]} tabLabel={{icon:'chat', func:() => this.setState({msgrModal: !this.state.msgrModal, chModal: false, searchModal: false})}} />

        <View style={[{flex:1}]} tabLabel={{ icon:'contacts', func: () => { this.setState({msgrModal: false, chModal: false, searchModal: false}) } }}>
            <ContactsList navigator={this.props.navigator} />
            {this.state.msgrModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({msgrModal: !this.state.msgrModal, chModal: false, searchModal: false}) }><ConversationsList navigator={this.props.navigator} /></Overlay> : null }

            {this.state.chModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({chModal: !this.state.chModal, msgrModal: false, searchModal: false}) }><CallHistory /></Overlay> : null }

            {this.state.searchModal ? <Overlay order={'reverse'} parentView={this.tabView} closeModal={() => this.setState({searchModal: !this.state.searchModal, msgrModal: false, chModal: false}) }>

                <View style={[{flex:1, justifyContent: 'center'}]}>
                    <Search navigator={this.props.navigator} />
                </View>
                </Overlay> : null }
        </View>

        <View style={[{flex:1}]} tabLabel={{icon:'callhistory', func:() => this.setState({chModal: !this.state.chModal, msgrModal: false, searchModal: false})}}></View>

        <View style={[{flex:1}]} tabLabel={{icon:'search', func:() => this.setState({searchModal: !this.state.searchModal, msgrModal: false, chModal: false})}}></View>

        <View style={[{flex:1}]} tabLabel={{ icon:'settings', func: () => { this.setState({msgrModal: false, chModal: false, searchModal: false}) } }}>
            <Settings navigator={this.props.navigator} />
        </View>

      </ScrollableTabView>

    );
  }

}
