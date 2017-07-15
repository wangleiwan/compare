/**
 * App - set all the things up
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

/* Setup ==================================================================== */
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  AsyncStorage
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { connect } from 'react-redux';
import LinearGradient from './../components/LinearGradient';
import SplashScreen from 'react-native-splash-screen';

// App Globals
import AppStyles, {underlayColor} from '../styles';
import AppConfig from '../config';
import AppUtil from '../util';

// Components
import NavbarElements from '../components/navbar.elements';

// Screens
import Index from '../screens/index';
import Main from '../screens/Main';
import Email from '../screens/Auth.Email';
import MainAndroid from '../screens/Main.Android';
import Mobile from '../screens/Auth.Mobile';
import Login from '../screens/Auth.Login';
import ResetPassword from '../screens/Auth.ResetPassword';

// Redux
import {loadUsers, loadGroups} from '../redux/users';
import {loadConvs} from '../redux/conversations';
import {save,load as loadFavs} from '../redux/favorites';
import {loadProfile, loadAuth, sendVerify, login, clearAuth} from '../redux/auth';

/* Component ==================================================================== */
export class AppContainer extends Component<any, any> {
    constructor(props){
        super(props);
        if(SplashScreen)
          SplashScreen.hide();
        this.state = {
            appBackgroundColor: {
                startColor: AppConfig.primaryColor,
                endColor: AppConfig.tertiaryColor
            }
        };
    }

    componentWillReceiveProps(nextProps) {

        const mobileNotVerified = nextProps.auth.user && nextProps.auth.user.userId && !nextProps.auth.user.mobileVerified;
        const emailNotVerified = nextProps.auth.user && nextProps.auth.user.userId && !nextProps.auth.user.emailVerified;
        const mobileVerified = nextProps.auth.user && nextProps.auth.user.userId && nextProps.auth.user.mobileVerified;
        const emailVerified = nextProps.auth.user && nextProps.auth.user.userId && nextProps.auth.user.emailVerified;
        const newSignup = !this.props.auth.newSignup && nextProps.auth.newSignup;
        const newLogin = (!this.props.auth.data || !this.props.auth.data.accessToken) && nextProps.auth.data && nextProps.auth.data.accessToken;

        // reset password
        const isForgotPasswordEmail = !this.props.auth.resetPassword.requesting && nextProps.auth.resetPassword.requesting && nextProps.auth.resetPassword.resetType === 'email';
        const isForgotPasswordMobile = !this.props.auth.resetPassword.requesting && nextProps.auth.resetPassword.requesting && nextProps.auth.resetPassword.resetType === 'mobile' && !nextProps.auth.resetPassword.resend;
        const forgotPasswordVerified = !this.props.auth.resetPassword.verified && nextProps.auth.resetPassword.verified;
        const isResetPassword = !this.props.auth.resetPassword.reset && nextProps.auth.resetPassword.reset;

        // mobile recently verified
        if (!this.props.auth.mobileVerified && nextProps.auth.mobileVerified) {
            this.props.loadProfile().then(user => {
                this.props.loadFavs();
                this.props.loadUsers();
                this.props.loadGroups();
                this.props.loadConvs();
                this.toAppMain();
            });

            return;
        }

        if (this.props.auth.data && this.props.auth.data.accessToken && (!nextProps.auth.data || !nextProps.auth.data.accessToken)) {
            this.toIndex();
            return;
        }

        if (newLogin) {
            this.props.loadProfile(nextProps.auth.from).then(user => {
                this.props.loadFavs();
                this.props.loadUsers();
                this.props.loadGroups();
                this.props.loadConvs();
                if (user.mobileVerified) {
                    this.toAppMain();
                } else {
                    this.props.sendVerify(user.accountId, user.userId, "mobile");
                    this.toMobileScreen();
                }
            });
            return;
        }

        if (newSignup) {
            setTimeout(()=>{
                this.props.sendVerify(nextProps.auth.user.accountId, nextProps.auth.user.userId, "email");
            }, 600);
            this.toEmailScreen();
            return
        }

        // reset password
        if (isForgotPasswordEmail) {
            this.toEmailScreenForgotPassword(nextProps);
            return;
        }

        if (isForgotPasswordMobile) {
            this.toMobileScreenForgotPassword(nextProps);
            return;
        }

        if (forgotPasswordVerified) {
            if(this.props.auth.resetPassword.resetType === 'mobile') {
                this.toResetPassword(nextProps);
                return
            }
            
            setTimeout(()=> {
                this.toResetPassword(nextProps);
            }, 2000)
            return
        }

        if (isResetPassword) {
            setTimeout(()=> {
                this.props.clearAuth();
                (this.refs.rootNavigator as any).popToRoute((this.refs.rootNavigator as any).getCurrentRoutes()[1]);   
            }, 2000)
            return
        }
    }

