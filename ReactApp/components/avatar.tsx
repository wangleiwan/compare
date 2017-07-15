/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles'
import AppUtil from '../util'
import AppConfig from '../config'

// Components
import MiText from '../components/text';

const add = require("../assets/images/navbar/add@2x.png");

interface props {
    name: string,
    width: number,
    height: number,
    imageSrc?: object,
    isNewContact?: boolean,
    isSameUser?: any,
    isSameDay?: any,
    nextMessage?: any,
    currentMessage?: any,
    previousMessage?: any,
    renderBubble?: any,
    user?: any,
    position?: any,
}

interface state {
    color: string,
    initials: string
}

export default class Avatar extends Component<props, state> {

    constructor(props){
        super(props);

        const length = props.name ? props.name.length : 0;

        this.state = {
            color: this.getColors()[length % 6],
            initials: this.getInitials(props.name)
        };

        this.renderImage = this.renderImage.bind(this);
    }

    getColors(): string[] {
        let colors = [
            "#FFA062",
            "#71D4FB",
            "#8BBFFF",
            "#AD78CE",
            "#9DBCCA",
            "#A1ADBF"
        ]

        return colors;
    }


    // Gets a one or two character initial(s) given a name, email, or phone number
    getInitials(name: string): string {
        if (!name) return '';
        var separators = ['-', '_', ' ', '.'];

        // Convert "John.Smith <jsmith@mitel.com>" to "John Smith"
        if (name.indexOf(' <') > -1 && name.indexOf('>') === (name.length - 1)) {
            name = name.split(' <')[0];
        }

        // Strip out end of email address
        if (name.indexOf('@') > -1) {
            name = name.split('@')[0];
        }

        for (var i = 0; i < separators.length; i++) {
            if (name.indexOf(separators[i]) > -1) {
                var arr = name.split(separators[i]);
                /*if (arr.length === 1) {
                    return arr[0].substr(0, 1).toUpperCase();
                }
                else {*/
                    return arr[0].substr(0, 1).toUpperCase()
                        + arr[arr.length - 1].substr(0, 1).toUpperCase();
                //}
            }
        }
        return name.substr(0, 1).toUpperCase();
    };

    renderImage(image: object, initials: string, isNewContact?: boolean) {
        if (isNewContact) {
            return <Image style={[{width: 15, height: 15, backgroundColor: AppConfig.inactiveColor }]} source={add} />
        } else if (image) {
            return <Image style={[{width: this.props.width, height: this.props.height}]} source={image} />
        }

        // exact proportions from design assets
        const fontSize: number = this.props.width > 60 ? Math.abs(this.props.width * (28/142)) : Math.abs(this.props.width * (20/80));;

        return <MiText style={[{fontSize: fontSize}]}>{initials}</MiText>
    }

  render(){
    const width: number = this.props.width ? this.props.width : Style.UNIT_X;
    const height: number = this.props.height ? this.props.height : Style.UNIT_Y;
    const { isNewContact } = this.props;

    return (
        <View style={[styles.outer, {width: width, height: height, backgroundColor: isNewContact ? AppConfig.inactiveColor : this.state.color}]}>
            {this.renderImage(this.props.imageSrc, this.state.initials, isNewContact)}
        </View>
    );
  }


}

const styles = StyleSheet.create({
    outer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    itemText: {
        fontSize: 10,
    },

});

