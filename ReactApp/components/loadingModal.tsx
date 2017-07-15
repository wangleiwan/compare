import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Modal
} from 'react-native'

import LoadingCircle from './loadingCircle'
import MiTransText from './MiTransText'

interface props {
    visible: boolean,
    request: string,
    onRequestClose?: any
}

interface state {

}

export default class LoadingModal extends Component<props, state> {
    constructor(props) {
        super(props)
    }

    render() {
        return <Modal
            animationType={"fade"}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={this.props.onRequestClose ? this.props.onRequestClose : ()=>{}}
        >
            <View style={[styles.loading]}>
                <LoadingCircle />
                <View style={[styles.request]}>
                    <MiTransText color={'#FFF'}>{this.props.request}</MiTransText>
                </View>
            </View>
        </Modal>
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(21, 50, 95, .5)'
    },
    request: {
        marginTop: 30
    }
})