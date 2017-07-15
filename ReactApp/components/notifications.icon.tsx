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
import AppStyles, {Style,underlayColor} from '../styles';
import AppUtil from '../util';

// Components
import MiText from './text';

interface props{
  color?: string
}

interface state{
  colors?: object
}

export default class Notification extends Component<props, state> {
    constructor(props: any) {
        super(props);
        this.state = {
            colors: {
                'green': '#7ED321',
                'yellow': '#f7ca10',
                'red': 'red',
            }
        }
    }

  render(){
    const color = this.props.color ? this.state.colors[this.props.color] : 'red';

    return <View style={[styles.trapezoid]}>
        <MiText center weight={'bold'} style={[styles.text]}>{'3'}</MiText>
    </View>;
  }


}

const styles = StyleSheet.create({
    trapezoid: {
        width: Style.getWidth(10),
        height: Style.getHeight(10),
        borderTopWidth: 18,
        borderTopColor: 'red',
        borderLeftWidth: 2,
        borderLeftColor: 'transparent',
        borderRightWidth: 2,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        borderRadius: 3,
        position: 'absolute',
        top: -10,
        left: 31
    },
    text: {
        position: 'absolute',
        top: -24,
        left: 0,
        fontSize: 8,
    }
});

