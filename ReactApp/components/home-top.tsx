/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles';
import AppUtil from '../util';

// Components
import A from '../components/anchor';
import MiText from '../components/text';

interface props {
  pushToTalk: boolean,
  activateDialPad: () => {},
  drawer?: any
}

interface state {

}

const dialpad = require('../assets/images/navbar/dialpad@2x.png');
const ptt = require('../assets/images/navbar/ptt@2x.png');
const hamburger = require('../assets/images/navbar/hamburger.png');

export default class HomeTop extends Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render(){
    const pttStyle: object = this.props.pushToTalk ? {backgroundColor: '#F8CA00'} : null;
    return (
      <View style ={[styles.container]}>
        {Platform.OS === 'ios' && 
          <View style ={[styles.row, AppStyles.empty, pttStyle, {flexDirection:'row-reverse'}]}>
            <A onPress={() => { this.props.activateDialPad() }} style={[AppStyles.margin, styles.dialIconWrapper, {backgroundColor: this.props.pushToTalk ? 'transparent' : '#fff'}]}>
              <Image resizeMode='contain' style={[AppStyles.icon,{height: Style.getHeight(26)}]} source={this.props.pushToTalk ? ptt : dialpad} />
            </A>
          </View>}

        {Platform.OS === 'android' && 
          <View style ={[styles.row, pttStyle, {flexDirection:'row-reverse'}]}>
            <A onPress={() => { this.props.activateDialPad() }} 
               style={[{marginRight: Style.getWidth(14), 
               justifyContent: 'center', alignItems: 'center', 
               width: Style.getWidth(41.5), height: Style.getWidth(41.5), 
               backgroundColor: this.props.pushToTalk ? 'transparent' : '#FFFFFF'}]}>
              <Image resizeMode='contain' style={[AppStyles.icon,{height: Style.getHeight(26)}]} source={this.props.pushToTalk ? ptt : dialpad} />
            </A>
            <View style={[styles.hamburger]}> 
              <A style={[styles.hamburgerAnchor]} onPress={() => this.props.drawer.openDrawer()}>
                <Image resizeMode='contain' style={[AppStyles.icon, {width: Style.getWidth(19), height: Style.getHeight(13)}]} source={hamburger} />
              </A>
            </View>
          </View>}
      </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        height: Style.getHeight(54),
        backgroundColor: Platform.OS === 'android' ? '#FFFFFF' : 'transparent',
        marginBottom: Platform.OS === 'ios' ? Style.PADDING : 0,
    },
    row: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    dialIconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Style.getWidth(41),
        height: Style.getHeight(41),
        margin: Style.PADDING,
    },
    hamburger: {
        paddingLeft: Style.getWidth(21.5),
        flex: 4
    },
    hamburgerAnchor: {
        height: Style.UNIT_Y, 
        width: Style.UNIT_X, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    }
});
