import React, {Component} from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

interface props{
  currentMessage?: any,
  containerStyle?: any,
  mapViewStyle?: any,
  previousMessage?: any,
  containerToPreviousStyle?: any[],
  renderMessageText?: any,
  renderMessageImage?: any,
  renderTicks?: any,
  user?: any,
  tickStyle?: any,
  onLongPress?: any,
  touchableProps?: any,
  position?: string,
  wrapperStyle?: any,
  imageSrc?: any,
  isSameUser?: any,
  isSameDay?: any,
  nextMessage?: any,
  renderBubble?: any
}

interface state{

}

export default class CustomView extends Component<props, state> {

  static defaultProps: object;
  static propTypes: object;

  render() {
    if (this.props.currentMessage.location) {
      return (
        <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
            android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
          });
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            }
          }).catch(err => {
            console.error('An error occurred', err);
          });
        }}>
            <MapView
                style={[styles.mapView, this.props.mapViewStyle]}
                region={{
                    latitude: this.props.currentMessage.location.latitude,
                    longitude: this.props.currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                scrollEnabled={false}
                zoomEnabled={false}>
                <MapView.Marker coordinate={{
                    latitude: this.props.currentMessage.location.latitude,
                    longitude: this.props.currentMessage.location.longitude,
                }}/>
            </MapView>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: Style.getWidth(150),
    height: Style.getHeight(100),
    borderRadius: 13,
    margin: 3,
  },
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: View.propTypes.style,
  mapViewStyle: View.propTypes.style,
};
