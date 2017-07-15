"use strict";

import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

// App Globals
import AppStyles, { Style, underlayColor } from "../styles";
import AppUtil from "../util";

// Components
import A from "../components/anchor";

const remove = require("../assets/images/navbar/delete@2x.png");

interface props {
  onPress?: () => any,
  size?: number,
  style?: object
}

interface state {}

export default class Remove extends Component<props, state> {
  constructor(props) {
    super(props);
  }

  render() {
    const size: number = this.props.size ? this.props.size : Style.getWidth(15);
    const onPress: any = this.props.onPress ? this.props.onPress : () => {};

    return (
      <A style={{ zIndex: 1 }} onPress={onPress}>
        <View
          style={[
            styles.container,
            { width: size, height: size, backgroundColor: "#FEFEFE" },
            this.props.style
          ]}
        >
          <Image
            resizeMode="contain"
            style={{ height: Style.getHeight(size) }}
            source={remove}
          />
        </View>
      </A>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  }
});
