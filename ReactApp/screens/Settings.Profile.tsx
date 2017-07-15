/* Setup ==================================================================== */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import { connect } from "react-redux";

// App Globals
import AppStyles, { Style, underlayColor, backgroundColor } from "../styles";

import A from "../components/anchor";
import MiText from "../components/text";
import MiTransText from "../components/MiTransText";

const back = require("../assets/images/navbar/back@2x.png");

export class SystemProfile extends Component<any, any> {
  profileInfo?: Array<any>;
  authSDKVersion?: string;

  constructor(props) {
    super(props);

    this.profileInfo = [
      { label: 'server', value: 'server.example.io'},
      { label: 'userDomain', value: this.props.user.sipAddress},
      { label: 'proxy', value: ''},
      { label: 'protocol', value: 'udp'}
    ];
  }

  componentWillMount() {
    const authPckg = require('../../node_modules/@mitel/cloudlink-authentication/package.json');
    this.authSDKVersion = authPckg && authPckg.version ? authPckg.version : '';

  }

  render() {
    const appVersion = '0.1';
    const sipVersion = '0.1';

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
            <MiTransText color={'dark'}>{'System Profile'}</MiTransText>
          </View>
          <View style={[{flex: 1}]}></View>
        </View>

      <ScrollView style={[listPadding]}>
        <View style={[styles.section, {height: Style.getHeight(110), paddingTop: Style.getHeight(15)}]}>
          <View style={[styles.listItem]}>
            <View style={{flex: 1, marginBottom: Style.getHeight(15)}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'base'}>{'Version Details'}
              </MiText>
            </View>
          </View>

          <View style={[styles.listItem]}>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'Application'}
              </MiText>
            </View>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'v'+appVersion}
              </MiText>
            </View>
          </View>

          <View style={[styles.listItem]}>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'SIP phone'}
              </MiText>
            </View>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'v'+sipVersion}
              </MiText>
            </View>
          </View>

          <View style={[styles.listItem]}>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'Authentication SDK'}
              </MiText>
            </View>
            <View style={{flex: 1}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>{'v'+this.authSDKVersion}
              </MiText>
            </View>
          </View>

        </View>

        <View style={[styles.section, {height: Style.getHeight(199), paddingTop: Style.getHeight(15)}]}>
          <View style={[styles.listItem]}>
            <View style={{flex: 1, marginBottom: Style.getHeight(15)}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'base'}>{'SIP Phone Profile'}
              </MiText>
            </View>
          </View>

          {this.profileInfo.map((item) => {
            return (
              <View style={[styles.listItem]} key={item.label}>
                <View style={{flex: 1}}>
                  <MiText color={'#404141'}
                      type={'baseText'}
                      weight={'light'}>{item.label}
                  </MiText>
                </View>
                <View style={{flex: 1}}>
                  <MiText color={'#404141'}
                      type={'baseText'}
                      weight={'light'}>{item.value}
                  </MiText>
                </View>
              </View>
            );
          })}
        </View>
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
  },
  listView: {
    backgroundColor: backgroundColor
  },
  separator: {
    height: 1,
    backgroundColor: '#979797',
    opacity: 31
  },
  listItem: {
    flexDirection: "row",
    marginLeft: Dimensions.get('window').width * 4/100,
    alignItems: 'center',
  },
  section: {
    backgroundColor: backgroundColor,
    marginBottom: 1,
  }
});

// Define which part of the state we're passing to this component
const mapStateToProps = state => ({
  user: state.auth.user
});

// Define the actions this component may dispatch
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SystemProfile);

