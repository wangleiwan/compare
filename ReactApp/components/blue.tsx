/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'

interface props {
  children?: string
}

interface state {
    
}

export default class Blue extends Component<props, state> {
  render(){
    return <View style={[styles.overlay]} >
        {this.props.children}
    </View>;
  }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(16, 58, 95, 0.4)',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        zIndex: 2,
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: Style.DEVICE_WIDTH
    }
});
