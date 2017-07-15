'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles';

interface props {
  style?: any,
  textStyle?: any,
  content?: string
}

interface state {

}

/* Component ==================================================================== */
export default class Badge extends Component<props, state> {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <View style={[styles.container, this.props.style]}>
            <Text style={[AppStyles.baseText, styles.text, this.props.textStyle]}>{this.props.content}</Text>
        </View>
    )
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ED1C24',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Style.getWidth(7.5)
    },
    text: {
        textAlign: 'center',         //for android
        textAlignVertical: 'center', //for android
    },
});
