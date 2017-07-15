/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'

// Components
import Blue from './blue';
import MiText from './text';

import MiTransText from './MiTransText';

interface props {
    color?: string,
    size?: number,
    pushToTalk?: any,
}

export default class HomeControls extends Component<props, any> {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                'green': '#3EAB49',
                'yellow': '#f7ca10',
                'red': 'red',
            }
        }
    }

  render(){
    const color: string = this.props.color && this.state.colors.hasOwnProperty(this.props.color) ? this.state.colors[this.props.color] : 'whitesmoke';
    const size: number = this.props.size ? this.props.size : Style.getHeight(6);
    const listStyle = Platform.OS === 'android' ? styles.list_android : styles.list;

    if (this.props.pushToTalk) {
        return <View style ={[styles.row, {backgroundColor: '#F8CA00', alignItems: 'center', justifyContent: 'center'}]}>
            <Blue />
            <MiTransText center>{'Press and hold to reply'}</MiTransText>
        </View>;
    }

    return <View style ={[styles.row, listStyle]}>
        <View style={[AppStyles.card, AppStyles.active, styles.card]}>
            <MiText center weight={'bold'}>1</MiText>
        </View>
        <View style={[AppStyles.card, AppStyles.active, styles.card]}>
            <MiText center weight={'bold'}>2</MiText>
        </View>
        <View style={[AppStyles.card, AppStyles.empty, styles.card]}></View>
        <View style={[AppStyles.card, AppStyles.empty, styles.card]}></View>
        <View style={[AppStyles.card, AppStyles.empty, styles.card]}></View>
        <View style={[AppStyles.card, AppStyles.empty, styles.card, {marginRight: 0}]}></View>
    </View>
  }


}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? Style.UNIT_Y : Style.getWidth(68),
    },
    list: {
        flexWrap: 'wrap',
    },
    list_android: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E7EAEF',
        paddingLeft: Style.getWidth(7),
        paddingRight: Style.getWidth(7)
    },
    card: {
        width: Style.UNIT_X,
        height: Style.UNIT_X,
        marginRight: Style.PADDING,
    }
});
