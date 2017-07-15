/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

 import {
  Dimensions,
  Platform
 } from 'react-native';

import MitelTheme from './styles/theme_mitel';
// import {MitelTheme} from './styles/theme_mine';

/* Setup ==================================================================== */
exports.title = 'GlobalConfig';

/* Default Styles ==================================================================== */
// Window Dimensions
var window = Dimensions.get('window');
exports.windowHeight = window.height;
exports.windowWidth = window.width;

// Grid
exports.windowWidthHalf = window.width * 0.5;
exports.windowWidthYhird = window.width * 0.333;
exports.windowWidthYwoThirds = window.width * 0.666;
exports.windowWidthQuarter = window.width * 0.25;
exports.windowWidthThreeQuarters = window.width * 0.75;

// General Element Dimensions
var navbarHeight = 64;
exports.navbarHeight = navbarHeight;
exports.statusBarHeight = 22;

// Fonts
exports.baseFont = Platform.OS === 'android' ? 'Museo Sans 500' : 'MuseoSans-500';
exports.lightFont = Platform.OS === 'android' ? 'Museo Sans 300' : 'MuseoSans-300';
exports.boldFont =  Platform.OS === 'android' ? 'Museo Sans 700' : 'MuseoSans-700';

// Colors
exports.primaryColor = MitelTheme.PRIMARY_COLOR;
exports.secondaryColor = MitelTheme.SECONDARY_COLOR;
exports.tertiaryColor = MitelTheme.TERTIARY_COLOR;
exports.accentColor = MitelTheme.ACCENT_COLOR;
exports.dangerColor = MitelTheme.DANGER_COLOR;
exports.inactiveColor = MitelTheme.INACTIVE_COLOR;
exports.callToActionColor = MitelTheme.CALL_TO_ACTION_COLOR;

exports.textColor = "#FFF";
exports.borderColor = "#E7E7E7";

// Logo
exports.logo = MitelTheme.LOGO;
exports.welcomeIos = MitelTheme.WELCOME_IOS;
exports.welcomeAndroid = MitelTheme.WELCOME_ANDROID;

// URLS
exports.usersUrl = "https://xp9gj7by50.execute-api.us-east-1.amazonaws.com/prod/api/2016-12-31/users"; 
exports.groupsUrl = "https://xp9gj7by50.execute-api.us-east-1.amazonaws.com/prod/api/2016-12-31/groups";