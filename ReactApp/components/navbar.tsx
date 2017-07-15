import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
//import PropTypes from 'prop-types';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, connect } from 'react-redux';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
var {height, width} = Dimensions.get('window');

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';
import AppConfig from '../config';

// Components
import A from './anchor';
import Status from './status';
import Notification from './notifications.icon';
import MiText from './text';
import MiTransText from './MiTransText';
import Avatar from "../components/avatar";
import Badge from "../components/badge";

// Redux
import { toggle, save, toggleContact } from '../redux/favorites';
import { logout } from '../redux/auth';

const home = require('../assets/images/navbar/home.png');
const chat = require('../assets/images/navbar/chat@2x.png');
const contacts = require('../assets/images/navbar/contacts@2x.png');
const callhistory = require('../assets/images/navbar/callhistory@2x.png');
const search = require('../assets/images/navbar/search@2x.png');
const edit = require("../assets/images/navbar/edit@2x.png");
const settings = require('../assets/images/navbar/settings@2x.png');

const bkgColor = 'rgba(255,255,255,0.9)';
const appBkgColor = AppConfig.primaryColor;


interface StateProps {
    favorites?: any;
    user?: any;
}

interface DispatchProps {
    toggle?: () => {};
    toggleContact?: () => {};
    save?: (any) => {};
    logout?: () => {};
}

const mapStateToProps = (state: any) : StateProps => ({
  favorites: state.favorites,
  user: state.auth.user
});

const mapDispatchToProps = {
    toggle,
    toggleContact,
    save,
    logout
};

interface props {
  activeTab?: number;
  style?: any;
  tabs?: Array<any>;
  goToPage?: (number) => {};
}

interface state {
  tabs?: any;
  currentTab?: number;
  currentPage?: any;
  previousPage?: any;
  moveDistance?: number;
  statusInApp?: number;
  refresh?: boolean;
}

export class TabBar extends Component<props & StateProps & DispatchProps, state> {
  tabIcons: Array<any> = [];
  animatedValue: Animated.Value;

  constructor(props) {
    super(props);

    this.state = {
        tabs: {
            'home':         { icon: home, overlay: false, width: width * 6.66 / 100, height: width * 5.86 / 100, marginTop: width * 4.4 / 100},
            'chat':         { icon: chat, overlay: true, width: width * 5.33 / 100, height: width * 4.8 / 100, marginTop: width * 5.06 / 100},
            'contacts':     { icon: contacts, overlay: false, width: width * 6 / 100, height: width * 5.06/ 100, marginTop: width * 4.66 / 100},
            'callhistory':  { icon: callhistory, overlay: true, width: width * 6.53 / 100, height: width * 6 / 100, marginTop: width * 4.53 / 100},
            'search':       { icon: search, overlay: true, width: width * 5.06 / 100, height: width * 5.86 / 100, marginTop: width * 4.13 / 100},
        },
        currentTab: 0,
        currentPage: this.props.activeTab,
        previousPage: 0,
        moveDistance: 0,
        statusInApp: 0,
        refresh: false
    }

    this.setAnimationValue = this.setAnimationValue.bind(this);
    this.animatedValue = new Animated.Value(0);
  }

  move(i){
    this.setState({moveDistance: (this.state.previousPage - i) * Style.getWidth(72.2)});
    this.setState({currentTab: i});

    this.animatedValue.setValue(0);

    Animated.timing(
        this.animatedValue,
        {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }
    ).start( () => {} );
  }

