/* Setup ==================================================================== */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";

// App Globals
import AppStyles, { Style, underlayColor, backgroundColor } from "../styles";
import util from "../util";
//Components
import Avatar from "../components/avatar";
import Contact from "./Contact";
import Status from "../components/status";
import A from "../components/anchor";
import MiText from "../components/text";
import ActionBar from '../components/actionbar';
import Switch from '../components/switch';
import SystemProfile from '../screens/Settings.Profile';
import BackgroundSettings from '../screens/Settings.Background';
//Redux
import { logout } from '../redux/auth';
import { goToPage } from '../redux/drawer';

const back = require("../assets/images/navbar/back@2x.png");
const edit_ios = require("../assets/images/navbar/edit@2x.png");
const edit_android = require("../assets/images/navbar/edit_android.png");
const hamburger = require('../assets/images/navbar/hamburger.png');
const info = require('../assets/images/info@2x.png');
const logoutIcon = require('../assets/images/navbar/logout@2x.png');
const closeIcon = require('../assets/images/navbar/close@2x.png');

const edit = Platform.OS === 'ios' ? edit_ios : edit_android;

interface props{
  navigator?: any;
  drawer?: any;
}

interface state {
  dataSource?: any;
  showInfo?: any;
  sipPhoneConnected?: boolean;
  receptionMode?: boolean;
  callUsingPrompt?: boolean;
  selectCallNumber?: boolean;
  voicemail?: boolean;
}

interface StateProps {
    user?: any;
}

interface DispatchProps {
  logout?: () => {},
  goToPage?: (number) => {}
}

