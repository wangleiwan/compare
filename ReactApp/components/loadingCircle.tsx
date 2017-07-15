import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import Animation from 'lottie-react-native';
import Overlay from './Overlay';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

interface props {

}

interface state {
    animating: boolean,
    progress: any
}

export default class LoadingCircle extends Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      animating: false,
    };
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  render() {
    return <View>
        <Animation
        progress={this.state.progress}
        style={styles.animation}
        source={require('../assets/animations/whiteLoading.json')}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  animation: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: 75,
    height: 75,
  },
});
