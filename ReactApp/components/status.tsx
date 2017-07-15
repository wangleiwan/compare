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
    color?: string,
    size?: number
}

export default class Status extends Component<props, any> {
    constructor(props) {
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
    const color = this.props.color && this.state.colors.hasOwnProperty(this.props.color) ? this.state.colors[this.props.color] : 'whitesmoke';
    const size = this.props.size ? this.props.size : Style.getHeight(15);

    return <View style={[{width: size, height: size, backgroundColor: color}]} />;
  }


}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100/2
    }
});
