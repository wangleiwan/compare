/* Setup ==================================================================== */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import { connect } from "react-redux";
import LinearGradient from './../components/LinearGradient';

// App Globals
import AppStyles, { Style, underlayColor, backgroundColor } from "../styles";

import A from "../components/anchor";
import MiText from "../components/text";
import MiTransText from "../components/MiTransText";
import Switch from '../components/switch';

const back = require("../assets/images/navbar/back@2x.png");
const checkmark = require("../assets/images/checkmark@2x.png");

export class BackgroundSettings extends Component<any, any> {
  options: Array<any>;

  constructor(props) {
    super(props);
    this.state = {
      appBackgroundColor: {startColor: '#103A5F', endColor: '#A4C0CE'}
    };
  }

  componentWillMount() {
    this.options = [
      {startColor: '#103A5F', endColor: '#A4C0CE'},
      {startColor: '#3D4A60', endColor: '#E8E8E8'},
      {startColor: '#6E0F12', endColor: '#DB262D'},
      {startColor: '#3023AE', endColor: '#C96DD8'},
      {startColor: '#007AEF', endColor: '#6DD895'},
      {startColor: '#E7EAEF', endColor: '#E7EAEF'}
    ];

    AsyncStorage.getItem('appBackgroundColor').then((value) => {
      if(value)
        this.setState({appBackgroundColor: JSON.parse(value)});
    });
  }

  changeBackground(colors, index){
    this.setState({appBackgroundColor: colors});
    AsyncStorage.setItem('appBackgroundColor', JSON.stringify(colors));
  }

  renderRow(data, rowId) {
    return (
      <TouchableOpacity key={rowId} onPress={()=>{
        this.changeBackground(data, rowId);
        }}>
        <LinearGradient
            colors={[ data.startColor, data.endColor]}
            start={{x: 0.0, y: 0.5}} 
            end={{x: 1.0, y: 0.5}}
            locations={[0, 1]}
            style={{width: Style.getWidth(361), height: Style.UNIT_Y}}>

            {data.startColor === this.state.appBackgroundColor.startColor 
            && data.endColor === this.state.appBackgroundColor.endColor 
            && <View style={{width: Style.getWidth(361), height: Style.UNIT_Y, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', width: Style.getWidth(35), height: Style.getWidth(35), borderRadius: Style.getWidth(17.5)}}>
                <Image resizeMode="contain" style={AppStyles.icon} source={checkmark} />
              </View>
            </View>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  
  render() {
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return (
      <View style={[styles.container, padding]}>
        <View style={[AppStyles.row, styles.buttonRow]}>
          <View style={[{flex: 1}]}>
            <A onPress={this.props.navigator.pop} style={[AppStyles.cornerCard]}>
              <Image resizeMode="contain" style={AppStyles.icon} source={back} />
            </A>
          </View>
          <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
            <MiTransText color={'dark'}>{'Background'}</MiTransText>
          </View>
          <View style={[{flex: 1}]}></View>
        </View>

        <ScrollView style={[listPadding]}>
        { this.options.map((data, i) => {
          return (<View key={'r'+i}>
            {this.renderRow(data,i)}
            </View>);
        })}
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    height: Style.UNIT_Y,
    backgroundColor: backgroundColor,
    alignItems: "center",
    marginBottom: Style.PADDING
  }
});

// Define which part of the state we're passing to this component
const mapStateToProps = state => ({
  
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSettings);
 