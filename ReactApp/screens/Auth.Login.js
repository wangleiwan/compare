'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  findNodeHandle
} from 'react-native'
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles'
import AppUtil from '../util'
import AppDB from '../db'
import AppConfig from '../config'

// Screens
import Main from './Main';
import MainAndroid from './Main.Android';
import Signup from './Auth.Signup';
import ResetMethod from './Auth.ResetMethod';

// Components
import A from '../components/anchor';
import Button from '../components/button';
import Alerts from '../components/alerts';
import MiTransText from '../components/MiTransText';
import LoadingModal from '../components/loadingModal';
import I18n from 'react-native-i18n';
import MiTextInput from '../components/MiTextInput';

// Redux
import { login, clearAuthError } from '../redux/auth';

// images
const logo = AppConfig.logo;
const group = require('../assets/images/group@2x.png');
const checkmark = require('../assets/images/checkmark@2x.png');
const loadingGif = require('../assets/images/loading.gif');

const {State: TextInputState} = TextInput;

/* Component ==================================================================== */
export class Login extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      secureTextEntry: true,
      remember: true,
      username: '',
      password: '',
      accountId: '',
    }
    this.toWelcome = this.toWelcome.bind(this);
    this.toForgetPassword = this.toForgetPassword.bind(this);
    this.login = this.login.bind(this);
    this.toAppMain = this.toAppMain.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const accountIdNeeded = nextProps.auth.error && nextProps.auth.error === 'AccountNotFound';
    const accountIdNotNeeded = nextProps.auth.error && nextProps.auth.error === 'InvalidLoginCredentials';

    if (accountIdNeeded && !this.state.accountIdNeeded) {
        this.props.clearAuthError();
        this.setState({accountIdNeeded});
    }

    if(accountIdNotNeeded) {
        this.setState({accountIdNeeded: false})
    }
  }

  login() {
    if (!this.state.username) {
        this.setState({error: I18n.t('PleaseEnterYourEmail')});
        return;
    } else if (!this.state.password) {
        this.setState({error: I18n.t('PleaseEnterYourPassword')});
        return;
    } else if (!this.validateEmail(this.state.username)) {
        this.setState({error: I18n.t('PleaseEnterAValidEmail')});
        return;
    }

    // Form is valid
    const user = {
        email: this.state.username,
        password: this.state.password,
    };
    this.setState({user: user, error: null});
    this.props.login(user);
  }

  loginWithAccountId() {
    if (!this.state.accountId) {
        this.setState({error: I18n.t('PleaseEnterYourAccountId')});
        return;
    }

    // Form is valid
    const user = JSON.parse(JSON.stringify(this.state.user))
    user.accountId = parseInt(this.state.accountId, 10);
    this.setState({user: user, error: null});
    this.props.login(user);
  }

  toAppMain() {
    this.props.clearAuthError();
    if(Platform.OS === 'ios'){
        this.props.navigator.push({
        title: '',
        component: Main,
        index: 1
        });
    }else{
        this.props.navigator.push({
            title: 'MainAndroid',
            component: MainAndroid,
            index: 1
        });
    }
    
  }

  toForgetPassword() {
    this.props.clearAuthError();
    this.props.navigator.push({
        title: '',
        component: ResetMethod,
        index: 2
    })
  }

  toWelcome() {
      this.props.clearAuthError();
      this.props.navigator.pop();
  }

  togglePasswordVisibility() {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  }

  validateEmail(email) {
    return AppUtil.validateEmail(email);
  }

  renderAccountIdForm() {
    const error = this.props.auth.error || this.state.error;

    return <View style={[styles.formContainer]}>
        <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {!error && <MiTransText center>{'AccountIdTitle'}</MiTransText>}
            {error && <Alerts error={error} />}
        </View>

        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox]}
                onChangeText={(accountId) => this.setState({accountId})}
                editable={!this.props.auth.loading}
                value={this.state.accountId}
                placeholder={I18n.t('AccountId')}
                keyboardType={'numeric'}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                ref='accountId'
                returnKeyType='done'
                blurOnSubmit={false}
                onSubmitEditing={()=>this.loginWithAccountId()}
            />
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
                    onPress={()=>this.loginWithAccountId()} />
            </View>
        </View>
    </View>
  }

  renderLoginForm() {
    const showText = this.state.secureTextEntry ? 'show' : 'hide';
    const error = this.props.auth.error || this.state.error;
    const showError = error && error !== 'AccountNotFound';

    return <View style={[styles.formContainer]}>
        <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
        <View style={{height: Style.getHeight(54), justifyContent: 'center'}}>
            {!showError && <MiTransText center>{'LoginTitle'}</MiTransText>}
            {showError && <Alerts error={error} />}
        </View>

        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox]}
                onChangeText={(username) => this.setState({username})}
                editable={!this.props.auth.loading}
                value={this.state.username}
                placeholder={I18n.t('EmailAddress')}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                autoCapitalize='none'
                autoFocus={true}
                keyboardType={'email-address'}
                returnKeyType='next'
                ref='username'
                blurOnSubmit={false}
                onSubmitEditing={() => this.focusNextField(this.refs.password)}
            />
        </View>
        <View style={[{flexDirection: 'row'}]}>
            <MiTextInput
                style={[AppStyles.textInput, AppStyles.textbox, {margin: 0, borderWidth: 0}, this.state.password.length > 0 && styles.shortenInput]}
                onChangeText={(password) => this.setState({password})}
                editable={!this.props.auth.loading}
                value={this.state.password}
                placeholder={I18n.t('Password')}
                secureTextEntry={this.state.secureTextEntry}
                error={I18n.t('PleaseEnterYourPassword')}
                placeholderTextColor='#79797A'
                selectionColor={AppConfig.secondaryColor}
                returnKeyType='done'
                ref='password'
                blurOnSubmit={false}
                onSubmitEditing={() => this.login()}
            />
            {this.state.password.length > 0 && <View style={[styles.showView]}>
                <A style={[styles.show]} onPress={this.props.auth.loading ? ()=>{} : ()=>{this.togglePasswordVisibility()}}>
                    <View><MiTransText color={'dark'} style={[styles.small]}>{showText}</MiTransText></View>
                </A>
            </View>}
        </View>
        <View style={[{flexDirection: 'row'}]}>
            <Button
                text={'BACK'}
                type={'reverse'}
                size={'large'}
                disabled={this.props.auth.loading}
                onPress={()=>this.toWelcome()} />
            <Button
                text={'LOGIN'}
                type={''}
                size={'large'}
                disabled={this.props.auth.loading}
                onPress={()=>this.login()} />
        </View>
        <View style={[styles.password]}>
            <A onPress={this.toForgetPassword}>
                <View><MiTransText center>{'forgot password?'}</MiTransText></View>
            </A>
        </View>
    </View>
  }

  render() {
    return (
      <View style={[{height: Style.DEVICE_HEIGHT}]}>
        <Image resizeMode='contain' style={[AppStyles.bgImage]} source={group} />

        {this.state.accountIdNeeded && this.renderAccountIdForm()}
        {!this.state.accountIdNeeded && this.renderLoginForm()}
      </View>
    );
  }

  back() {
   this.setState({accountIdNeeded: false});
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
    logoImage: {height: Style.getHeight(75)},
    show: {position: 'absolute', top: Style.getHeight(17), right: Style.getWidth(19)},
    showText: {fontSize: 11},
    formContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
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
    password: {
        marginTop: Style.getHeight(16),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    login,
    clearAuthError
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
