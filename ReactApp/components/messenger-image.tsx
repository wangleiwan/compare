import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import PropTypes from 'prop-types';

interface props{
  containerStyle?: any,
  lightboxProps?: any,
  imageProps?: any,
  imageStyle?: any,
  currentMessage?: any,
  position?: any,
  previousMessage?: any,
  containerToPreviousStyle?: any[],
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

interface state{

}

export default class MessageImage extends Component<props, state> {
  static defaultProps: object;
  static propTypes: object;
  
  render() {
    const { width, height } = Dimensions.get('window');

    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Lightbox
          activeProps={{
            style: [styles.imageActive, { width, height }],
          }}
          {...this.props.lightboxProps}
        >
          <Image
            {...this.props.imageProps}
            style={[styles.image, this.props.imageStyle]}
            source={this.props.currentMessage.image}
          />
        </Lightbox>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: View.propTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
