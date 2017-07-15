/**
 * Global App Styles
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

// App Globals
import AppConfig from './config';

export const underlayColor = 'whitesmoke';
export const backgroundColor = '#FEFEFE';

// Precalculate Device Dimensions for better performance
const SOFT_MENU_BAR_HEIGHT = (Platform.OS === 'ios') ? 0 : ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT");
const STATUS_BAR_HEIGHT = (Platform.OS === 'ios') ? 0 : ExtraDimensions.get("STATUS_BAR_HEIGHT");
const x: number = (Platform.OS === 'ios') ? Dimensions.get('window').width : ExtraDimensions.get("REAL_WINDOW_WIDTH");
const y: number = (Platform.OS === 'ios') ? Dimensions.get('window').height : ExtraDimensions.get("REAL_WINDOW_HEIGHT") - SOFT_MENU_BAR_HEIGHT - STATUS_BAR_HEIGHT;
const BASE_WIDTH: number = 375;
const BASE_HEIGHT: number = 667;

// Calculating ratio from iPhone breakpoints
const ratioX: number = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1 ;
const ratioY: number = y < 667 ? (y < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const base_unit: number = 14;

// We're simulating EM by changing font size according to Ratio
const unit: number = base_unit * ratioX;

// We add an em() shortcut function
function em(value: number): number {
  return getHeight(base_unit * value);
}

export function getWidth(value: number): number {
    return x * (value / BASE_WIDTH);
}

export function getHeight(value: number): number {
    return Math.round(y * (value / BASE_HEIGHT));
}

// Then we set our styles with the help of the em() function
export const Style = {
  // GENERAL
  BASE_WIDTH: BASE_WIDTH,
  BASE_HEIGHT: BASE_HEIGHT,
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,

  SOFT_MENU_BAR_HEIGHT,
  STATUS_BAR_HEIGHT,
  UNIT_X: getWidth(54),
  UNIT_Y: getHeight(54),

  PADDING: getWidth(7),

  // CARD
  CARD_WIDTH: x - em(1.25) * 2,
  CARD_HEIGHT: (x - em(1.25) * 2) * (3/5),
  CARD_PADDING_X: em(1.875),
  CARD_PADDING_Y: em(1.25),

  // FONT
  FONT_SIZE: em(1),
  FONT_SIZE_SMALLER: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_TITLE: em(1.25),

  getWidth: getWidth,
  getHeight: getHeight,
  EM: em
}

/* Styles ==================================================================== */
export default StyleSheet.create({
    appContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: "#000",
    },
    tabView: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    active: {
        backgroundColor: '#3EAB49'
    },
    empty: {
        backgroundColor: 'rgba(255,255,255,0.5)'
    },

    centerText: {
        textAlign: 'center'
    },

    padding: {
        paddingLeft: getWidth(7),
        paddingRight: getWidth(7),
        paddingTop: getHeight(7),
        paddingBottom: getHeight(7),
    },

    margin: {
        marginLeft: getWidth(7),
        marginRight: getWidth(7),
        marginTop: getHeight(7),
        marginBottom: getHeight(7),
    },

    icon: {
        height: getHeight(24),
    },

    bgImage: {
        position: 'absolute',
        top: -20,
        right: -20,
        height: Style.DEVICE_HEIGHT,
        width: Style.DEVICE_WIDTH
    },

    row: {
        flexDirection: 'row',
        height: Style.UNIT_Y,
    },

    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Style.UNIT_Y,
        flex: 1,
    },

    cornerCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: Style.UNIT_X,
        height: Style.UNIT_Y
    },

    avatarStatus: {
        position:'absolute',
        bottom: 0,
        right: 0,
    },

    /* Default */
    container: {
        position: 'relative',
        flex: 1,
    },
    containerCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Aligning items */
    rightAligned: {
        alignItems: 'flex-end',
    },

    /* Text Styles */
    textbox: {
        height: Style.UNIT_Y,
        borderWidth: 0,
        borderRadius: 0,
        marginBottom: 1,
        margin: 0,
        paddingLeft: Style.PADDING*2,
        backgroundColor: '#FFF',
        color: '#404141',
        flex: 1,
    },
    baseText: {
        fontFamily: AppConfig.baseFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1),
        lineHeight: em(1.18),
    },
    textInput: {
        fontFamily: AppConfig.lightFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1),
        lineHeight: em(1.18),
    },
    buttonText: {
        fontFamily: AppConfig.baseFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1),
        lineHeight: em(1.5),
    },
    h1: {
        fontFamily: AppConfig.lightFont,
        fontSize: em(1.75),
        lineHeight: em(2.3),
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
    },
    h2: {
        fontFamily: AppConfig.lightFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1.5),
        lineHeight: em(2),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
    },
    h3: {
        fontFamily: AppConfig.lightFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1.25),
        lineHeight: em(1.75),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
    },
    h4: {
        fontFamily: AppConfig.lightFont,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1.1),
        lineHeight: em(1.6),
        margin: 0,
        marginTop: 4,
        marginBottom: 4,
        left: 0,
        right: 0,
    },
    p: {
        fontFamily: AppConfig.lightFont,
        marginBottom: 8,
        color: AppConfig.textColor,
        backgroundColor: 'transparent',
        fontSize: em(1),
        lineHeight: em(1.5),
    },

    //need detailed styles
    spacer_10: {},
    spacer_20: {},
});
