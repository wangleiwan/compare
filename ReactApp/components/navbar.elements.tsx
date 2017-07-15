/**
 * Navbar Elements
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

// App Globals
import AppStyles, {underlayColor} from '../styles'

// Components
import MiText from './text';

interface propsNavbarTitle {
  title?: string
}

interface stateNavbarTitle {

}

/* Navbar Title Component ==================================================================== */
export class NavbarTitle extends Component<propsNavbarTitle, stateNavbarTitle> {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <MiText style={[styles.navbarTitle]}>{this.props.title || 'SMB'}</MiText>
    );
  }
}

//exports.Title = NavbarTitle;


/* Navbar Left Button Component ==================================================================== */
interface propsNavbarLeftButton {
  icon?: string,
  onPress: () => any,
  image?: string
}

interface stateNavbarLeftButton {

}

export class NavbarLeftButton extends Component<propsNavbarLeftButton, stateNavbarLeftButton> {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string,
    image: PropTypes.string,
  }

  renderIcon(icon: string, image: string) {
    if (icon) {
      return <Icon name={this.props.icon} size={36} color={"#FFF"} />
    } else if (image) {
      return <Image style={AppStyles.icon} source={{uri: image}} />
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}
        style={styles.navbarButton}
        hitSlop={{top: 7, right: 7, bottom: 7, left: 7}}>
        {this.renderIcon(this.props.icon, this.props.image)}
      </TouchableOpacity>
    );
  }
}

//exports.LeftButton = NavbarLeftButton;

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  navbarButton: {
    left: 20,
    top: 4,
  },
  navbarTitle: {
    bottom: 6,
    fontSize: 13,
  },
});
