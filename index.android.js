/**
 * Load the App component.
 *  (All the fun stuff happens in "/ReactApp/containers/index.js")
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import { AppRegistry } from 'react-native';
import AppContainer from './ReactApp/containers/';
console.disableYellowBox = true;

AppRegistry.registerComponent('SMB', () => AppContainer)
