import React, { Component } from 'react';
import {
    Platform,
    TextInput
} from 'react-native';

import {TextInputMask} from 'react-native-masked-text';

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

export default class MiTextInputMask extends Component<props, state> {
    render() {
        if(Platform.OS === 'android') {
            return (
                <TextInputMask
                    {...this.props}
                    underlineColorAndroid='transparent'
                />
            );
        }
        return (
            <TextInputMask
                {...this.props}
            />
        );
    }
} 