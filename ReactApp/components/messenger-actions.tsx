import React, {Component} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActionSheetIOS
} from 'react-native';
import PropTypes from 'prop-types';

import ImagePicker from 'react-native-image-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

// Components
import MiText from './text';

interface props {
  onSend?: any,
  icon?: any,
  wrapperStyle?: object,
  iconTextStyle?: object,
  containerStyle?: object
}

interface state {

}

export default class MessengerActions extends Component<props, state> {
  _images: Array<any>;

  static contextTypes: object;

  static defaultProps: object;

  static propTypes: object;

  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({modalVisible: visible});
  }

  onActionsPress() {
    const options = ['Send Photo', 'Send Audio', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    //this.context.actionSheet().showActionSheetWithOptions({
    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
            ImagePicker.showImagePicker(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    // let source = { uri: response.uri };

                    // You can also display the image using data:
                    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    let resp: any = response;
                    resp.name = response.fileName;
                    this.props.onSend([{image: resp}]);
                }
            });
          break;
        case 1:
            break;
        case 2:
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.props.onSend({
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              });
            },
            (error) => alert(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
          break;
        default:
      }
    });
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <MiText style={[styles.iconText, this.props.iconTextStyle]}>+</MiText>
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Style.getWidth(26),
    height: Style.getHeight(26),
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

MessengerActions.contextTypes = {
  actionSheet: PropTypes.func,
};

MessengerActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

MessengerActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: View.propTypes.style,
  wrapperStyle: View.propTypes.style,
  iconTextStyle: Text.propTypes.style,
};
