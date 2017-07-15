/**
 * Button
 *
    <Button
      text={text}
      type={'outlined'}
      size={'medium'}
      disabled={false}
      onPress={()=>{alert('Go To Entry View')}} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
"use strict";

/* Setup ==================================================================== */
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

// App Globals
import AppStyles, { Style, underlayColor } from "../styles";
import AppConfig from "../config";

// Components
import MiText from "./text";
import MiTransText from "./MiTransText";

interface props {
  text?: string;
  type?: string;
  onPress?: () => any;
  size?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  halfWidth?: boolean;
  icon?: number;
  iconSize?: number;
  buttonStyle?: object;
  textStyle?: object;
}

interface state {}

/* Component ==================================================================== */
class Button extends Component<props, state> {

  static defaultProps = {
    onPress: () => {}, // Do nothing
    type: "",
    text: "Click Here",
    size: "medium",
    disabled: false,
    fullWidth: false,
    halfWidth: false,
    icon: null,
    iconSize: null,
    buttonStyle: {},
    textStyle: {}
  };

  renderIcon(icon: number, iconSize: number, isEnabled?: boolean) {
    return icon
      ? <Image
          resizeMode="contain"
          style={{ height: Style.getHeight(iconSize), opacity: !isEnabled ? 1 : 0.25 }}
          source={icon}
        />
      : null;
  }

  /**
    * RENDER
    */
  render() {
    let {
      text,
      type,
      onPress,
      size,
      disabled,
      fullWidth,
      icon,
      iconSize,
      halfWidth,
    } = this.props;

    const justifyContent = icon ? 'flex-start' : 'center';

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
        style={[
          styles.button,
          type === "faded" && styles.buttonFaded,
          type === "outlined" && styles.buttonOutline,
          type === "reverse" && styles.buttonReverse,
          type === "custom" && this.props.buttonStyle,
          size === "small" && styles.buttonSml,
          size === "large" && styles.buttonLrg,
          fullWidth && styles.fullWidth,
          halfWidth && styles.halfWidth
        ]}
      >
        <View
          style={[
            AppStyles.row,
            { justifyContent: justifyContent, alignItems: "center" },
            disabled && styles.disabled
          ]}
        >
          {this.renderIcon(icon, iconSize, disabled)}
          <MiTransText
            center
            style={[
              type === "faded" && styles.buttonFaded_text,
              type === "outlined" && styles.buttonOutline_text,
              type === "reverse" && styles.buttonReverse_text,
              size === "small" && styles.buttonSml_text,
              size === "large" && styles.buttonLrg_text,
              type === "custom" && this.props.textStyle
            ]}
          >
            {text}
          </MiTransText>
        </View>
      </TouchableOpacity>
    );
  }
}

/* Styles ===================================================================== */
const styles = StyleSheet.create({
  // Standard
  button: {
    backgroundColor: AppConfig.secondaryColor,
    height: Style.UNIT_Y,
    justifyContent: "center",
    marginBottom: 10,
    paddingHorizontal: 10
  },

  // Reverse
  buttonReverse: {
    backgroundColor: '#F5F5F6'
  },
  buttonReverse_text: {
    color: AppConfig.primaryColor
  },

  //fade
  buttonFaded: {
    marginBottom: 0,
    backgroundColor: "rgba(255,255,255,.2)",
    width: Style.getWidth(300)
  },
  buttonFaded_text: {
    color: AppConfig.accentColor
  },

  // Outlined
  buttonOutline: {
    backgroundColor: AppConfig.accentColor,
    borderWidth: 1,
    borderColor: AppConfig.primaryColor
  },
  buttonOutline_text: {
    color: AppConfig.primaryColor
  },

  // Large
  buttonLrg: {
    height: Style.UNIT_Y,
    width: Style.getWidth(150)
  },
  buttonLrg_text: {},

  // Small
  buttonSml: {
    height: Style.getHeight(35)
  },
  buttonSml_text: {},

  fullWidth: {
    width: Style.getWidth(355)
  },

  halfWidth: {
    width: Style.getWidth(177)
  },

  // Disabled
  disabled: {
    opacity: 0.25
  }
});

/* Export Component ==================================================================== */
export default Button;
