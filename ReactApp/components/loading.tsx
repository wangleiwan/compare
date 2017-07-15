/**
 * Loading Screen
 *
     <Loading text={'Server is down'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  View,
  // ActivityIndicator,
  Animated,
  Text
} from 'react-native'
import Animation from 'lottie-react-native';

// App Globals
import AppStyles, {underlayColor} from '../styles'
import AppConfig from '../config';

// Components
import MiText from './text';
import MiTransText from './MiTransText';

/* Component ==================================================================== */
interface props {
  text?: string,
  transparent?: boolean,
  finished: boolean
}

interface state {
    progress: Animated.Value,
    checkmark: Animated.Value,
    finished: boolean
}

export default class Loading extends Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      checkmark: new Animated.Value(0),
      finished: false,
    };
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation() {
      Animated.sequence([
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 2000
        }),
        Animated.timing(this.state.progress, {
          toValue: 0,
          duration: 0
        })
      ]).start(() => {
        if (this.props.finished) {
            this.setState({finished: true});
            Animated.timing(this.state.checkmark, {
              toValue: 1,
              duration: 2000,
            }).start();
        } else {
            this.cycleAnimation();
        }
      });
    }

  render() {
    let { text, transparent } = this.props;

    return (
      <View style={[]}>
        {!this.state.finished && <Animation
            progress={this.state.progress}
            style={{
              width: 75,
              height: 75,
            }}
            source={require('../assets/animations/loading.json')}
          />}

        {this.state.finished && <Animation
            progress={this.state.checkmark}
            style={{
              width: 75,
              height: 75,
            }}
            source={require('../assets/animations/check.json')}
          />}

        <View style={[AppStyles.spacer_10]} />
        {text &&
        <MiTransText>
          {text}
        </MiTransText>
        }
      </View>
    );
  }
}
