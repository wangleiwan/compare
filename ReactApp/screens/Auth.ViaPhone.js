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
import MiTextInputMask from '../components/MiTextInputMask'

// screens
import ResetPassword from './Auth.ResetPassword'

import { forgotPassword, clearAuthError, clearReset } from '../redux/auth'

export class ViaPhone extends Component {
    constructor(props) {
        super(props)
        this.state ={
            finish: false,
            mobile: ''
        }
        
         this.toMobile = this.toMobile.bind(this)
         this.toResetMethod = this.toResetMethod.bind(this)
    }

    toResetMethod() {
        this.props.clearAuthError()
        this.props.navigator.pop()
    }

    toMobile() {
        const mobileNumber = "+1" + this.state.mobile.toString().replace('(', '').replace(')','').replace(/\s/g, '')
        const mobileLength = mobileNumber.length
        if(mobileLength !== 12 && mobileLength !== 13) {
            this.setState({error: I18n.t('PleaseEnterACorrectMobileNumber')})
        } else {
            this.setState({finish: true})
            this.props.forgotPassword(mobileNumber, 'mobile')
        }
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
                <A style={[styles.countryCode]} onPress={()=>{}}>
                    <View><MiText center color={'light'}>{'CA + 1'}</MiText></View>
                </A>
                <MiTextInputMask
                    onChangeText={(mobile)=>this.setState({mobile})}
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
                    onSubmitEditing={() => this.toMobile()} />
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    text={'BACK'}
                    type={'reverse'}
                    size={'large'}
                    disabled={this.props.auth.loading}
                    onPress={()=>this.toResetMethod()} />
                <Button
                    text={'CONTINUE'}
                    type={''}
                    size={'large'}
                    disabled={this.props.auth.loading || this.state.mobile.length === 0}
                    onPress={()=>this.toMobile()} />
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
    text: {
        height: Style.getHeight(54),
        justifyContent: 'center'
    },
    countryCode: {
        position: 'absolute',
        top: Style.getHeight(18),
        left: Style.PADDING*2,
        zIndex: 100
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(ViaPhone)