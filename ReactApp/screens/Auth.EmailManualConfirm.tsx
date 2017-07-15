'use strict'

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
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import AppConfig from '../config'

// Screens
import Main from './Main'
import Login from './Auth.Login'
import ResetPassword from './Auth.ResetPassword'

// Components
import A from '../components/anchor'
import Button from '../components/button'
import Alerts from '../components/alerts'
import MiTransText from '../components/MiTransText'
import Loading from '../components/loading'
import MiTextInput from '../components/MiTextInput'
import LinearGradient from '../components/LinearGradient'

// Redux
import { manualVerify, sendVerify, login, clearAuth, clearAuthError, backToSignUp, verifyResetCode } from '../redux/auth'

// Images
const group = require('../assets/images/group@2x.png')

// interface props {
//     auth,
//     navigator,
//     login,
//     clearAuthError,
//     verify,
//     sendVerify
// }

// interface state {
//     finished: boolean,
//     needsResend: boolean,
//     resent: boolean,
//     btnPressed: boolean,
//     verificationCode: string
// }

/* Component ==================================================================== */
export class EmailManual extends Component<any, any> {
  constructor(props) {
    super(props)

    // Initial state
    this.state = {
      finished: false,
      verificationCode: '',
      verifying: false,
      error: this.props.auth.error || this.props.auth.resetPassword.error
    }
    this.toEmail = this.toEmail.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleBtnPress = this.handleBtnPress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.auth.loading && (nextProps.auth.error || nextProps.auth.resetPassword.error)) {
        this.setState({verifying: false})
        return
    }

    // email recently verified
    if (!this.props.auth.emailVerified && nextProps.auth.emailVerified) {
        if (!this.props.auth.authInfo) {
            this.props.navigator.push({
                title: '',
                component: Login,
                index: 2
            })
        } else {
            setTimeout(()=>{
                this.props.login(this.props.auth.authInfo, true)
            }, 500)
        }
        this.setState({finished: true, error: false})
        return
    }
  }

  handleTextChange(code) {
    this.setState({verificationCode: code})  
  }

  handleBtnPress() {
    if(this.props.reset) {
        this.props.clearAuthError();
        this.props.verifyResetCode(this.props.email, this.state.verificationCode, 'email')
    } else {
        this.props.clearAuthError();
        setTimeout(()=> {
            this.props.manualVerify(this.props.auth.user.accountId, this.props.auth.user.userId, "email", this.state.verificationCode)
        }, 500)
    }
    this.setState({verifying: true})
  }

  toEmail() {
    this.props.backToSignUp();
    this.props.navigator.popToRoute(this.props.navigator.getCurrentRoutes()[1])
  }

  renderVerifying() {
    let msg = 'Confirming your email...'
    
    if (this.state.finished && !this.props.auth.error && !this.props.auth.resetPassword.error) {
        msg = 'Email successfully verified'
    }

    return <View style={[styles.formContainer]}>
        <LinearGradient colors={['#3FAC49', '#399041']} locatilottons={[0,1]} style={[styles.linear]}>
          <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />
          <View style={[styles.center]}>
            <Loading finished={this.state.finished} />
            <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
              <MiTransText center>{msg}</MiTransText>
          </View>
        </View>
        </LinearGradient>
    </View>
  }

  renderEmailVerifyForm() {
    let msg = 'Code Incorrect. Please try again!'
    const error = this.props.auth.error || this.props.auth.resetPassword.error

    return <View style={[styles.formContainer]}>
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {error && <Alerts error={msg}/>}
        </View>
        <View style={[styles.row]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox]}
                onChangeText={this.handleTextChange}
                value={this.state.verificationCode}
                placeholder={I18n.t('VerificationCode')}
                placeholderTextColor='#B3B3B3'
                selectionColor={AppConfig.secondaryColor}
                keyboardType={'numeric'}
                autoCapitalize="words"
                autoFocus={true}
                maxLength={6}
            />
        </View>

        <View style={[styles.row]}>
            <Button
            type={'reverse'}
            text={'BACK'}
            size={'large'}
            onPress={()=>this.toEmail()} />
            <Button
            type={''}
            text={'VERIFY'}
            size={'large'}
            disabled={this.state.verificationCode.length !== 6}
            onPress={this.handleBtnPress} />
        </View>
    </View>
  }

  render() {
    return (
      <View style={[styles.outerContainer]}>
        {this.state.verifying && this.renderVerifying()}
        {!this.state.verifying && this.renderEmailVerifyForm()}
      </View>
    )
  }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
})

// Define the actions this component may dispatch
const mapDispatchToProps = {
    manualVerify,
    sendVerify,
    login,
    clearAuth,
    clearAuthError,
    backToSignUp,
    verifyResetCode
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailManual)

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    row: {flexDirection: 'row'},
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    linear: {
      position: 'absolute',
      height: Style.DEVICE_HEIGHT,
      width: Style.DEVICE_WIDTH,
      top: -Style.getHeight(20),
      left: -Style.getWidth(37),
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
        marginLeft: Style.getWidth(14),
        width: Style.getWidth(266)
    },
    outerContainer: {height: Style.DEVICE_HEIGHT},
    formContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        // marginTop: Style.getHeight(16),
    },
    signup: {
        position: 'absolute',
        bottom: Style.getHeight(46),
        justifyContent: 'center',
        alignItems: 'center',
        width: Style.DEVICE_WIDTH
    },
})
