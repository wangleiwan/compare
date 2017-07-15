/**
 * Error Screen
 *
    <Error text={'Server is down'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

// App Globals
import AppStyles, {underlayColor} from '../styles'
import AppConfig from '../config';

// Components
import MiText from '../components/text';

import MiTransText from '../components/MiTransText';

interface props {
  text?: string,
}

interface state {

}

/* Component ==================================================================== */
class Error extends Component<props, state> {
  render() {
    // What are we Erroring?
    const text: string = this.props.text || 'Woops, Something wen\'t wrong.';

    return (
      <View style={[AppStyles.container, AppStyles.containerCentered]}>
        <Icon name={'ios-alert-outline'} size={50} color={"#CCC"} />

        <View style={[AppStyles.spacer_10]} />

        <MiTransText>{text}</MiTransText>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default Error
