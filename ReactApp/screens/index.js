/**
 * Coming Soon
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
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles'
import AppConfig from '../config'

// Components
import Button from '../components/button';
import MiText from '../components/text';

import MiTransText from '../components/MiTransText'

// Screens
import Signup from './Auth.Signup';
import Login from './Auth.Login';
import Main from './Main';
import Email from './Auth.Email';
import MainAndroid from './Main.Android';
import ResetPassword from './Auth.ResetPassword';

// Redux
import { loadProfile } from '../redux/auth';

// images
const logo = AppConfig.logo;
const welcome = Platform.OS === 'android' ? AppConfig.welcomeAndroid : AppConfig.welcomeIos;
const group = require('../assets/images/group@2x.png');

/* Component ==================================================================== */
export class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      splashScreenVisible: this.props.showSplashScreen || false,
      routes: {
        validate: {
            title: '',
            component: Email,
            index: 1
        },
        error: {
            title: '',
            component: Email,
            index: 1
        },
      },
    }
    this.loginRoute = this.loginRoute.bind(this);
    this.signupRoute = this.signupRoute.bind(this);
    this.appMainRoute = this.appMainRoute.bind(this);
    this.parseValidateUrl = this.parseValidateUrl.bind(this);

    this.toLogin = this.debounce(() => { this.loginRoute() }, 400);
    this.toSignup = this.debounce(() => { this.signupRoute() }, 400);
    this.toAppMain = this.debounce(() => { this.appMainRoute() }, 400);
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    showSplashScreen: PropTypes.bool,
    placeholder: PropTypes.string,
  }

    componentDidMount() {
        const url = Linking.getInitialURL().then(url => {
            if (url) {
                this.parseValidateUrl(url);
            }
        });

        // ios deep link
        Linking.addEventListener('url', (e) => { this.parseValidateUrl(e.url) });
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', (e) => { this.parseValidateUrl(e.url) });
    }

    parseValidateUrl(url) {
        const route = url.replace(/.*?:\/\//g, "");
        const parts = route.split("?");
        if (route && parts.length > 1 && this.state.routes[parts[0]]) {
            let toGo = this.state.routes[parts[0]];
            if(this.props.auth.resetPassword.requesting) {
                toGo.data = {
                    ...this.parseQuery(parts[1]),
                    ...this.props.auth.resetPassword
                };
            } else {
                toGo.data = this.parseQuery(parts[1]);
            }
            this.props.navigator.replace(toGo);
        }
    }
    parseQuery(qstr) {
        var query = {};
        var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }
        return query;
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

  signupRoute() {
    this.props.navigator.push({
      title: 'Signup',
      component: Signup,
      index: 1
    });
  }

  loginRoute() {
    this.props.navigator.push({
      title: 'Login',
      component: Login,
      index: 1
    });
  }

  appMainRoute() {
    if(Platform.OS === 'ios'){
        this.props.navigator.push({
            title: 'Main',
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

  render() {
    const welcomeStyle = Platform.OS === 'ios' ? styles.welcomeIos : styles.welcomeAndroid;

    return (
      <View style={[{height: Style.DEVICE_HEIGHT}]}>
        <Image resizeMode='contain' style={[styles.bgImage]} source={group} />

        <View style={[styles.logoContainer]}>
            <Image resizeMode='contain' 
                   style={[welcomeStyle]}
                   source={welcome} />
        </View>

        <View style={[styles.welcomeView]}>
            <MiTransText center style={[styles.welcomeText]}>{'Welcome'}</MiTransText>
        </View>

        {this.props.auth.init && this.props.auth.data && !this.props.auth.data.accessToken &&
            <View style={[styles.formContainer]}>
                <Button type={''}
                  text={'LOGIN'}
                  size={'large'}
                  onPress={()=>this.toLogin()} />
                <Button type={'reverse'}
                  text={'REGISTER'}
                  size={'large'}
                  onPress={()=>this.toSignup()} />
            </View>
            }
      </View>
    );
  }
}

/* Styles ==================================================================== */
const styles = StyleSheet.create({
    bgImage: {
        position: 'absolute',
        top: -20,
        right: -20,
        height: Style.DEVICE_HEIGHT,
        width: Style.DEVICE_WIDTH
    },
    logoContainer: {
        marginTop: Style.getHeight(100),
        paddingRight: Platform.OS === 'ios' ? Style.getWidth(35) : 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeView: {
        height: Style.UNIT_Y,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Style.getHeight(66)
    },
    welcomeText: {
        fontFamily: AppConfig.lightFont,
        fontSize: Style.EM(1.75),
        paddingTop: Style.getHeight(15)
        // lineHeight: 0
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: Style.getHeight(80.5),
    },
    welcomeAndroid: {
        height: Style.getHeight(272),
        width: Style.getWidth(558)
    },
    welcomeIos: {
        height: Style.getHeight(237),
        width: Style.getWidth(443)

    }
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    loadProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
