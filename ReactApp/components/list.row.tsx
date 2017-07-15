/**
 * List Row
 */
"use strict";

import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";

// App Globals
import AppStyles, { Style, underlayColor } from "../styles";
import AppConfig from "../config";
import AppUtil from "../util";

import Status from "./status";
import Avatar from "./avatar";
import A from "./anchor";
import MiText from "./text";
import MiTransText from "./MiTransText";

interface props {
  color?: string,
  disabled?: boolean,
  size?: number,
  avatarSize?: number,
  onClick?: () => any,
  imageSrc?: object,
  leftText?: string,
  leftSubText?: string,
  rightText?: string,
  rightSubText?: string,
  rightIcon?: any,
  leftTextFontSize?: number,
  rightTextFontSize?: number,
  subtextFontSize?: number,
}

interface state {}

export default class ListRow extends Component<props, state> {

  renderLeftSubText(fontSize: number, leftSubText?: string) {
    return leftSubText ? (
      <MiTransText
        color={"#404141"}
        type={'baseText'}
        weight={'light'}
        style={[styles.itemText, { fontSize: fontSize }]}
      >
        {leftSubText}
      </MiTransText>
    ) : null
  }

    renderRightSubText(fontSize: number, rightSubText?: string) {
    return rightSubText ? (
      <MiTransText
        color={'#404141'}
        type={'baseText'}
        weight={'light'}
        style={[styles.itemText, { fontSize: fontSize }]}
      >
        {rightSubText}
      </MiTransText>
    ) : null
  }

  render() {
    const color = this.props.color ? this.props.color : "#404141";
    const opacity = this.props.disabled ? 0.5 : 1;
    const onPress = () => {
      if (this.props.disabled) {
        return;
      }

      this.props.onClick();
    };

    // make exact proportions as UI design
    const size = this.props.size ? this.props.size : Style.UNIT_Y;
    const avatarSize = this.props.avatarSize ? this.props.avatarSize : Math.round(size * (80 / 108));
    const fontSize = Math.round(size * (30 / 108));
    const subtextFontSize = this.props.subtextFontSize ? this.props.subtextFontSize : Math.round(fontSize * ( 22 / 30));
    const {
      imageSrc,
      leftText,
      leftSubText,
      rightSubText,
      rightText,
      rightIcon,
      leftTextFontSize,
      rightTextFontSize
    } = this.props;

    return (
      <A
        onPress={onPress}
        style={[styles.listItemOuter, { opacity: opacity, height: size }]}
      >
        <View style={[styles.listItemInner, { height: size }]}>

          <View style={[AppStyles.margin, {marginTop: 0, marginBottom: 0}]}>
            <Avatar
              width={avatarSize}
              height={avatarSize}
              imageSrc={imageSrc}
              name={leftText}
            />
          </View>

          <View style={[styles.listItemIconView, { height: size }]}>
            <Status size={Style.getWidth(7)} color={'green'} />
          </View>

          <View style={[styles.listItemTextView, { height: size }]}>
            <MiText
              color={color}
              type={'baseText'}
              weight={'light'}
              style={[styles.itemText, {lineHeight: Style.getHeight(19), fontSize: leftTextFontSize ? leftTextFontSize : fontSize}]}
            >
              {leftText}
            </MiText>
              {this.renderLeftSubText(subtextFontSize , leftSubText)}
          </View>

          <View style={[styles.listItemTextView, { height: size, alignItems: 'flex-end' }]}>
              <MiTransText
                color={color}
                type={'baseText'}
                weight={'light'}
                style={[styles.itemText, { lineHeight: Style.getHeight(18), fontSize: rightTextFontSize ? rightTextFontSize : fontSize}]}
              >
                {rightText}
              </MiTransText>
              {this.renderRightSubText(subtextFontSize, rightSubText)}
          </View>

          <View style={[styles.listItemIconView, { height: size, marginLeft: 15, marginRight: 15}]}>
            {rightIcon}
          </View>
        </View>
      </A>
    );
  }
}

const styles = StyleSheet.create({
  listItemOuter: {
    borderBottomWidth: Style.getWidth(0.5),
    borderColor: "rgba(151,151,151,0.31)",
    backgroundColor: "#FEFEFE",
    flexDirection: "row"
  },

  listItemInner: {
    flexDirection: "row",
    alignItems: 'center',
    flex: 1
  },

  listItemTextView: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1
  },

  listItemIconView: {
    justifyContent: "center",
    alignItems: "flex-start"
  },

  itemText: {
    marginLeft: Style.getWidth(7),
  }
});
