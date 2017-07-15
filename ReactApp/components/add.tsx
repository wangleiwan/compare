/**
 * Add
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'


const add = require('../assets/images/add_home_tile.png');
const addFirst = require('../assets/images/add_home_tile_empty.png');

interface props {
    onPress?: () => any,
    style?: any,
    addFirst?: boolean
}

interface state {

}

export default class Add extends Component<props, state> {
    constructor(props) {
        super(props);
    }

  render(){
    const onPress: any = this.props.onPress ? this.props.onPress : ()=>{};
    return <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={{zIndex: 1}}>
        <View style={[{backgroundColor: 'transparent'}, this.props.style]}>
            <Image resizeMode='contain' style={this.props.style} source={this.props.addFirst ? addFirst : add} />
        </View>
    </TouchableOpacity>
  }
}
