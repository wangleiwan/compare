'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

// App Globals
import AppConfig from '../config'
import AppStyles, {Style,underlayColor} from '../styles'

// components
import Button from '../components/button'
import MiTransText from '../components/MiTransText'
import ViaPhone from './Auth.ViaPhone'
import ViaEmail from './Auth.ViaEmail'


export default class ResetMethod extends Component {
    constructor(props) {
        super(props)
        
        this.viaPhone = this.viaPhone.bind(this);
        this.viaEmail = this.viaEmail.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    viaPhone() {
        this.props.navigator.push({
            title: '',
            component: ViaPhone,
            index: 3
        })
    }

    viaEmail() {
        this.props.navigator.push({
            title: '',
            component: ViaEmail,
            index: 3
        })
    }

    cancel() {
        this.props.navigator.pop()
    }


    render() {
        return <View style={[styles.outerContainer]}>
        <View style={[styles.innerContainer]}>
            <View style={[styles.text]}>
                <MiTransText center>{'ChooseMethod'}</MiTransText>
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    type={'custom'}
                    text={'via Email'}
                    size={''}
                    buttonStyle={[styles.customButton]}
                    textStyle={[styles.customText]}
                    onPress={()=>this.viaEmail()} />
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    type={'custom'}
                    text={'via Phone'}
                    size={''}
                    buttonStyle={[styles.customButton]}
                    textStyle={[styles.customText]}
                    onPress={()=>this.viaPhone()} />
            </View>
            <View style={[{flexDirection: 'row'}]}>
                <Button
                    type={'custom'}
                    text={'CANCEL'}
                    size={''}
                    buttonStyle={[styles.cancelButton]}
                    textStyle={[styles.customText]}
                    onPress={()=>this.cancel()} />
            </View>
        </View>
    </View>
    }
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
    customButton: {
        backgroundColor: AppConfig.textColor,
        marginBottom: 1,
        width: Style.getWidth(300)
    },
    cancelButton: {
        backgroundColor: '#F5F5F6',
        marginBottom: 0,
        width: Style.getWidth(300)
    },
    customText: {
        color: AppConfig.primaryColor
    },
})