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
import AppStyles, {underlayColor} from '../styles';
import AppUtil from '../util';
import AppConfig from '../config';

interface props {
    color?: string,
    type?: string,
    center?: boolean,
    weight?: string,
    style?: any,
    children?: string,
    lines?: number
}

interface state {
    colors: object,
    weights: object
}

export default class MiText extends Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                'light': AppConfig.secondaryColor,
                'white': '#FFF',
                'dark': AppConfig.primaryColor,
                'black': 'black',
            },
            weights: {
                base: AppConfig.baseFont,
                light: AppConfig.lightFont,
                bold: AppConfig.boldFont,
            }
        }
    }

  render(){
    const color = this.props.color && this.state.colors.hasOwnProperty(this.props.color) ? this.state.colors[this.props.color]
                : (this.props.color ? this.props.color : this.state.colors['white']);
    const lines = this.props.lines ? this.props.lines : 1;
    const type = this.props.type ? this.props.type : 'baseText';
    const textAlign = this.props.center ? 'center' : 'left';
    const weight = this.props.weight && this.state.weights.hasOwnProperty(this.props.weight) ? this.props.weight : 'base';
    const fontFamily = { fontFamily: this.state.weights[weight] };
    //const fontFamily = {fontFamily: 'Museo Sans'};
    const style = this.props.style ? this.props.style : [];

    return <Text numberOfLines={lines} style={[AppStyles[type], {color: color ? color : 'white', textAlign: textAlign}, fontFamily, ...style]}>
        {this.props.children}
    </Text>;
  }


}

const styles = StyleSheet.create({
});