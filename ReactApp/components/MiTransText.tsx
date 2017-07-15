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

//localization
import I18n from 'react-native-i18n';
//translation files
import Translations from '../TranslationWrapper';

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

export default class MiTransText extends Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                'light': AppConfig.secondaryColor,
                'white': '#FFF',
                'dark': AppConfig.primaryColor,
                'black': 'black',
                'danger': AppConfig.dangerColor,
                'red': '#ED1C24'
            },
            weights: {
                base: AppConfig.baseFont,
                light: AppConfig.lightFont,
                bold: AppConfig.boldFont,
            }
        }
    }

    render() {
        const color = this.props.color && this.state.colors.hasOwnProperty(this.props.color) ? this.state.colors[this.props.color] : this.props.color;
        const type = this.props.type ? this.props.type : 'baseText';
        const textAlign = this.props.center ? 'center' : 'left';
        const weight = this.props.weight && this.state.weights.hasOwnProperty(this.props.weight) ? this.props.weight : 'base';
        const fontFamily = { fontFamily: this.state.weights[weight] };
        const style = this.props.style ? this.props.style : [];
        const lines = this.props.lines ? this.props.lines : 1;

        //camelize strings to match translation keys
        const camelize = (str) => str.replace(/(?:^\w|[A-Z]|\b\w)/g,(ltr, idx) => ltr.toUpperCase()).replace(/\s+/g, '')

        //do not translate strings in this array
        const noTranslation: Array<string> = ['*','#'];

        let text = '';
        if (this.props.children && Number.isNaN(Number(this.props.children)) && noTranslation.indexOf(this.props.children) < 0) {
            text = I18n.t(camelize(this.props.children))

            if (text.indexOf('[missing ') !== -1) {
                text = this.props.children;
            }
        } else {
            text = this.props.children;
        }

        return <Text numberOfLines={lines} style={[AppStyles[type], {color: color ? color : 'white', textAlign: textAlign}, fontFamily, ...style]}>
            {text}
        </Text>;
    }
}

const styles = StyleSheet.create({
});

//translations
I18n.fallbacks = true;
I18n.translations = Translations;
