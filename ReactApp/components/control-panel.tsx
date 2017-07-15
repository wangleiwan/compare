import React, {Component} from 'react';
import{
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Platform,
  ListView
} from 'react-native';
import { Provider, connect } from 'react-redux';
// App Globals
import AppStyles, {Style, underlayColor} from '../styles';
import AppConfig from '../config';
// Components
import A from './anchor';
import Status from './status';
import Notification from './notifications.icon';
import MiText from './text';
import MiTransText from './MiTransText';
import Avatar from './avatar';
import LinearGradient from './../components/LinearGradient';
import Badge from './badge';
// Redux
import { logout } from '../redux/auth';
import { goToPage, toggleDrawer } from '../redux/drawer';

const home = require('../assets/images/navbar/home@2x.png');
const chat = require('../assets/images/navbar/chat@2x.png');
const contacts = require('../assets/images/navbar/contacts@2x.png');
const callhistory = require('../assets/images/navbar/callhistory@2x.png');
const search = require('../assets/images/navbar/search@2x.png');
const settings = require('../assets/images/navbar/settings_android.png');
const edithome = require('../assets/images/navbar/edit_android.png');
const group = require('../assets/images/group@2x.png');
const backWhite = require('../assets/images/navbar/back white.png');

interface props {
    goToPage?: any;
    activeTab?: number;
    tabs?: Array<any>;
    user?: any;
}

interface state {
  tabs?: any;
  currentPage?: number;
  userStatus?: any;
  dataSource?: any;
  showDropdown? : boolean;
}

interface StateProps {
    user?: any;
    currentPageIndex?: any;
}
/*
interface DispatchProps {
  goToPage : any;
  toggleDrawer : any;
}*/

const mapStateToProps = (state: any) : StateProps  => ({
  user: state.auth.user,
  currentPageIndex: state.drawer.currentPage
});

const mapDispatchToProps = {
  goToPage,
  toggleDrawer
};

export class ControlPanel extends Component<props & StateProps, state> {
  userStatuses: Array<any>;

  constructor(props) {
    super(props);

    this.state = {
        tabs: {
            'home':         { icon: home},
            'chat':         { icon: chat},
            'contacts':     { icon: contacts},
            'callhistory':  { icon: callhistory},
            'search':       { icon: search},
            'settings':     { icon: settings},
            'edithome':     { icon: edithome},
        },
        currentPage: 0,
        userStatus: 0,
        showDropdown: false,
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };

  }

