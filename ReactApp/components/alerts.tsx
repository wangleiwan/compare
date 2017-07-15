/**
 * Alerts - Status/Success/Error Messages
 *
 *  USAGE:
      <Alerts status={'Something\'s happening...'} success={'Hello Success'} error={'Error hey'}  />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
 'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'

// Components
import MiText from '../components/text';
import MiTransText from '../components/MiTransText';

interface props {
  status?: string,
  success?: string,
  error?: string
}

interface state {

}

/* Component ==================================================================== */
class Alerts extends Component<props, state> {
  static propTypes = {
    status: PropTypes.string,
    success: PropTypes.string,
    error: PropTypes.string,
  }

  static defaultProps = {
    status: '',
    success: '',
    error: '',
  }

  render() {
    let { status, success, error } = this.props;

    // Allows you to show both error and success
    return (
      <View style={styles.alerts}>
        {success != '' &&
          <View>
            <View style={[styles.msg]}>
              <MiTransText center style={[styles.msg_text]}>{success}</MiTransText>
            </View>
            <View style={AppStyles.spacer_20} />
          </View>
        }

        {status != '' &&
          <View>
            <View style={[styles.msg, styles.msgStatus]}>
              <MiTransText center style={[styles.msg_text, styles.msgStatus_text]}>{status}</MiTransText>
            </View>
            <View style={AppStyles.spacer_20} />
          </View>
        }

        {error != '' &&
          <View>
            <View style={[styles.msg, styles.msgError]}>
              <MiTransText center style={[styles.msg_text, styles.msgError_text]}>{error}</MiTransText>
            </View>
            <View style={AppStyles.spacer_20} />
          </View>
        }
      </View>
    )
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  alerts: {
    left: 0,
    right: 0,
  },
  // Success
  msg: {
    height: Style.UNIT_Y,
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
    marginBottom: 1,
    paddingLeft: Style.PADDING*2,
    backgroundColor: '#16693c',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  msg_text: {
    color: "#FFF",
  },

  // Error
  msgError: {
    borderColor: "#C02827",
    backgroundColor: "#FDE8E9",
  },
  msgError_text: {
    color: "#ED1C24",
  },

  // Status
  msgStatus: {
    borderColor: "#408491",
    backgroundColor: "#8EDBE5",
  },
  msgStatus_text: {
    color: "#2f606a",
  },
});

/* Export Component ==================================================================== */
export default Alerts
