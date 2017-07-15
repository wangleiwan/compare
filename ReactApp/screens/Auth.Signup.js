'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  findNodeHandle
} from 'react-native'
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import AppConfig from '../config'

// Components
import A from '../components/anchor';
import Button from '../components/button'
import Alerts from '../components/alerts'
import MiText from '../components/text';
import TelephoneInput from '../components/mobile';
import LoadingModal from '../components/loadingModal';
import MiTransText from '../components/MiTransText';
import MiTextInput from '../components/MiTextInput';
import MiTextInputMask from '../components/MiTextInputMask';

// Screens
import Login from './Auth.Login';
import Email from './Auth.Email';
import IndexPage from './index';

// Redux
import { signup, clearAuthError } from '../redux/auth';

// images
const logo = AppConfig.logo;
const group = require('../assets/images/group@2x.png');
const loadingGif = require('../assets/images/loading.gif');

const {State: TextInputState} = TextInput


/* Component ==================================================================== */
export class Signup extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
        name: '',
        email: '',
        password: '',
        secureTextEntry: true,
        passStrength: 'weak',
        accountIdNeeded: false,
        mobile: ''
    }
    this.toLogin = this.toLogin.bind(this);
    this.signup = this.signup.bind(this);
    this.signupWithAccountId = this.signupWithAccountId.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const accountIdNeeded = nextProps.auth.error && nextProps.auth.error === 'Account not found';
    if (accountIdNeeded && !this.state.accountIdNeeded) {
        this.props.clearAuthError();
        this.setState({accountIdNeeded});
    }

    if (!this.props.auth.newSignup && nextProps.auth.newSignup) {
        this.setState({accountIdNeeded: false});
    }
  }

  signup() {
    const mobileNumber = "+1" + this.state.mobile.toString().replace('(', '').replace(')','').replace(/\s/g, '');
    const mobileLength = mobileNumber.length;
    if (!this.state.name) {
        this.setState({error: I18n.t('PleaseEnterYourFullName')});
        return;
    } else if (mobileLength !== 12 && mobileLength !== 13) {
        this.setState({error: I18n.t('PleaseEnterACorrectMobileNumber')});
        return;
    } else if (!this.state.email) {
        this.setState({error: I18n.t('PleaseEnterYourEmail')});
        return;
    } else if (!this.state.password) {
        this.setState({error: I18n.t('PleaseEnterYourPassword')});
        return;
    } else if (this.state.password.length < 6) {
        this.setState({error: I18n.t('PleaseEnterAValidPassword')});
        return;
    } else if (!this.validateEmail(this.state.email)) {
        this.setState({error: I18n.t('PleaseEnterAValidEmail')});
        return;
    }

    // Form is valid
    const user = {
        name: this.state.name,
        //TODO: use country code
        mobile: "+1" + this.state.mobile.toString().replace('(', '').replace(')','').replace(/\s/g, ''),
        email: this.state.email,
        password: this.state.password,
    };

    this.setState({user: user, error: null});
    this.props.signup(user);
  }

  signupWithAccountId() {
    if (!this.state.accountId) {
        this.setState({error: I18n.t('PleaseEnterYourAccountId')});
        return;
    }

    // Form is valid
    const user = JSON.parse(JSON.stringify(this.state.user))
    user.accountId = parseInt(this.state.accountId, 10);
    this.setState({user: user, error: null});
    this.props.signup(user);
  }

  back() {
    this.props.clearAuthError();
    this.props.navigator.pop();
  }

  togglePasswordVisibility() {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  toLogin() {
    this.props.clearAuthError();
    this.props.navigator.replace({
      title: '',
      component: Login,
      index: 1
    });
  }

  renderAccountIdForm() {
    const error = this.props.auth.error || this.state.error;

    return <View style={[styles.formContainer]}>
        <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {!error && <MiTransText center>{'AccountIdTitle'}</MiTransText>}
            {error && <Alerts error={error} />}
        </View>

        <View>
            <View style={[{flexDirection: 'row'}]}>
                <MiTextInput
                    style={[AppStyles.textInput, AppStyles.textbox]}
                    editable={!this.props.auth.loading}
                    onChangeText={(accountId) => this.setState({accountId})}
                    value={this.state.accountId}
                    placeholder={I18n.t('AccountId')}
                    keyboardType={'numeric'}
                    placeholderTextColor='#79797A'
                    selectionColor={AppConfig.secondaryColor}
                    ref='accountId'
                    returnKeyType='done'
                    blurOnSubmit={false}
                    onSubmitEditing={()=>this.signupWithAccountId()}
                />
            </View>

            <View style={[{flexDirection: 'row'}]}>
                <Button
                    type={'reverse'}
                    text={'BACK'}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={()=>{this.setState({accountIdNeeded: false})}} />
                <View style={[styles.button]}>
                    <Button
                        text={'VALIDATE'}
                        type={''}
                        size={'large'}
                        disabled={this.props.auth.loading}
                        onPress={()=>this.signupWithAccountId()} />
                </View>
            </View>
        </View>
    </View>
  }

  renderSignupForm() {
    const showText = this.state.secureTextEntry ? 'show' : 'hide';
    const error = this.props.auth.error || this.state.error;
    const showError = error && error !== 'Account not found Please try log in.';
    let color = '#3FAC49';
    switch (this.state.passStrength) {
        case 'weak':
            color = '#ED1C24';
            break;
        case 'ok':
            color = '#CDA806';
            break;
        case 'good':
            color = '#78C57F';
            break;
        case 'strong':
            color = '#3FAC49';
            break;
    }

    return <View style={[styles.formContainer]}>
        <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {!showError && <MiTransText center>{'RegisterTitle'}</MiTransText>}
            {showError && <Alerts error={error} />}
        </View>

        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox]}
                editable={!this.props.auth.loading}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                placeholder={I18n.t('FullName')}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                autoCapitalize="words"
                autoFocus={true}
                returnKeyType='next'
                ref='fullname'
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField(this.refs.mobile)} />
        </View>
        <View style={[{flexDirection: 'row'}]}>
            <A style={[styles.countryCode]} onPress={()=>{}}>
                <View><MiText center color={'light'}>{'CA + 1'}</MiText></View>
            </A>
            <MiTextInputMask
                onChangeText={(mobile) => this.setState({mobile})}
                editable={!this.props.auth.loading}
                type={'custom'}
                placeholder={'Mobile Number'}
                placeholderTextColor={'#79797A'}
                selectionColor={AppConfig.secondaryColor}
                value={this.state.mobile}
                keyboardType={'phone-pad'}
                options={{mask:"(999) 999 9999"}}
                style={[AppStyles.textInput, AppStyles.textbox, {paddingLeft: Style.getWidth(65)}]}
                returnKeyType='next'
                ref='mobile'
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField(this.refs.email)} />
        </View>
        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox]}
                editable={!this.props.auth.loading}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                placeholder={I18n.t('EmailAddress')}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                autoCapitalize='none'
                keyboardType={'email-address'}
                returnKeyType='next'
                ref='email'
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField(this.refs.password)}
            />
        </View>
        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox, {color}, this.state.password.length > 0 && styles.shortenInput]}
                onChangeText={(password) => {
                    let passStrength = 'strong';
                    if (password.length < 6) {
                        passStrength = 'weak'
                    } else if (password.length < 10) {
                        passStrength = 'ok'
                    } else if (password.length < 15) {
                        passStrength = 'good'
                    }
                    this.setState({password, passStrength})
                }}
                value={this.state.password}
                placeholder={I18n.t('CreatePassword')}
                secureTextEntry={this.state.secureTextEntry}
                error={I18n.t('PleaseEnterYourPassword')}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                returnKeyType='done'
                ref='password'
                blurOnSubmit={false}
                onSubmitEditing={()=>this.signup()}
            />
            {this.state.password.length > 0 && <MiTransText color={'dark'} style={[styles.passStrength, styles.small, {color}]}>{this.state.passStrength}</MiTransText>}
            {this.state.password.length > 0 && <View style={[styles.showView]}>
                <A style={[styles.show]} onPress={this.props.auth.loading ? ()=>{} : ()=>{this.togglePasswordVisibility()}}>
                    <View><MiTransText color={'dark'} style={[styles.small]}>{showText}</MiTransText></View>
                </A>
            </View>}
        </View>

        <View style={[{flexDirection: 'row'}]}>
            <Button
                type={'reverse'}
                text={'BACK'}
                size={'large'}
                disabled={this.props.auth.loading}
                onPress={()=>this.back()} />
            <View style={[styles.button]}>
                <Button
                    text={'NEXT'}
                    type={''}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={()=>this.signup()} />
            </View>
        </View>
    </View>
  }

  /**
    * RENDER
    */
  render() {
    return (
      <View style={[{height: Style.DEVICE_HEIGHT}]}>
        <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />

        {this.state.accountIdNeeded && this.renderAccountIdForm()}
        {!this.state.accountIdNeeded && this.renderSignupForm()}
      </View>
    );
  }

  focusNextField(node) {
    try {
        TextInputState.focusTextInput(findNodeHandle(node))
    } catch(e) {
        console.log("Couldn't focus text input: ", e.message)
    }
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    passStrength: {position: 'absolute',
        top: Style.getHeight(30),
        left: Style.PADDING*2 + Style.getWidth(1),
    },
    show: {position: 'absolute',
        top: Style.getHeight(17),
        right: Style.getWidth(19)
    },
    countryCode: {
        position: 'absolute',
        top: Style.getHeight(18),
        left: Style.PADDING*2 + Style.getWidth(1),
        zIndex: 100
    },
    showView: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 1,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    shortenInput: {
        flex: 4
    },
    button: {
        marginLeft: 1,
    },
    small: { fontSize: 11 },
    formContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        // marginTop: Style.getHeight(16),
    }
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    signup,
    clearAuthError
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