// Define which part of the state we're passing to this component
const mapStateToProps = (state: any) : StateProps  => ({
  user: state.auth.user,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  logout,
  goToPage
};

export class Settings extends Component<props & StateProps & DispatchProps, state> {
  options: Array<any>;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showInfo: null
    };
  }

  toggleInfo(info: any){
      setTimeout(() => {
        this.setState({showInfo: info});
      }, 500);
  }

  componentWillMount() {
     AsyncStorage.getItem('generalSettings').then((settings) => {
      let generalSettings = settings ? JSON.parse(settings) : null;
      
      this.setState({sipPhoneConnected: generalSettings && generalSettings['sipPhoneConnected'] ? generalSettings['sipPhoneConnected'] : false});
      this.setState({receptionMode: generalSettings && generalSettings['receptionMode'] ? generalSettings['receptionMode'] : false});
      this.setState({callUsingPrompt: generalSettings && generalSettings['callUsingPrompt'] ? generalSettings['callUsingPrompt'] : false});
      this.setState({selectCallNumber: generalSettings && generalSettings['selectCallNumber'] ? generalSettings['selectCallNumber'] : false});
      this.setState({voicemail: generalSettings && generalSettings['voicemail'] ? generalSettings['voicemail'] : false});

      this.options = [
        {index: 5, label: 'System Profile', type: 'arrow', func: () => {this.goToSystemProfile()}, helper: null},
        {index: 6, label: 'Background', type: 'arrow', func: () => {this.goToBackground()}, helper: null},
        {index: 7, label: 'Logout', type: 'logout', func: () => {this.props.logout(); this.props.goToPage(0); }, helper: null}
      ];
      
      this.setState({dataSource: this.state.dataSource.cloneWithRows(this.options)});
   
    });
  }

  updateOption(optionName, optionValue) {
    let settingsJson = {};
    AsyncStorage.getItem('generalSettings', (error, settings) => {
        if(settings){
          settingsJson = JSON.parse(settings); 
        }

        settingsJson[optionName] = optionValue;
        AsyncStorage.setItem('generalSettings', JSON.stringify(settingsJson));
    });
  }

  renderRow(data: any, sectionId: number, rowId: number) {
    return (
      <TouchableHighlight onPress={() => {
          this.pressRow(rowId, data);
        }}>
        <View>
          {data.type === 'arrow' && 
          <View style={[styles.listRow]}>
            <View style={{width: Style.getWidth(328), paddingLeft: Style.getWidth(15)}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                  {data.label}
              </MiText>
            </View>
            <View style={{width: Style.getWidth(32.5)}}>
              <Image resizeMode="contain" style={{width: Style.getWidth(12.5), height: Style.getHeight(20), transform: [{scaleX: -1}] }} source={back} />
            </View>
          </View>
          }

          {data.type === 'logout' && 
          <View style={[styles.listRow]}>
            <View style={{width: Style.getWidth(324), paddingLeft: Style.getWidth(15)}}>
              <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                  {data.label}
              </MiText>
            </View>
            <View style={{width: Style.getWidth(37)}}>
              <Image resizeMode="contain" style={{width: Style.getWidth(17), height: Style.getHeight(20)}} source={logoutIcon} />
            </View>
          </View>
          }

        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionId: number, rowId: number) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  pressRow(rowId: number, rowData: any) {
    rowData.func();
  }
  
  goToBackground() {
    this.props.navigator.push({
      title: 'Background',
      component: BackgroundSettings,
      index: 1
    });
  }

  goToSystemProfile() {
    this.props.navigator.push({
      title: 'System Profile',
      component: SystemProfile,
      index: 1
    });
  }

  goToProfileEditMode() {
    this.props.navigator.push({
      data: this.props.user,
      title: this.props.user.name,
      component: Contact,
      isInEditMode: true,
      index: 1
    });
  }

  renderInfoModal() {
    const topPosition = Style.getHeight(111) + this.state.showInfo.index * (1 + Style.UNIT_Y);                                              

    return(
      <View style={[{position: 'absolute',
                    top: 0,
                    left: 0,
                    width: Style.getWidth(375),
                    height: Style.getHeight(847),
                    backgroundColor: 'rgba(0,0,0,0.5)'}]}>
                    
          <View style={{position: 'absolute',
                        top: topPosition,
                        left: 0,
                        width: Style.getWidth(361),
                        height: Style.getHeight(230)}}
                        >

            <View style={[styles.listItem, {marginBottom: 1}]}>
              <View style={{width: Style.getWidth(252), paddingLeft: Style.getWidth(15)}}>
                <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                    {this.state.showInfo.label}
                </MiText>
              </View>
              <TouchableOpacity onPress={() => {
                this.toggleInfo(null);
                }}>
                <View style={{width: Style.getWidth(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Image resizeMode="contain" style={[{width: Style.getWidth(20), height: Style.getWidth(20)}]} source={closeIcon} />
                </View>
              </TouchableOpacity>
              <View style={{width: Style.getWidth(89), paddingLeft: Style.getWidth(24)}}>
                <Switch
                  value={this.state.showInfo.value}
                  onValueChange={this.state.showInfo.func}
                  disabled={false}
                  backgroundActive={'#00A1E0'}
                  backgroundInactive={'#B3B3B3'}
                  circleActiveColor={'#FFFFFF'}
                  circleInActiveColor={'#FFFFFF'}
                  activeTextStyle={{color: 'white'}}
                  inactiveTextStyle={{color: 'white'}}
                />
              </View>
            </View>

            <View style={{backgroundColor: '#FFFFFF', 
                          paddingTop: Style.getHeight(20.5),
                          paddingLeft: Style.getWidth(17),
                          height: Style.getWidth(175), 
                          width: Style.getWidth(361)}}>
              <MiText color={'#414242'}
                      type={'baseText'}>
                    {'What is \'' + this.state.showInfo.label + '\'?'}
              </MiText>
            </View>  

          </View>
      </View>
    );
  }

  render() {
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0, paddingBottom: 0};
    const profileImage = this.props.user && this.props.user.photoUrl ? {uri: this.props.user.photoUrl} : null;

    return (
    <View style={[styles.container, padding]}>
      {Platform.OS === 'android' &&
      <ActionBar pageLabel={'Settings'} drawer={this.props.drawer} />
      }
      {Platform.OS === 'ios' &&
      <ActionBar pageLabel={'Settings'} drawer={null} marginBottom={Style.getHeight(0.5)}/>
      }

      <ScrollView style={[listPadding]}>
        <View style={[styles.profile]}>

          <View style={[AppStyles.margin, styles.avatarContainer]}>
            <View style={[styles.avatar]}>
              <Avatar
                width={Style.getWidth(71)}
                height={Style.getWidth(71)}
                imageSrc={profileImage}
                name={this.props.user.name}
              />
              <View style={[AppStyles.avatarStatus, styles.status]}>
                <Status color={"yellow"} />
              </View>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start'}}>
            <MiText
              color={'#15325F'}
              type={'h2'}
              weight={'base'}
              style={{flex: 1}}>
              {this.props.user.name}
            </MiText>
            <MiText type={'baseText'} weight={'light'} color={"#00A1E0"} style={{flex: 1}}>
              {util.formatPhoneNumber(this.props.user.mobile)}
            </MiText>
          </View>

          <A onPress={() => { this.goToProfileEditMode() }} style={[{width: Style.getWidth(20), height: Style.getWidth(20), marginRight: Style.getWidth(17)}]}>
            <Image resizeMode="contain" style={{width: Style.getWidth(20), height: Style.getWidth(20)}} source={edit} />
          </A>
        </View>

        <View style={[styles.listItem, {backgroundColor: '#FFFFFF'}]}>
          <View style={{width: Style.getWidth(237), marginLeft: Style.getWidth(15)}}>
            <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                {this.state.sipPhoneConnected ? 'SIP Phone: Connected' : 'SIP Phone: Disconnected'}
            </MiText>
          </View>

          <View style={[{width: Style.getWidth(20), height: Style.getWidth(20)}]}></View>

          <View style={{width: Style.getWidth(89), paddingLeft:  Style.getWidth(24)}}>
            <Switch
              value={this.state.sipPhoneConnected}
              onValueChange={(value) => {
                    this.setState({sipPhoneConnected: value});
                    this.updateOption('sipPhoneConnected', value);
              }}
              disabled={false}
              backgroundActive={'#00A1E0'}
              backgroundInactive={'#B3B3B3'}
              circleActiveColor={'#FFFFFF'}
              circleInActiveColor={'#FFFFFF'}
              activeTextStyle={{color: 'white'}}
		          inactiveTextStyle={{color: 'white'}}
            />
          </View>
        </View>

        <View style={[styles.listItem]}>
          <View style={{width: Style.getWidth(237), marginLeft: Style.getWidth(15)}}>
            <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                {'Reception Mode'}
            </MiText>
          </View>

          <TouchableOpacity style={{width: Style.getWidth(20)}} 
            onPress={() => {
            this.toggleInfo({index: 1, label: 'Reception Mode', type: 'switch',
                            value: this.state.receptionMode, 
                            func: (value) => {
                                  this.setState({receptionMode: value});
                                  this.updateOption('receptionMode', value);
                            }, helper: ''});
            }}>
            <View style={{width: Style.getWidth(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Image resizeMode="contain" style={{width: Style.getWidth(20), height: Style.getWidth(20)}} source={info} />
            </View>
          </TouchableOpacity>

          <View style={{width: Style.getWidth(89), paddingLeft:  Style.getWidth(24)}}>
            <Switch
              value={this.state.receptionMode}
              onValueChange={(value) => {
                                  this.setState({receptionMode: value});
                                  this.updateOption('receptionMode', value);
                            }}
              disabled={false}
              backgroundActive={'#00A1E0'}
              backgroundInactive={'#B3B3B3'}
              circleActiveColor={'#FFFFFF'}
              circleInActiveColor={'#FFFFFF'}
              activeTextStyle={{color: 'white'}}
		          inactiveTextStyle={{color: 'white'}}
            />
          </View>    
        </View>

        <View style={[styles.listItem]}>
          <View style={{width: Style.getWidth(237), marginLeft: Style.getWidth(15)}}>
            <MiText color={'#404141'}
                    type={'baseText'}
                    weight={'light'}>
              {'Call Using Prompt'}
            </MiText>
          </View>

          <TouchableOpacity style={{width: Style.getWidth(20)}} 
            onPress={() => {
            this.toggleInfo({index: 2, label: 'Call Using Prompt', type: 'switch', 
                            value: this.state.callUsingPrompt, 
                            func: (value) => {
                                  this.setState({callUsingPrompt: value});
                                  this.updateOption('callUsingPrompt', value);
                            }, helper: ''});
            }}>
            <View style={{width: Style.getWidth(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Image resizeMode="contain" style={{width: Style.getWidth(20), height: Style.getWidth(20)}} source={info} />
            </View>
          </TouchableOpacity>

          <View style={{width: Style.getWidth(89), paddingLeft:  Style.getWidth(24)}}>
            <Switch
              value={this.state.callUsingPrompt}
              onValueChange={(value) => {
                                  this.setState({callUsingPrompt: value});
                                  this.updateOption('callUsingPrompt', value);
                            }}
              disabled={false}
              backgroundActive={'#00A1E0'}
              backgroundInactive={'#B3B3B3'}
              circleActiveColor={'#FFFFFF'}
              circleInActiveColor={'#FFFFFF'}
              activeTextStyle={{color: 'white'}}
		          inactiveTextStyle={{color: 'white'}}
            />
          </View> 
        </View>

        <View style={[styles.listItem]}>
          <View style={{width: Style.getWidth(237), marginLeft: Style.getWidth(15)}}>
            <MiText color={'#404141'}
                    type={'baseText'}
                    weight={'light'}>
              {'Select \'Call to\' Number'}
            </MiText>
          </View>

          <TouchableOpacity style={{width: Style.getWidth(20)}}
            onPress={() => {
              this.toggleInfo({index: 3, label: 'Select \'Call to\' Number', type: 'switch', 
                value: this.state.selectCallNumber, 
                func: (value) => {
                      this.setState({selectCallNumber: value});
                      this.updateOption('selectCallNumber', value);
                }, helper: ''});
              }}>
            <View style={{width: Style.getWidth(20), flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Image resizeMode="contain" style={{width: Style.getWidth(20), height: Style.getWidth(20)}} source={info} />
            </View>
          </TouchableOpacity>

          <View style={{width: Style.getWidth(89), paddingLeft:  Style.getWidth(24)}}>
            <Switch
              value={this.state.selectCallNumber}
              onValueChange={(value) => {
                                  this.setState({selectCallNumber: value});
                                  this.updateOption('selectCallNumber', value);
                            }}
              disabled={false}
              backgroundActive={'#00A1E0'}
              backgroundInactive={'#B3B3B3'}
              circleActiveColor={'#FFFFFF'}
              circleInActiveColor={'#FFFFFF'}
              activeTextStyle={{color: 'white'}}
		          inactiveTextStyle={{color: 'white'}}
            />
          </View>   
        </View>

        <View style={[styles.listItem]}>
          <View style={{width: Style.getWidth(237), marginLeft: Style.getWidth(15)}}>
            <MiText color={'#404141'}
                  type={'baseText'}
                  weight={'light'}>
                {'Voicemail'}
            </MiText>
          </View>

          <View style={[{width: Style.getWidth(20), height: Style.getWidth(20)}]}></View>

          <View style={{width: Style.getWidth(89), paddingLeft:  Style.getWidth(24)}}>
            <Switch
              value={this.state.voicemail}
              onValueChange={(value) => {
                                  this.setState({voicemail: value});
                                  this.updateOption('voicemail', value);
                            }}
              disabled={false}
              backgroundActive={'#00A1E0'}
              backgroundInactive={'#B3B3B3'}
              circleActiveColor={'#FFFFFF'}
              circleInActiveColor={'#FFFFFF'}
              activeTextStyle={{color: 'white'}}
		          inactiveTextStyle={{color: 'white'}}
            />
          </View>          
        </View>

        <ListView
          style={[styles.listView]}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator}
        />

        {this.state.showInfo && this.renderInfoModal()}

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
    marginBottom: Style.getWidth(0.5),
  },
  profile: {
    height: Style.getHeight(110.5),
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: backgroundColor,
    marginBottom: Style.getWidth(0.5)
  },
  avatarContainer: {
    marginLeft: Style.getWidth(20),
    marginRight: Style.getWidth(20),
    width: Style.getWidth(71)
  },
  avatar: {
    width: Style.getWidth(71),
    height: Style.getWidth(71)
  },
  status: {
    borderStyle: "solid",
    borderColor: "white",
    borderTopWidth: 1,
    borderLeftWidth: 1
  },
  listView: {
    backgroundColor: backgroundColor
  },
  listItem: {
    backgroundColor: '#FEFEFE',
    flexDirection: "row",
    height: Style.UNIT_Y,
    width: Style.getWidth(361),
    alignItems: 'center',
    borderBottomWidth: Platform.OS === 'ios' ? Style.getHeight(0.5) : Style.getWidth(0.5), 
    borderBottomColor: 'rgba(151,151,151,0.31)'
  },
  listRow: {
    backgroundColor: '#FEFEFE',
    flexDirection: "row",
    height: Style.UNIT_Y,
    width: Style.getWidth(361),
    alignItems: 'center',
  },
  separator: {
    height: Platform.OS === 'ios' ? Style.getHeight(0.5) : Style.getWidth(0.5),
    width: Style.getWidth(361),
    backgroundColor: 'rgba(151,151,151,0.31)',
  },
  hamburger: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: Style.PADDING,
    flex: 2
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
 