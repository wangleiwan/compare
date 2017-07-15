'use strict';

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MiTextInput from './MiTextInput';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles'


interface props {
  size?: number,
  type?: string,
  onChangeText?: any,
  searchTerm?: string
}

interface state {

}

export default class ListSearch extends Component<props, state> {
    constructor(props){
        super(props);
    }

    render(){
        const size = this.props.size ? this.props.size : Style.UNIT_Y;
        const fontContainerHeight = Math.round(size * (28/40));
        const fontSize = Math.round(size * (13/40));
        const margin = Math.round(size * (6/40));
        const sideMargin = Math.round(size * (4/40));
        const borderRadius = Math.round(size * (15/40));
        const backgroundColor = this.props.type === 'solid' ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)';
        const borderWidth = this.props.type === 'solid' ? 1 : 0;
        const textInputInner = Platform.OS === 'ios' ? styles.textInputInnerIos : styles.textInputInnerAndroid;

        return <View style={[styles.listItemOuter, {backgroundColor: backgroundColor, height: size}]}>
            <View style={[styles.textInputOuter, {borderWidth: borderWidth, height: fontContainerHeight, borderRadius: borderRadius, margin: margin, marginLeft: sideMargin, marginRight: sideMargin}]}>
                <Icon style={{marginLeft: sideMargin, marginTop: 2}} name={'ios-search-outline'} size={Style.getHeight(24)} color={"#000"} />
                <MiTextInput
                    style={[textInputInner, {height: fontContainerHeight, fontSize: fontSize}]}
                    placeholder={'Search'}
                    placeholderTextColor={'#000'}
                    onChangeText={this.props.onChangeText}
                    value={this.props.searchTerm}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    listItemOuter: {
        flexDirection: 'row',
    },
    textInputOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFF',
        borderColor: '#E6E7E8',
        paddingLeft: 10,
        flex: 1,
    },
    textInputInnerIos: {
        marginLeft: 8,
        borderWidth: 0,
        paddingBottom: 0,
        flex: 1,
    },
    textInputInnerAndroid: {
        marginLeft: 8,
        borderWidth: 0,
        paddingBottom: 6,
        flex: 1,
    }
});
