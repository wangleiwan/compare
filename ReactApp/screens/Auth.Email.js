'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform
} from 'react-native'
import { connect } from 'react-redux';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import AppConfig from '../config'

// Screens
import Main from './Main';
import MainAndroid from './Main.Android';
import Login from './Auth.Login';

// Components
import A from '../components/anchor';
import Button from '../components/button'
import Alerts from '../components/alerts';
import MiTransText from '../components/MiTransText';
import Loading from '../components/loading';
import EmailManual from './Auth.EmailManualConfirm';
import LinearGradient from '../components/LinearGradient';

// Redux
import {verifyResetCode, forgotPassword, verify, sendVerify, login, clearAuth, clearAuthError, clearReset } from '../redux/auth';

// Images
const group = require('../assets/images/group@2x.png');

/* Component ==================================================================== */
export class Email extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      finished: false,
      code: '',
      isChecked: false
    }
    this.toManual = this.toManual.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.reSend = this.reSend.bind(this);
    this.clearResent = this.clearResent.bind(this);
    this.toAppMain = this.toAppMain.bind(this);
  }

  componentDidMount() {
    this.props.clearAuthError();
    const code = this.props.data && this.props.data.code ? this.props.data.code : '';
    if (code) {
        this.props.data.requesting ? this.props.verifyResetCode(this.props.data.method, code, 'email', 'link') : this.props.verify(this.props.data.accountId, this.props.data.userId, this.props.data.type, code, 'link');
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.auth.error && nextProps.auth.error && !this.props.auth.emailManual)
       || (!this.props.auth.resetPassword.error && nextProps.auth.resetPassword.error && !this.props.auth.emailManual)) {
      this.setState({isChecked: true});
      return;
    }
    // email recently verified
    if (!this.props.auth.emailVerified && nextProps.auth.emailVerified) {
        this.setState({finished: true});
        setTimeout(()=>{
            if (!this.props.auth.authInfo) {
                this.props.navigator.push({
                  title: '',
                  component: Login,
                  index: 2
                });
            } else {
                this.props.login(this.props.auth.authInfo, 'email');
            }
        }, 6000);
        return;
    }
  }

  reSend() {
    this.props.clearAuthError();
    if(this.props.reset) {
      this.props.forgotPassword(this.props.payload.method, 'email', 'resend', true)
    } else {
      this.props.sendVerify(this.props.auth.user.accountId, this.props.auth.user.userId, "email");
    }
    this.setState({resent: true});
  }

  clearResent() {
    this.setState({resent: false});
  }

  toAppMain() {
    this.props.clearAuthError();
    if(Platform.OS === 'ios'){
      this.props.navigator.push({
        title: '',
        component: Main,
        index: 2
      });
    }else{
      this.props.navigator.push({
        title: 'MainAndroid',
        component: MainAndroid,
        index: 2
      });
    }
      
  }

  handleBackButton() {
    if(this.props.reset) {
      const routeTo = this.props.navigator.getCurrentRoutes()[1];
      this.props.clearReset();
      this.props.navigator.popToRoute(routeTo)
    } else {
      this.props.clearAuth();
      this.setState({resent: false});
      this.props.navigator.pop();
    }
  }

  toManual() {
    this.props.clearAuthError();
    if (this.props.reset) {
      this.props.navigator.push({
        title: '',
        component: EmailManual,
        index: 5,
        passProps: {
          reset: true,
          email: this.props.payload.method
        }
      })
    } else {
      this.props.navigator.push({
        title: '',
        component: EmailManual,
        index: 2
      })
    }
  }

  renderEmailReSent() {
    const code = this.props.data && this.props.data.code ? this.props.data.code : '';

    return <View style={[styles.formContainerResent]}>

        <MiTransText style={[styles.resentInfo]} weight='light'>{'ResentTitle'}</MiTransText>

        <MiTransText lines={3} style={[styles.resentInfo]} weight='light'>{'ResentParagraph'}</MiTransText>

        <Button
            type={'custom'}
            text={'BACK'}
            size={''}
            buttonStyle={[styles.resentButton]}
            textStyle={[styles.resentText]}
            onPress={()=>this.clearResent()} />

    </View>;
  }

  renderEmailVerifyForm() {
    let msg = 'Please click the link provided in your email';
    const code = this.props.data && this.props.data.code ? this.props.data.code : '';
    const error = this.props.auth.error || this.props.auth.resetPassword.error;

    if (this.state.error) {
        msg = this.props.auth.error || this.props.auth.resetPassword.error
    } else if (this.state.finished && !this.props.auth.error && !this.props.auth.resetPassword.error) {
        msg = 'Email successfully verified';
    } else if (code !== '' && !this.state.finished && !this.state.isChecked) {
        msg = 'Confirming your email...';
    }

    return <View style={[styles.formContainer]}>
        {code !== '' && !error && !this.state.isChecked && <LinearGradient colors={['#3FAC49', '#399041']} locations={[0,1]} style={[styles.linear]}>
          <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />
          <View style={[styles.center]}>
            <Loading finished={this.state.finished} />
            <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
              <MiTransText center>{msg}</MiTransText>
          </View>
        </View>
        </LinearGradient>}
        <View>
            <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
              {error && <Alerts error={error} />}
              {!error && <MiTransText center>{msg}</MiTransText>}
            </View>
            <Button
              type={'faded'}
              text={'or enter verification code manually'}
              size={''}
              onPress={()=>this.toManual()}
            />
            <View style={[styles.row]}>
                <Button
                  type={'reverse'}
                  text={'BACK'}
                  size={'large'}
                  onPress={this.handleBackButton} />
                <Button
                  type={''}
                  text={'Resend'}
                  size={'large'}
                  onPress={()=>this.reSend()} />
            </View>
        </View>
    </View>;
  }

  render() {
    return (
      <View style={[styles.outerContainer]}>
        {!this.state.resent && <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />}
        {this.state.resent && this.renderEmailReSent()}
        {!this.state.resent && this.renderEmailVerifyForm()}
      </View>
    );
  }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    verifyResetCode,
    forgotPassword,
    verify,
    sendVerify,
    login,
    clearAuth,
    clearAuthError,
    clearReset
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    row: {flexDirection: 'row'},
    linear: {
      position: 'absolute',
      height: Style.DEVICE_HEIGHT,
      width: Style.DEVICE_WIDTH,
      top: -Style.getHeight(20),
      left: -Style.getWidth(37),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 75,
        height: 50,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    resentInfo: {
        marginLeft: Style.getWidth(17),
        width: Style.getWidth(300),
        marginBottom: Style.getHeight(20)
    },
    resentText: {
      color: AppConfig.primaryColor,
    },
    resentButton: {
      backgroundColor: '#F5F5F6',
      width: Style.getWidth(300),
    },
    outerContainer: {height: Style.DEVICE_HEIGHT},
    formContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        // marginTop: Style.getHeight(16),
    },
    formContainerResent: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        marginTop: Style.getHeight(32),
    },
    signup: {
        position: 'absolute',
        bottom: Style.getHeight(46),
        justifyContent: 'center',
        alignItems: 'center',
        width: Style.DEVICE_WIDTH
    },
});
