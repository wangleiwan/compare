import React, { Component } from 'react';
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ActionSheetIOS
} from 'react-native';
import PropTypes from 'prop-types';

import moment from 'moment';
import {Time} from 'react-native-gifted-chat';

// Components
import CustomView from './messenger-custom';
import MessageText from './messenger-text';
import MessageImage from './messenger-image';
import MiText from './text';
import MiTransText from './MiTransText';

interface props {
  currentMessage?: any,
  previousMessage?: any,
  position?: string,
  containerToPreviousStyle?: Array<any>,
  containerStyle?: any,
  wrapperStyle?: any,
  renderMessageText?: any,
  renderMessageImage?: any,
  renderTicks?: any,
  user?: any,
  tickStyle?: any,
  onLongPress?: any,
  touchableProps?: any,
  imageSrc?: any,
  isSameUser?: any,
  isSameDay?: any,
  nextMessage?: any,
  renderBubble?: any
}

interface state {

}

export default class Bubble extends Component<props, state> {
  static contextTypes: object;
  static defaultProps: object;
  static propTypes: object;

  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  isSameDay(currentMessage: any = {}, diffMessage: any = {}) {
      let currentCreatedOn = moment(currentMessage.createdOn);
      let diffCreatedOn = moment(diffMessage.createdOn);

      if (!currentCreatedOn.isValid() || !diffCreatedOn.isValid()) {
        return false;
      }

      return currentCreatedOn.isSame(diffCreatedOn, 'day');
    }

  isSameUser(currentMessage: any = {}, diffMessage: any = {}) {
    return !!(diffMessage && currentMessage && diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
  }

  handleTriangleToPrevious() {
    if (!this.isSameUser(this.props.currentMessage, this.props.previousMessage) || !this.isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return <View style={[styles[this.props.position].triangle]} />;
    }
    return null;
  }

  handleBubbleToPrevious() {
    if (!this.isSameUser(this.props.currentMessage, this.props.previousMessage) || !this.isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return StyleSheet.flatten([styles[this.props.position].containerToPrevious, this.props.containerToPreviousStyle[this.props.position]]);
    }

    return styles[this.props.position].notriangle;
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const {containerStyle, wrapperStyle, ...messageTextProps} = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }
      return <MessageText {...messageTextProps}/>;
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const {containerStyle, wrapperStyle, ...messageImageProps} = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps}/>;
    }
    return null;
  }

  renderTicks() {
    const {currentMessage} = this.props;
    if (this.props.renderTicks) {
        return this.props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== this.props.user._id) {
        return;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.tickView]}>
          {currentMessage.sent && <MiTransText style={[styles.tick, this.props.tickStyle]}>✓</MiTransText>}
          {currentMessage.received && <MiTransText style={[styles.tick, this.props.tickStyle]}>✓</MiTransText>}
        </View>
      )
    }
  }

  renderCustomView() {
    return <CustomView {...this.props} />;
  }

  onLongPress() {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context);
    } else {
      if (this.props.currentMessage.text) {
        const options = [
          'Copy Text',
          'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        //this.context.actionSheet().showActionSheetWithOptions({
        ActionSheetIOS.showActionSheetWithOptions({
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(this.props.currentMessage.text);
              break;
          }
        });
      }
    }
  }

  render() {
    return (
      <View style={[styles[this.props.position].container]}>
        {this.props.position === 'left' && this.handleTriangleToPrevious()}
        <View style={[styles[this.props.position].wrapper, this.handleBubbleToPrevious()]}>
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
            accessibilityTraits="text"
            {...this.props.touchableProps}
          >
            <View>
              {this.renderCustomView()}
              {this.renderMessageImage()}
              {this.renderMessageText()}
              <View style={[styles.bottom]}>
                {this.renderTicks()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.props.position === 'right' && this.handleTriangleToPrevious()}
      </View>
    );
  }
}



const styles = {
  left: StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: '#F2F2F2',
        borderTopColor: '#F2F2F2'
    },
    notriangle: {marginLeft: 6},
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToPrevious: {
      borderTopLeftRadius: 0,
    },
  }),
  right: StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderTopWidth: 3,
        borderBottomColor: 'transparent',
        borderLeftColor: '#D0EBF8',
        borderRightColor: 'transparent',
        borderTopColor: '#D0EBF8'
    },
    notriangle: {marginRight: 6},
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    wrapper: {
      borderRadius: 8,
      backgroundColor: '#D0EBF8',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToPrevious: {
      borderTopRightRadius: 0,
    },
  }),
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tick: {
    fontSize: 10,
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  }
};

Bubble.contextTypes = {
  actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
  touchableProps: {},
  onLongPress: null,
  renderMessageImage: null,
  renderMessageText: null,
  renderCustomView: null,
  position: 'left',
  currentMessage: {
    text: null,
    createdOn: null,
    image: null,
  },
  nextMessage: {},
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  tickStyle: {},
  containerToNextStyle: {},
  containerToPreviousStyle: {},
  //TODO: remove in next major release
};

Bubble.propTypes = {
  touchableProps: PropTypes.object,
  onLongPress: PropTypes.func,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderCustomView: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  wrapperStyle: PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  tickStyle: Text.propTypes.style,
  containerToNextStyle: PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  containerToPreviousStyle: PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
};
