'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'

// App Globals
import AppConfig from '../config'
import AppStyles, {Style,underlayColor} from '../styles'

// components
import A from '../components/anchor'
import Alerts from '../components/alerts'
import Button from '../components/button'
import LoadingModal from '../components/loadingModal'
import MiText from '../components/text'
import MiTransText from '../components/MiTransText'
import MiTextInput from '../components/MiTextInput'

// screens
import Email from './Auth.Email'

import { forgotPassword, clearAuthError } from '../redux/auth'

export class ViaEmail extends Component {
    constructor(props) {
        super(props)
        this.state ={
            send: false
        }

        this.toResetMethod = this.toResetMethod.bind(this);
        this.toEmail = this.toEmail.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    toResetMethod() {
        this.props.clearAuthError()
        this.props.navigator.pop()
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    toEmail() {
        if (!this.validateEmail(this.state.email)) {
            this.setState({error: I18n.t('PleaseEnterAValidEmail')})
            return
        }
        this.props.clearAuthError()
        this.setState({send: true, error: null})
        this.props.forgotPassword(this.state.email, 'email')
    }


    render() {
        const showError = this.props.auth.resetPassword.error || this.state.error

        return <View style={[styles.outerContainer]}>
        <View style={[styles.innerContainer]}>
            <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
            <View style={[styles.text]}>
                {!showError && <MiTransText center>{'ForgotPassword'}</MiTransText>}
                {showError && <Alerts error={showError} />}
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
                    onSubmitEditing={() => this.toEmail()}
                />
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    text={'BACK'}
                    type={'reverse'}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={()=>this.toResetMethod()} />
                <Button
                    text={'SEND'}
                    type={''}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={()=>this.toEmail()} />
            </View>
        </View>
    </View>
    }
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  auth: state.auth,
})

// Define the actions this component may dispatch
const mapDispatchToProps = {
    forgotPassword,
    clearAuthError
}

const styles = StyleSheet.create({
    outerContainer: {height: Style.DEVICE_HEIGHT},
    innerContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        marginTop: Style.getHeight(16),
    },
    text: {
        height: Style.getHeight(54),
        justifyContent: 'center'
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(ViaEmail)