    toResetPassword(props) {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: ResetPassword,
          index: 0,
          passProps: {
              reset: true,
              payload: props.auth.resetPassword
          }
        });
    }

    toEmailScreenForgotPassword(props) {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: Email,
          index: 2,
          passProps: {
              reset: true,
              payload: props.auth.resetPassword
          }
        });
    }

     toMobileScreenForgotPassword(props) {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: Mobile,
          index: 2,
          passProps: {
              reset: true,
              payload: props.auth.resetPassword
          }
        });
    }

    toEmailScreen() {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: Email,
          index: 0
        });
    }

    toMobileScreen() {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: Mobile,
          index: 0
        });
    }

    toIndex() {
        (this.refs.rootNavigator as any).resetTo({
          title: '',
          component: Index,
          index: 1
        });
    }

    toAppMain() {
        if(Platform.OS === 'ios'){
            (this.refs.rootNavigator as any).immediatelyResetRouteStack([{
                title: '',
                component: Main,
                index: 1
            }]);
        }else{
            (this.refs.rootNavigator as any).immediatelyResetRouteStack([{
                title: 'MainAndroid',
                component: MainAndroid,
                index: 1
            }]);
        }
        
    }

    toLogin() {
        (this.refs.rootNavigator as any).push({
          title: '',
          component: Login,
          index: 1
        });
    }

  componentDidMount() {
    StatusBar.setHidden(false, 'slide');
    this.props.loadAuth();

    if (this.props.auth.data && this.props.auth.data.accessToken) {
        this.props.loadProfile().then(user => {
            this.props.loadFavs();
            this.props.loadUsers();
            this.props.loadConvs();
            if (user.mobileVerified) {
                this.toAppMain();
            } else {
                this.props.sendVerify(user.accountId, user.userId, "mobile");
                this.toMobileScreen();
            }
        });
    }

    AsyncStorage.getItem('appBackgroundColor').then((value) => {
      if(value)
        this.setState({appBackgroundColor: JSON.parse(value)});
    });
  }

  /**
    * Render each scene with a Navbar and Sidebar
    */
  _renderScene = (route, navigator) => {
    // Show Hamburger Icon when index is 0, and Back Arrow Icon when index is > 0
    let rootNav = this.refs['rootNavigator'] as any as Navigator; //unsafe assertion necessary for now
    let leftButton = {
      onPress: (route.index > 0)
        ? rootNav.pop
        : () => {},
      icon: null,
      image: null
    };

    if (route.index > 0) {
        leftButton.icon = 'ios-arrow-back-outline';
    }
    else {
        leftButton.image = 'https://d6ipq3dmfa3r5.cloudfront.net/chat/assets/img/app/logo.white.sm.png';
    }

    // Show a cross icon when transition pops from bottom
    if(route.transition == 'FloatFromBottom')  {
      leftButton.icon = 'ios-close-outline';
    }

    return (
      <LinearGradient
            colors={[this.state.appBackgroundColor.endColor, this.state.appBackgroundColor.startColor]}
            locations={[0,1]}
            style={[AppStyles.appContainer, AppStyles.container]}>
        <route.component title={route.title} data={route.data} navigator={navigator} route={route} {...route.passProps} />
      </LinearGradient>
    );
  }

  /**
    * RENDER
    */
  render() {
    return (
        <View
          style={[AppStyles.container]}
        >
          <StatusBar barStyle='light-content' />
          <Navigator
            ref="rootNavigator"
            renderScene={this._renderScene}
            configureScene={function(route, routeStack) {
              if(route.transition == 'FloatFromBottom')
                return Navigator.SceneConfigs.FloatFromBottom;
              else
                return Navigator.SceneConfigs.FloatFromRight;
            }}
            initialRoute={{
              component: Index,
              index: 0,
              navigator: this.refs.rootNavigator,
              passProps: {
                showSplashScreen: true,
              }
            }}
          />
        </View>
    );
  }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
    favorites: state.favorites,
    users: state.users,
    auth: state.auth
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  loadUsers,
  loadGroups,
  loadConvs,
  loadFavs,
  loadAuth,
  loadProfile,

  sendVerify,
  save,
  login,
  clearAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
