import React, { Component } from 'react';
import {
    Platform,
    TextInput
} from 'react-native';

interface props {
    underlineColorAndroid?: string,
    style?: any,
    onChange?: any,
    onChangeText?: any,
    value?: any,
    placeholder?: string,
    placeholderTextColor?: any,
    selectionColor?: any,
    returnKeyType?: any,
    ref?: any,
    keyboardType?: any,
    autoFocus?: any,
    autoCapitalize?: any,
    maxLength?: number,
    blurOnSubmit?: any,
    onSubmitEditing?: any,
    editable?: boolean,
    secureTextEntry?: any,

}

interface state {

}

export default class MiTextInput extends Component<props, state> {
    render() {
        if(Platform.OS === 'android') {
            return (
                <TextInput
                    {...this.props}
                    underlineColorAndroid='transparent'
                />
            );
        }
        return (
            <TextInput
                {...this.props}
            />
        );
    }
} 