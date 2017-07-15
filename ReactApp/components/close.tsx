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
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'

// Components
import A from '../components/anchor';

const close = require('../assets/images/navbar/close white@2x.png');

interface props {
    size?: number,
    onPress?: () => any,
    style?: object
}

interface state {
    colors: object
}

export default class Close extends Component<props, state> {
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
    const size: number = this.props.size ? this.props.size : Style.getWidth(25);
    const onPress: any = this.props.onPress ? this.props.onPress : ()=>{};
    return <A style={{zIndex: 1}} onPress={onPress}>
        <View style={[styles.circle,{width: size, height: size, backgroundColor: '#1A325E'}, this.props.style]}>
            <Image resizeMode='contain' style={{height: Style.getHeight(10)}} source={close} />
        </View>
    </A>
  }
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: 100/2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
