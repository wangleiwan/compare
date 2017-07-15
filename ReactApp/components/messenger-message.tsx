import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Day} from 'react-native-gifted-chat';

// App Globals
import AppStyles, {Style} from '../styles'

// Components
import Avatar from './avatar';
import Bubble from './messenger-bubble';
import MiText from './text';

import MiTransText from './MiTransText';

interface props {
  containerStyle?: any,
  currentMessage?: any,
  previousMessage?: any,
  nextMessage?: any,
  renderBubble?: any,
  user?: any,
  position?: string,
  imageSrc?: any
}

interface state {

}

export default class Message extends Component<props, state> {
  static defaultProps: object;
  static propTypes: object;

  getInnerComponentProps() {
    const {containerStyle, ...props} = this.props;
    return {
      ...props,
      isSameUser: this.isSameUser,
      isSameDay: this.isSameDay
    }
  }

  isSameDay(currentMessage: any = {}, diffMessage: any = {}) {

    let currentCreatedAt = moment(currentMessage.createdOn);
    let diffCreatedAt = moment(diffMessage.createdOn);

    if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
      return false;
    }

    return currentCreatedAt.isSame(diffCreatedAt, 'day');

  }

  isSameUser(currentMessage: any = {}, diffMessage: any = {}) {
    return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
  }

  transform(date: Date) {
    var time = Math.floor((+new Date() - +date) / 1000);

    var interval = Math.floor(time / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(time / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(time / 86400);
    if (interval > 1) {
        return interval + " days ago";
    } else if (interval > 0) {
        return "Yesterday";
    }

    return "Today";
  }

  renderDay() {
    if (this.props.currentMessage.createdOn && !this.isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return <View style={{marginTop: 20, marginBottom: 10, paddingTop: 5, paddingBottom: 5, borderTopWidth: 1, borderColor: '#CCCDCE', borderStyle: 'solid'}}>
            <MiTransText center style={[{fontSize: 10, color: '#4CBDE9'}]}>{this.transform(new Date(this.props.currentMessage.createdOn))}</MiTransText>
        </View>
    }
    return null;
  }

  renderBubble() {
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble {...bubbleProps}/>;
  }

  renderAvatar() {
    const height = Style.getHeight(24);
    const width = Style.getWidth(24);
    const isNotUser = this.props.user._id !== this.props.currentMessage.user._id;
    const showAvatar = !this.isSameUser(this.props.currentMessage, this.props.previousMessage) || !this.isSameDay(this.props.currentMessage, this.props.previousMessage);
    const profileImage = this.props.currentMessage.user.photoUrl ? {uri: this.props.currentMessage.user.photoUrl}: null;
    if (isNotUser && showAvatar) {
        const avatarProps = this.getInnerComponentProps();
        return <View style={{marginRight: 6}}>
            <Avatar name={this.props.currentMessage.user.name} imageSrc={profileImage} height={height} width={width} {...avatarProps}/>
        </View>
    }
    if (this.props.position === 'left') return <View style={{width: width, height: height, marginRight: 6}} />;

    return null;
  }

  render() {
    return (
      <View>
        {this.renderDay()}
        <View style={[styles[this.props.position].container, {
          marginBottom: this.isSameUser(this.props.currentMessage, this.props.nextMessage) ? 2 : 10,
        }, this.props.containerStyle[this.props.position]]}>
          {this.props.position === 'left' ? this.renderAvatar() : null}
          {this.renderBubble()}
          {this.props.position === 'right' ? this.renderAvatar() : null}
        </View>
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 8,
    },
  }),
};

Message.defaultProps = {
  renderAvatar: null,
  renderBubble: null,
  renderDay: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
};
