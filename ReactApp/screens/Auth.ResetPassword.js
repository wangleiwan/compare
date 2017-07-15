'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  findNodeHandle
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
import Login from './Auth.Login'

import { resetPassword, clearAuthError, clearReset } from '../redux/auth'

const {State: TextInputState} = TextInput;

export class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state ={
            password: '',
            confirmPassword: '',
            secureTextEntryPsw: true,
            secureTextEntryConPsw: true,
            passStrength: 'weak',
            conPswStrength: 'weak',
            finish: false
        }

        this.handleResetPassword = this.handleResetPassword.bind(this)
        this.toLogin = this.toLogin.bind(this)
        this.togglePasswordVisibilityPsw = this.togglePasswordVisibilityPsw.bind(this)
        this.togglePasswordVisibilityConPsw = this.togglePasswordVisibilityConPsw.bind(this)
        this.focusNextField = this.focusNextField.bind(this)

    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.loading && nextProps.auth.resetPassword.error) {
            this.setState({finish: false})
            return
        }
    }

    toLogin() {
        this.props.clearReset()
        const RouteTo = this.props.navigator.getCurrentRoutes()[1];
        this.props.navigator.popToRoute(RouteTo)
    }

    togglePasswordVisibilityPsw() {
        this.setState({secureTextEntryPsw: !this.state.secureTextEntryPsw})
    }

    togglePasswordVisibilityConPsw() {
        this.setState({secureTextEntryConPsw: !this.state.secureTextEntryConPsw})
    }

    handleResetPassword() {
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({error: I18n.t('PasswordDontMatch')})
            return
        }
        if(this.state.password.length === 0 || this.state.confirmPassword.length === 0) {
            this.setState({error: this.state.password.length === 0 ? I18n.t('PleaseEnterYourPassword') : I18n.t('PleaseConfirmYourNewPassword')})
            return
        }
        if(this.state.password.length < 6) {
            this.setState({error: I18n.t('PleaseEnterAValidPassword')})
            return
        }
        this.setState({finish: true, error: false})
        this.props.clearAuthError()
        this.props.resetPassword(this.props.payload.tempAccessCode, this.state.password, this.props.payload.method)
    }

    focusNextField(node) {
        try {
            TextInputState.focusTextInput(findNodeHandle(node))
        } catch(e) {
            console.log("Couldn't focus text input: ", e.message)
        }
    }


    render() {
        const showError = this.props.auth.resetPassword.error || this.state.error
        const showTextPsw = this.state.secureTextEntryPsw ? 'show' : 'hide'
        const showTextConPsw = this.state.secureTextEntryConPsw ? 'show' : 'hide'
        const btnText = this.state.password.length !== 0 || this.state.confirmPassword.length !== 0 ? 'FINISH' : 'CONTINUE'
        let passColor = '#3FAC49'
        const resetSuccess = this.props.auth.resetPassword.reset

        switch (this.state.passStrength) {
            case 'weak':
                passColor = '#ED1C24'
                break
            case 'ok':
                passColor = '#CDA806'
                break
            case 'good':
                passColor = '#78C57F'
                break
            case 'strong':
                passColor = '#3FAC49'
                break
        }

        let confromColor = '#3FAC49'
        switch (this.state.conPswStrength) {
            case 'weak':
                confromColor = '#ED1C24'
                break
            case 'ok':
                confromColor = '#CDA806'
                break
            case 'good':
                confromColor = '#78C57F'
                break
            case 'strong':
                confromColor = '#3FAC49'
                break
        }

        return <View style={[styles.outerContainer]}>
        <View style={[styles.innerContainer]}>
            <LoadingModal visible={this.props.auth.loading} request={this.props.auth.request} />
            <View style={[styles.text]}>
                {!showError && !resetSuccess && <MiTransText center>{'NewPassword'}</MiTransText>}
                {!showError && resetSuccess && <Alerts success={'ResetSuccessfully'} />}
                {showError && <Alerts error={showError} />}
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <MiTextInput
                    style={[AppStyles.textInput, AppStyles.textbox, {color: passColor}, this.state.password.length > 0 && styles.shortenInput]}
                    onChangeText={(password) => {
                        let passStrength = 'strong'
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
                    placeholder={I18n.t('NewPassword')}
                    secureTextEntry={this.state.secureTextEntryPsw}
                    error={I18n.t('PleaseEnterYourPassword')}
                    placeholderTextColor='#79797A'
                    selectionColor={AppConfig.secondaryColor}
                    returnKeyType='next'
                    ref='password'
                    blurOnSubmit={false}
                    onSubmitEditing={()=>this.focusNextField(this.refs.confirmPassword)}
                />
                {this.state.password.length > 0 && <MiTransText color={'dark'} style={[styles.passStrength, styles.small, {color: passColor}]}>{this.state.passStrength}</MiTransText>}
                {this.state.password.length > 0 && <View style={[styles.showView]}>
                    <A style={[styles.show]} onPress={this.props.auth.loading ? ()=>{} : this.togglePasswordVisibilityPsw}>
                        <View><MiTransText color={'dark'} style={[styles.small]}>{showTextPsw}</MiTransText></View>
                    </A>
                </View>}
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <MiTextInput
                    style={[AppStyles.textInput, AppStyles.textbox, {color: confromColor}, this.state.confirmPassword.length > 0 && styles.shortenInput]}
                    onChangeText={(confirmPassword) => {
                        let conPswStrength = 'strong'
                        if (confirmPassword.length < 6) {
                            conPswStrength = 'weak'
                        } else if (confirmPassword.length < 10) {
                            conPswStrength = 'ok'
                        } else if (confirmPassword.length < 15) {
                            conPswStrength = 'good'
                        }
                        this.setState({confirmPassword, conPswStrength})
                    }}
                    value={this.state.confirmPassword}
                    placeholder={I18n.t('ConfirmPassword')}
                    secureTextEntry={this.state.secureTextEntryConPsw}
                    error={I18n.t('PleaseConfirmYourNewPassword')}
                    placeholderTextColor='#79797A'
                    selectionColor={AppConfig.secondaryColor}
                    returnKeyType='done'
                    ref='confirmPassword'
                    blurOnSubmit={false}
                    onSubmitEditing={this.handleResetPassword}
                />
                {this.state.confirmPassword.length > 0 && <MiTransText color={'dark'} style={[styles.passStrength, styles.small, {color: confromColor}]}>{this.state.conPswStrength}</MiTransText>}
                {this.state.confirmPassword.length > 0 && <View style={[styles.showView]}>
                    <A style={[styles.show]} onPress={this.props.auth.loading ? ()=>{} : this.togglePasswordVisibilityConPsw}>
                        <View><MiTransText color={'dark'} style={[styles.small]}>{showTextConPsw}</MiTransText></View>
                    </A>
                </View>}
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    text={'BACK'}
                    type={'reverse'}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={this.toLogin} />
                <Button
                    text={btnText}
                    type={''}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={this.handleResetPassword} />
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
    resetPassword,
    clearAuthError,
    clearReset
}

const styles = StyleSheet.create({
    outerContainer: {height: Style.DEVICE_HEIGHT},
    innerContainer: {
        marginLeft: Style.getWidth(37),
        marginRight: Style.getWidth(37),
        marginTop: Style.getHeight(16),
    },
    passStrength: {position: 'absolute',
        top: Style.getHeight(30),
        left: Style.PADDING*2 + Style.getWidth(1),
    },
    text: {
        height: Style.getHeight(54),
        justifyContent: 'center'
    },
    small: { fontSize: 11 },
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
    show: {position: 'absolute',
        top: Style.getHeight(17),
        right: Style.getWidth(19)
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)