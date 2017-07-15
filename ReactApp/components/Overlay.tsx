import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  findNodeHandle,
} from 'react-native';

import { BlurView } from 'react-native-blur';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

interface props {
  opacity?: number,
  closeModal?: any,
  children?: any,
  parentView?: any,
  order?: any,
  topDown?: boolean
}

interface state {
  offset?: Animated.Value,
  parentScreen?: any,
  viewRef?: any,
}

export default class Overlay extends Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      offset: new Animated.Value(0),
      parentScreen: null,
      viewRef: null,
    }

    this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 1
    }).start();
    this.setState({parentScreen: findNodeHandle(this.props.parentView)});
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0
    }).start(this.props.closeModal);
  }

  render() {
    const blurAmount = this.props.opacity || 10;
    const order = this.props.order ? 'column-reverse' : 'column';
    if(Platform.OS === 'android'){
      return (
        <Animated.View style={[styles.modal, {flexDirection: order, opacity: this.state.offset}]}>
            <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
            viewRef={this.state.parentScreen}
          />
          { this.props.children }
        </Animated.View>
      )
    }else{
      return (
        <Animated.View style={[styles.modal, {flexDirection: order, transform: [{translateY: this.state.offset}]}]}>
            <BlurView blurType="light" blurAmount={10} style={[{flex: 1,justifyContent: 'center',alignItems: 'stretch',backgroundColor: 'transparent'}]}>
              { this.props.children }
            </BlurView>
        </Animated.View>
      )
    }

  }
}

var styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  }
});
