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
  Platform
} from 'react-native'
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import AppConfig from '../config'

// Screens
import Main from './Main';
import MainAndroid from './Main.Android';
import Signup from './Auth.Signup';
import LoadingModal from '../components/loadingModal';

// Components
import A from '../components/anchor';
import Button from '../components/button'
import Alerts from '../components/alerts';
import MiText from '../components/text'
import MiTransText from '../components/MiTransText';
import MiTextInput from '../components/MiTextInput';
import MiTextInputMask from '../components/MiTextInputMask';

// Redux
import {verifyResetCode, forgotPassword, verify, sendVerify, update as updateUser, clearAuthError, clearReset } from '../redux/auth';

// Images
const group = require('../assets/images/group@2x.png');

/* Component ==================================================================== */
export class Mobile extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      mobile: props.reset ? props.payload.method.substring(2) : props.auth.user.mobile.substring(2),
      needsResend: true,
      resent: false,
      code: '',
      disabled: false
    }
    this.handleBackButton = this.handleBackButton.bind(this);
    this.reSend = this.reSend.bind(this);
    this.verify = this.verify.bind(this);
    this.toAppMain = this.toAppMain.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.renderMobileVerifyForm = this.renderMobileVerifyForm.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.toCancel = this.toCancel.bind(this);
  }

  reSend() {
    this.verifyMobile();
    if(!this.state.error) {
      this.props.clearAuthError();
      if(this.props.reset){
        this.props.forgotPassword(this.props.payload.method, 'mobile', 'resend')
      } else {
          this.props.updateUser({mobile: '+1' + this.state.mobile.replace('(', '').replace(')','').replace(/\s/g, '')}).then((user) => {
          this.props.sendVerify(user.accountId, user.userId, "mobile")
        });
      }
      this.setState({needsResend: false, resent: true});
    }
  }

  verify() {
    this.verifyMobile();
    if(!this.state.error) {
      this.props.clearAuthError();
      this.props.reset ? this.props.verifyResetCode(this.props.payload.method, this.state.code, 'mobile') : this.props.verify(this.props.auth.user.accountId, this.props.auth.user.userId, "mobile", this.state.code);
    }
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
    this.props.clearAuthError('mobile');
    if(this.props.reset) {
      this.props.clearReset();
      const RouteTo = this.props.navigator.getCurrentRoutes()[1];
      this.props.navigator.popToRoute(RouteTo);
    } else {
      this.props.navigator.resetTo({
        title: '',
        component: Signup,
        index: 1
      });
    }
  }

  verifyMobile() {
    const mobileNumber = "+1" + this.state.mobile.replace('(', '').replace(')','').replace(/\s/g, '');
    const mobileToDisplay = mobileNumber.substring(2);
    const mobileLength = mobileNumber.length;
    if (mobileLength !== 12 && mobileLength !== 13) {
      this.setState({error: I18n.t('PleaseEnterACorrectMobileNumber'), disabled: true});
    } else {
      this.setState({mobile: mobileToDisplay})
    }
  }

  onChangeMobile(value) {
    if (value.length === 14 || value.length === 15) {
        this.setState({mobile: value, needsResend: true, disabled: false})
    } else {
        this.setState({mobile: value, needsResend: true, disabled: true})
    }
  }

  handleTextChange(code) {
    this.setState({code});
    
    if (this.state.resent) {
      this.setState({needsResend: false, disabled: code.length !== 6});
    } else if (code.length === 6) {
      this.setState({needsResend: false, disabled: false});
    } else {
      this.setState({needsResend: true, disabled: false})
    }
  }

  toCancel() {

  }

  renderMobileVerifyForm() {
    const btnText = this.state.needsResend ? 'RE-SEND' : 'FINISH';
    const btnPress = this.state.needsResend ? this.reSend : this.verify;
    const error = this.props.auth.error || this.props.auth.resetPassword.error || this.state.error;

    return <View style={[styles.formContainer]}>
        <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {!error && <MiTransText center>{'MobileTitle'}</MiTransText>}
            {error && <Alerts error={error} />}
        </View>

        <View style={[{flexDirection: 'row'}]}>
          <A style={[styles.countryCode]} onPress={()=>{}}>
              <View><MiText center color={'light'}>{'CA + 1'}</MiText></View>
          </A>
          <MiTextInputMask
              onChangeText={this.onChangeMobile}
              editable={!this.props.auth.loading}
              selectionColor={AppConfig.secondaryColor}
              type={'custom'}
              placeholder={'Mobile Number'}
              placeholderTextColor={'#79797A'}
              value={this.state.mobile}
              keyboardType={'phone-pad'}
              options={{mask:"(999) 999 9999"}}
              ref='mobile'
              returnKeyType='next'
              blurOnSubmit={false}
              style={[AppStyles.textInput, AppStyles.textbox, {paddingLeft: Style.getWidth(65)}]}
          />
        </View>
        <View style={[{flexDirection: 'row'}]}>
          <MiTextInput
              style={[AppStyles.textInput, AppStyles.textbox]}
              onChangeText={this.handleTextChange}
              value={this.state.code}
              placeholder={I18n.t('ValidationCode')}
              placeholderTextColor='#79797A'
              selectionColor={AppConfig.secondaryColor}
              keyboardType={'numeric'}
              autoCapitalize="words"
              autoFocus={true}
              maxLength={6}
          />
        </View>
        <View style={[styles.row]}>
            {this.props.reset && <Button type={'reverse'}
              text={'BACK'}
              size={'large'}
              onPress={()=>{this.handleBackButton}} />}
            <Button type={''}
              text={btnText}
              size={'large'}
              disabled={this.state.disabled}
              onPress={btnPress} />
        </View>
    </View>
  }

  render() {
    return (
      <View style={[styles.outerContainer]}>
        <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />
        {this.renderMobileVerifyForm()}
        <View style={[styles.cancel]}>
            <A onPress={this.toCancel}>
                <View><MiTransText center>{'CancelRegistration'}</MiTransText></View>
            </A>
        </View>
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
    forgotPassword,
    verifyResetCode,
    verify,
    sendVerify,
    updateUser,
    clearAuthError,
    clearReset
};

export default connect(mapStateToProps, mapDispatchToProps)(Mobile);

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    row: {flexDirection: 'row', justifyContent: 'flex-end'},
    center: {justifyContent: 'center', alignItems: 'center'},
    image: {
        width: 75,
        height: 50,
        borderRadius: 13,
        margin: 3,
        resizeMode: 'cover',
    },
    outerContainer: {height: Style.DEVICE_HEIGHT},
    formContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        // marginTop: Style.getHeight(16),
    },
    countryCode: {
        position: 'absolute',
        top: Style.getHeight(18),
        left: Style.PADDING*2 + Style.getWidth(1),
        zIndex: 100
    },
    cancel: {
        marginTop: Style.getHeight(16),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signup: {
        position: 'absolute',
        bottom: Style.getHeight(46),
        justifyContent: 'center',
        alignItems: 'center',
        width: Style.DEVICE_WIDTH
    },
});
