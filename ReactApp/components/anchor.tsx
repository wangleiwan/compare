/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    TouchableHighlight,
    View,
} from 'react-native';

// App Globals
import AppStyles, {underlayColor} from '../styles'

interface props {
    onPress?: () => any,
    style?: object
}

interface state {

}

export default class A extends Component<props, state> {

    render(){
        return <TouchableHighlight
                    activeOpacity={0}
                    underlayColor={underlayColor}
                    onPress={this.props.onPress}
                    style={this.props.style}>
            { this.props.children }
        </TouchableHighlight>;
    }
}