  componentWillMount() {
    this.userStatuses = [
      {label: 'Available'}, 
      {label: 'Busy'},
      {label: 'DND'}];

    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.userStatuses)});
  }

  renderIcon(tab: any, i: any, color: string) {
    const textColor: string = color;
    const type: string = 'baseText';
    const weight: string = 'bold';
    const title: string = tab.title;
    const marginLeft: number = tab.marginLeft;
    const marginRight: number = tab.marginRight;
    const content: string = '63';
    const iconHeight: number = tab.height;
    const iconWidth: number = tab.width;

    return (
      <View style={[{flex: 1, flexDirection:'row', justifyContent:'flex-start', alignItems: 'center'}]}>
        
        <Image resizeMode="contain" 
               style={[{marginLeft: marginLeft, marginRight: marginRight, height: iconHeight, width: iconWidth}]} 
               source={this.state.tabs[tab.icon].icon} />

        <View style={{width: Style.getWidth(77), flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
          <MiText
            color={textColor}
            type={type}
            weight={weight}
            style={{fontSize: Style.getHeight(14), lineHeight: Style.getHeight(16.5)}}>
            {title}
          </MiText>
        </View>
          
        {tab.icon === 'callhistory' &&
          <Badge content={content} style={{width: Style.getWidth(26.5), height: Style.getWidth(20), marginLeft: Style.getWidth(9)}}/>
        }

      </View>
    );
  }

  renderRow(data, sectionId, rowId) {
    const label = data.label.toLowerCase();
    const statusStyle = styles[label];
    return (
      <TouchableHighlight onPress={() => {
          this.pressRow(rowId, data);
        }}>
        <View style={[styles.dropDownRow]}>
          <View style={[statusStyle]}>
            {label === 'dnd' && 
            <View style={{backgroundColor: '#FFFFFF', 
                          position: 'absolute',
                          borderRadius: Style.getWidth(50),
                          height: Style.getHeight(4),
                          width: Style.getWidth(16)}}></View>}
          </View>
          <View style={{}}>
            <MiText color={'#404141'} 
                  type={'h4'}
                  weight={'light'}
                  style={{fontSize: Style.getHeight(14), lineHeight: Style.getHeight(16.5)}}>
              {data.label}
            </MiText>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  pressRow(rowId, rowData) {
    this.setState({userStatus: rowId});
    this.setState({showDropdown: false});
  }

  renderSeparator(sectionId: number, rowId: number) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  toggleStatusDropdown() {
    this.setState({
      showDropdown:!this.state.showDropdown
    });
  }

  render() {
    const outerWidth = Style.getWidth(85);
    const outerHeight = Style.getHeight(100);
    const innerWidth = Style.getWidth(71);
    const innerHeight = Style.getHeight(71);
    const profileImage = this.props.user.photoUrl ? {uri: this.props.user.photoUrl} : null;
    const name = this.props.user.name;

    const userStatus:string = this.userStatuses[this.state.userStatus].label;
    const userStatusStyle:any = styles[userStatus.toLowerCase()];

    return (
      <View style={[styles.container]}>

        <View style={[styles.profileContainer]}>
          <LinearGradient
            colors={[ AppConfig.tertiaryColor, AppConfig.primaryColor]}
            locations={[0,1]}
            style={[AppStyles.container]}>
          <Image style={[styles.bgImage]} source={group}>
            <View style={[styles.profile]}>
                <Avatar width={innerWidth} height={innerHeight} imageSrc={profileImage} name={name} />
                <View style={[styles.name]}>
                    <MiText color={'white'}
                        type={'baseText'}
                        style={{fontSize: Style.getHeight(16), lineHeight: Style.getHeight(19)}}>
                        {name}
                    </MiText>
                </View>
            </View>

            <View>
              <TouchableOpacity style={[styles.statusContainer]} onPress={() => {
                this.toggleStatusDropdown();
                }}>
                <View style={[{borderWidth: 1, borderColor: '#FFFFFF'}, styles[this.userStatuses[this.state.userStatus].label.toLowerCase()]]}>
                  {this.state.userStatus === '2' &&
                    <View style={{backgroundColor: '#FFFFFF', 
                          position: 'absolute',
                          borderRadius: Style.getWidth(50),
                          height: Style.getHeight(4),
                          width: Style.getWidth(16)}}></View>
                  }
                </View>
                <View style={{paddingLeft: Style.getWidth(3), width: Style.getWidth(59)}}>
                    <MiText color={'white'}
                        type={'baseText'}
                        weight={'light'}
                        style={{fontSize: Style.getHeight(14), lineHeight: Style.getHeight(16.5)}}>
                        {this.userStatuses[this.state.userStatus].label}
                    </MiText>
                </View>
                <Image style={[styles.arrow,{marginLeft: Style.getWidth(9.05)}]} source={backWhite} />
              </TouchableOpacity>
            </View>

          </Image>
          </LinearGradient>
        </View>  

        <View style={[styles.tabs]}>
            {this.props.tabs.map((tab, i) => {
                const color = this.props.currentPageIndex === i ? '#00A1E0' : '#11284C';
                return <TouchableOpacity disabled={this.state.showDropdown} key={tab.icon} onPress={() => {
                   this.props.goToPage(i);
                   tab.func();

                }} style={[styles.tab]}>
                {this.renderIcon(tab, i, color)}
                </TouchableOpacity>;
            })}
        </View>

       {this.state.showDropdown ?  
       <View style={[styles.overlay]}>
            <ListView
              style={[styles.listView]}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              renderSeparator={this.renderSeparator}
            />
            <View style={[styles.shadow]}></View>
        </View> : null}
       
       
      </View>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#F4F7F9'
  },
  bgImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  tab: {
    height: Style.UNIT_Y,
  },
  tabs: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: Style.getHeight(513.5),
  },
  profileContainer: {
    height: Style.getHeight(153.5),
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Style.getHeight(17.3),
    marginLeft: Style.getWidth(16),
  },
  name: {
    marginLeft: Style.getWidth(16.4),
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Style.getHeight(25),
    marginLeft: Style.getWidth(16),
    width: Style.getWidth(112.5),
    height: Style.getHeight(22),
  },
  available: {
    height: Style.getWidth(20),
    width: Style.getWidth(20),
    marginRight: Style.getWidth(15),
    backgroundColor: '#3FAC49',
    borderRadius: Style.getWidth(10),
  },
  busy: {
    height: Style.getWidth(20),
    width: Style.getWidth(20),
    marginRight: Style.getWidth(15),
    backgroundColor: '#ED1C24',
    borderRadius: Style.getWidth(10),
  },
  dnd: {
    height: Style.getWidth(20),
    width: Style.getWidth(20),
    marginRight: Style.getWidth(15),
    backgroundColor: '#ED1C24',
    borderRadius: Style.getWidth(10),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    height: Style.getHeight(5.85),
    width: Style.getWidth(9)
  },
  listView: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: Style.getHeight(98),
    left: 0,
    width: Style.getWidth(275),
  },
  shadow: {
    backgroundColor: 'rgba(17,40,76,1)',
    width: Style.getWidth(275),
    height: Style.getHeight(1.5),
  },
  dropDownRow: {
    marginLeft: Style.getWidth(16),
    height: Style.getHeight(53.5),
    flexDirection: 'row',
    alignItems: 'center',
    width: Style.getWidth(275.3),
  },
  separator: {
    height: Style.getWidth(0.5),
    backgroundColor: 'rgba(151,151,151,0.31)',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(244,247,249,0.5)',
    height: Style.getHeight(667),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
  
})