  setAnimationValue({ value, }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i))
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress: number) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  renderIcon(tab: any, i: any) {
    return <View style={{marginTop: this.state.tabs[tab.icon].marginTop}}><Image resizeMode='contain' style={{width: this.state.tabs[tab.icon].width, height: this.state.tabs[tab.icon].height}} source={this.state.tabs[tab.icon].icon} /></View>;
  }

  renderNotification(tab: any) {
    /*if(tab.icon === 'callhistory'){
        let content = '63';
        return <Badge content={content} style={{position: 'absolute', top: -1 * width * 2.6 / 100, left: width * 6 / 100, zIndex: 99}}/>;
    }*/
      
    return null;
  }

  changeStatus(status: any){
    this.setState({
      statusInApp: status
    });
  }

  redrawNavbar() {
    let st = this.state.refresh;                  
    this.setState({refresh: !st});
  }

  renderMenu(){
    const availabilityBarWidth = Style.getWidth(230.25);
    const editBarWidth = -Style.getWidth(290.5);
    const profileImage = this.props.user && this.props.user.photoUrl ? {uri: this.props.user.photoUrl} : null;
    const statusSize = width * 5.3 / 100;
    const userName = this.props.user && this.props.user.name ? this.props.user.name : '';

    return( 
    <SwipeRow 
        swipeToOpenPercent={25}
        leftOpenValue={availabilityBarWidth} rightOpenValue={editBarWidth}
        stopLeftSwipe={availabilityBarWidth} stopRightSwipe={editBarWidth}>

        <View style={[styles.tabs, styles.standaloneRowBack, {backgroundColor: appBkgColor}]}>
            <View style={[styles.avatar]}>
              <Avatar
                width={Style.getWidth(54)}
                height={Style.getWidth(54)}
                imageSrc={profileImage}
                name={userName}
              />
            </View>
            <View style={[styles.statusBar]}>
                <View style={[styles.statusContainer]}>
                  <TouchableOpacity style={[styles.statusContainer]} onPress={() => this.changeStatus(0)}>
                    <View style={[styles.statusCircle, styles.green]}></View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.statusContainer]}>
                  <TouchableOpacity style={[styles.statusContainer]} onPress={() => this.changeStatus(1)}>
                    <View style={[styles.statusCircle, styles.red]}></View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.statusContainer]}>
                  <TouchableOpacity style={[styles.statusContainer]} onPress={() => this.changeStatus(2)}>
                    <View style={[styles.statusCircle, styles.red]}>
                      <View style={{
                          backgroundColor: '#FFFFFF', 
                          position: 'absolute', 
                          height: width * 1.06 / 100, 
                          width: width * 3.46 / 100, 
                          top: width * 2.13 / 100,
                          left: width * 0.93 / 100}}></View>
                    </View>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={{width: Style.getWidth(144.75), height: Style.UNIT_Y, backgroundColor: bkgColor}}>
            </View>
        </View>
       
        <View style={{width: Style.getWidth(665.5), backgroundColor: appBkgColor}}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={[styles.tabs, this.props.style, {backgroundColor: bkgColor}]}>
                    {this.state.statusInApp == 0 && <View style={[styles.status, styles.green]} />}
                    {this.state.statusInApp == 1 && <View style={[styles.status, styles.red]} />}
                    {this.state.statusInApp == 2 && 
                      <View style={[styles.status, styles.red, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                        <View style={{
                          backgroundColor: '#FFFFFF', 
                          height: Style.PADDING, 
                          width: Style.PADDING}}></View>
                      </View>
                    }

                    <Animated.View
                        style={{width: Style.getWidth(54), 
                                height: Style.UNIT_Y,
                                backgroundColor: '#FFFFFF', 
                                position: 'absolute',
                                top: 0,
                                left: Style.PADDING + Style.getWidth(9.1) + this.state.currentTab * Style.getWidth(72.2),
                                transform: [
                                    {translateX: this.animatedValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [this.state.moveDistance, 0]
                                    })}
                                ]
                            }}>
                    </Animated.View>

                    {this.props.tabs.map((tab, i) => {
                        if(i < this.props.tabs.length - 1){
                            //const color = this.state.currentPage === i ? '#FFFFFF' : 'transparent';
                            const currentTab = i;
                            const currentPage = this.state.currentPage === i ? this.props.activeTab : i;
                            return <View style={[styles.tab, {backgroundColor: 'transparent'}]}>
                                <TouchableOpacity key={tab.icon} onPress={() => {
                                    
                                    if (this.state.tabs[tab.icon].overlay) {
                                        if(this.props.activeTab !== 0 && this.props.activeTab !== 2){
                                            this.props.goToPage(0);
                                            this.setState({currentPage: currentPage});
                                        }else{
                                            this.setState({currentPage: currentPage});
                                        }
                                    } else {
                                        this.setState({currentPage: i});
                                        if(Platform.OS==='android'){
                                            setTimeout(() => this.props.goToPage(i), 0);
                                        }else{
                                            this.props.goToPage(i);
                                        }
                                    }
                                    tab.func();

                                    this.redrawNavbar();

                                    this.move(currentTab);
                                    this.setState({previousPage: currentTab});

                            }} style={[styles.tab, {backgroundColor: 'transparent'}]}>
                                <View
                                  style={[styles.icons, {backgroundColor: 'transparent'}]}>
                                    {this.renderIcon(tab,i)}
                                </View>
                                {this.renderNotification(tab)}
                            </TouchableOpacity>
                          </View>;
                        }
                    })}

                    <View style={[styles.edgeBar, {backgroundColor: 'transparent'}]} />
                </View>

                <View style={{backgroundColor: appBkgColor, 
                              width: width * 77.33 / 100, 
                              flexDirection:'row', 
                              alignItems: 'center', 
                              justifyContent: 'flex-start'}}>

                    <View style={[styles.extraIcons]}>
                      <TouchableOpacity
                        onPress={()=>{
                            if(this.state.currentPage === 1 || this.state.currentPage === 3 || this.state.currentPage === 4){
                                this.props.tabs[this.state.currentPage].func();
                            }
                            this.setState({currentPage: 5});
                            this.props.goToPage(5);
                            this.redrawNavbar();
                        }} style={[styles.extraIcons, {backgroundColor: 'transparent'}]}>
                        <Image resizeMode="contain" style={styles.settingsIcon} source={settings} />
                        <View style={{
                            marginRight: width * 6.93 / 100}}>
                        <MiTransText color={'black'}>{'Settings'}</MiTransText>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.extraIcons]}>
                        <TouchableOpacity
                            onPress={()=>{
                                    if(this.state.currentPage === 1 || this.state.currentPage === 3 || this.state.currentPage === 4){
                                        this.props.tabs[this.state.currentPage].func();
                                    }

                                    if(this.state.currentPage !== 0){
                                        this.setState({currentPage: 0});
                                        this.props.goToPage(0);
                                    }
                                    this.props.toggle();
                                }
                            }
                            style={[styles.extraIcons, {backgroundColor: 'transparent'}]}>
                            <Image resizeMode="contain" style={[styles.homeIcon]} source={edit} />
                            <View style={{
                                marginRight: width * 8.93 / 100}}>
                            <MiTransText color={'black'}>{'Home'}</MiTransText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView> 
        </View>       
        
    </SwipeRow>);
  }

  render() {
    if (this.props.favorites.editing) {
        if(!this.props.favorites.contactModal && !this.props.favorites.groupModal) {
            return <A onPress={()=>{this.props.save(this.props.favorites)}}>
                <View style={[styles.tabs, styles.saveButton]}>
                    <MiTransText color={'dark'} center>{'Save'}</MiTransText>
                </View>
            </A>;
        }else if(this.props.favorites.contactModal){
            return <A onPress={()=>{this.props.toggleContact()}}>
                <View style={[styles.tabs, styles.closeButton]}>
                    <MiTransText color={'dark'} center>{'Close'}</MiTransText>
                </View>
            </A>;
        }else{
            return <View></View>;
        }
    }

    if(this.state.refresh){
        return <View>
            {this.renderMenu()}
            </View>;
    }else{
        return this.renderMenu();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);

const styles = StyleSheet.create({
    saveButton: {
        backgroundColor: '#F8CA00',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeButton: {
        backgroundColor: '#00b300',
        alignItems: 'center',
        justifyContent: 'center'
    },
    standaloneRowBack: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    backTextWhite: {
        color: 'black'
    },
    status: {
        height: Style.UNIT_Y,
        width: Style.PADDING,
    },
    statusBar: {
        height: Style.UNIT_Y,
        width: Style.getWidth(176.25),
        backgroundColor: bkgColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusContainer: {
        width: Style.getWidth(58.75),
        height: Style.UNIT_Y, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    tab: {
        height: Style.UNIT_Y,
        alignItems: 'center',
        justifyContent: 'center',
        width: Style.getWidth(72.2),
    },
    tabs: {
        height: Style.UNIT_Y,
        flexDirection: 'row',
        backgroundColor: bkgColor,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    avatar: {
        width: Style.getWidth(54),
        height: Style.getWidth(54)
    },
    statusCircle: {
        height: width * 5.33 / 100,
        width: width * 5.33 / 100,
        borderRadius: width * 5.33 / 100 * 0.5
    },
    green: {
        backgroundColor: '#3FAC49',
    },
    red: {
        backgroundColor: '#ED1C24',
    },
    edgeBar:{
        height: Style.UNIT_Y,
        width: Style.PADDING
    },
    icons: {
        width: Style.getWidth(54), 
        height: Style.UNIT_Y,
        flexDirection:'column',
        alignItems:'center',
    },
    extraIcons: {
        height: Style.UNIT_Y, 
        width: width * 38.66 / 100,
        marginLeft: 1, 
        backgroundColor: bkgColor,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    settingsIcon: {
        width: width * 5.33 / 100, 
        height: width * 5.33 / 100,
        marginLeft: width * 7.06 / 100,
        marginRight: width * 5.33 / 100
    },
    homeIcon: {
        width: width * 5.33 / 100, 
        height: width * 5.33 / 100,
        marginLeft: width * 8.4 / 100,
        marginRight: width * 5.33 / 100}
    }
);