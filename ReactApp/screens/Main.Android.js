"use strict";

import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Dimensions,
  BackHandler
} from "react-native";
import DrawerLayout from "react-native-drawer-layout";
import { Provider, connect } from "react-redux";

import AppStyles, { underlayColor, Style } from "../styles";

// Screens
import Messenger from "./Messenger";
import ConversationsList from "./ConversationsList";
import ContactsList from "./ContactsList";
import CallHistory from "./CallHistory";
import Search from "./Search";
import Home from "./Home";
import Settings from "./Settings";
// Components
import Overlay from "../components/Overlay";
import ControlPanel from "../components/control-panel";
import MiTransText from "../components/MiTransText";
import A from "../components/anchor";
// aws mobile analytics
import mobileAnalyticsClient from "../mobileAnalyticsClient";
// Redux
import { toggle, save, toggleContact } from "../redux/favorites";
import { goToPage } from '../redux/drawer';

const hamburger = require("../assets/images/navbar/hamburger.png");

// Define which part of the state we're passing to this component
const mapStateToProps = state => ({
  favorites: state.favorites,
  currentPageIndex: state.drawer.currentPage
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  toggle,
  toggleContact,
  save,
  goToPage
};

export class MainAndroid extends Component {
  tabs = [
    {
      icon: "home",
      title: "Home",
      width: Style.getWidth(24.5),
      height: Style.getHeight(21.5),
      marginLeft: Style.getWidth(14.5),
      marginRight: Style.getWidth(17.5),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "chat",
      title: "Chat",
      width: Style.getWidth(20),
      height: Style.getHeight(18),
      marginLeft: Style.getWidth(17.5),
      marginRight: Style.getWidth(19),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "contacts",
      title: "Contacts",
      width: Style.getWidth(22.5),
      height: Style.getHeight(19),
      marginLeft: Style.getWidth(13.5),
      marginRight: Style.getWidth(20.5),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "callhistory",
      title: "Call History",
      width: Style.getWidth(24),
      height: Style.getHeight(22.5),
      marginLeft: Style.getWidth(15.5),
      marginRight: Style.getWidth(17),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "search",
      title: "Search",
      width: Style.getWidth(19),
      height: Style.getHeight(22),
      marginLeft: Style.getWidth(17.5),
      marginRight: Style.getWidth(20),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "settings",
      title: "Settings",
      width: Style.getWidth(19),
      height: Style.getHeight(19),
      marginLeft: Style.getWidth(19.5),
      marginRight: Style.getWidth(18),
      func: () => {
        this.drawer.closeDrawer();
      }
    },
    {
      icon: "edithome",
      title: "Edit Home",
      width: Style.getWidth(19.5),
      height: Style.getHeight(19.5),
      marginLeft: Style.getWidth(21),
      marginRight: Style.getWidth(16),
      func: () => {
        this.drawer.closeDrawer();
        this.props.toggle();
      }
    }
  ];

  navigationView = <ControlPanel tabs={this.tabs} />;

  constructor(props) {
    super(props);
    this.state = {
      drawerLockMode: "unlocked",
      currentPage: "home",
      drawerIsOpen: false
    };

    this.handleBack = (() => {
      if(this.state.drawerIsOpen){
        this.drawer.closeDrawer();
        return true;
      }else{
        let nav = this.props.navigator;
      
        if (nav && nav.getCurrentRoutes().length > 1) {
          nav.pop();
          return true;
        }else if(nav && nav.getCurrentRoutes().length == 1 
        && nav.getCurrentRoutes()[0].title === 'MainAndroid' && this.props.currentPageIndex !== 0){
          this.props.goToPage(0);
          return true;
        }else{
          return false;
        }
      }

    }).bind(this) //don't forget bind this, you will remenber anyway.
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  render() {
    const drawerWidth = Style.getWidth(275);

    return (
      <DrawerLayout
        onDrawerSlide={e => {}}
        onDrawerStateChanged={e => {}}
        drawerWidth={drawerWidth}
        drawerBackgroundColor="white"
        drawerLockMode={this.state.drawerLockMode}
        ref={drawer => {
          this.drawer = drawer;
        }}
        onDrawerOpen={e => {
          this.setState({drawerIsOpen: true});
        }}
        onDrawerClose={e => {
          this.setState({drawerIsOpen: false});
        }}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor="blue"
        renderNavigationView={() => this.navigationView}
      >

        {this.props.currentPageIndex === 0 &&
          <View style={[{ height: Dimensions.get("window").height }]}>
            <Home navigator={this.props.navigator} drawer={this.drawer} />
          </View>}

        {this.props.currentPageIndex === 1 &&
          <View style={[{ flex: 1 }]}>
            <ConversationsList
              navigator={this.props.navigator}
              drawer={this.drawer}
            />
          </View>}

        {this.props.currentPageIndex === 2 &&
          <View style={[{ flex: 1 }]}>
            <ContactsList
              navigator={this.props.navigator}
              drawer={this.drawer}
            />
          </View>}

        {this.props.currentPageIndex === 3 &&
          <View style={[{ flex: 1 }]}>
            <CallHistory
              navigator={this.props.navigator}
              drawer={this.drawer}
            />
          </View>}

        {this.props.currentPageIndex === 4 &&
          <View style={[{ flex: 1 }]}>
            <Search navigator={this.props.navigator} drawer={this.drawer} />
          </View>}

        {this.props.currentPageIndex === 5 &&
          <View style={[{ flex: 1 }]}>
            <Settings navigator={this.props.navigator} drawer={this.drawer} />
          </View>}

        {this.props.currentPageIndex === 6 &&
          <View style={[{ height: Dimensions.get("window").height }]}>
            <Home navigator={this.props.navigator} drawer={this.drawer} />
          </View>}

      </DrawerLayout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAndroid);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  saveButton: {
    backgroundColor: "#F8CA00",
    alignItems: "center",
    justifyContent: "center"
  },
  closeButton: {
    backgroundColor: "#00b300",
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    height: Style.UNIT_Y,
    flexDirection: "row",
    backgroundColor: "#94B2C2",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
