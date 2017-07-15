'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';

// App Globals
import AppStyles, {Style,underlayColor} from '../styles';
import AppUtil from '../util';
import AppDB from '../db';

// Components
import ListSearch from '../components/list.search';
import ListRow from '../components/list.row';
import ListSwipeRow from '../components/list.swipe.row';
import A from '../components/anchor';
import MiText from '../components/text';
import MiTransText from '../components/MiTransText';
import ActionBar from '../components/actionbar';

const more = require('../assets/images/navbar/more@2x.png');
const hamburger = require('../assets/images/navbar/hamburger.png');
const receivedCall = require('../assets/images/navbar/received call.png');
const missedCall = require('../assets/images/navbar/missed call.png');
const dialledCall = require('../assets/images/navbar/dialled call.png');

var {height, width} = Dimensions.get('window');

export class CallHistory extends Component {

  constructor(props){
    super(props);

    this.state = {
        moreActive: false,
        moreOption: -1,
        group: '',
        searchTerm: ''
    }
    this.renderHistory = this.renderHistory.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onDropdownWillShow = this.onDropdownWillShow.bind(this);
    this.onDropdownWillHide = this.onDropdownWillHide.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.more = {
        options: ['New Contact', 'Organize'],
        adjustFrame: this.adjustFrame,
        onSelect: this.onSelect,
        onDropdownWillShow: this.onDropdownWillShow,
        onDropdownWillHide: this.onDropdownWillHide,
        renderRow: this.renderRow
    };
  }

  componentDidMount() {
    setTimeout(() => this.refs.scrollView.scrollTo({x:0, y: Style.UNIT_Y + 1, animated: false}) , 0);
  }

  renderHistory() {
        let i = 0;
        let tiles = this.props.users.mixed
            .filter(contact => {
                if (this.state.group === 'Missed')
                    return contact.emailVerified;
                if (this.state.group === 'Voicemail')
                    return contact.mobileVerified;

                return true;
            })
            .filter(contact => {
                if (contact.name) {
                    return contact.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
                }
                return false;
            })
            .map(contact => {
                i++;
                const profileImage = contact.photoUrl ? {uri: contact.photoUrl}: null;
                const color = i % 3 === 0 ? '#ED1C24' : '#404141';
                const icon = i % 3 === 0 ? missedCall : (i % 3 === 1 ? receivedCall : dialledCall);
                const iconHeight = i % 3 === 0 ? Style.getHeight(14) : Style.getHeight(20);
                const iconWidth = Style.getWidth(19.5);
                const name = contact.name ? contact.name: '.';
                if (!name) return null;

                return (<ListSwipeRow
                            key={i}
                            rightOpenValue={-width/2}
                            disableRightSwipe={true}
                            stopRightSwipe={-width/2}
                            leftButtonPress={()=>{}}
                            rightButtonPressLeft={()=>{}}
                            rightButtonPressRight={()=>{}}
                            listRowPress={()=>{}}
                            profileImage={profileImage}
                            listLeftText={name}
                            listLeftSubText={'Home'}
                            listRightIcon={<Image resizeMode={'contain'} style={{width: iconWidth, height: iconHeight}} source={icon} />}
                            listRightText={'yesterday'}
                            color={color} />)
            });

        return tiles;
  }

  renderRow(rowData, rowID, highlighted) {
    return (
      <View><A>
        <View style={[AppStyles.row,styles.dropdown_row]}>
          <MiTransText color={highlighted && 'mediumaquamarine'} style={[styles.dropdown_row_text]}>
            {rowData}
          </MiTransText>
        </View>
      </A></View>
    );
  }

  adjustFrame(style) {
    style.right += 1;
    return style;
  }

  onSelect(index, value) {
    this.setState({moreOption: index});
  }

  onDropdownWillShow() {
    this.setState({moreActive: true});
  }

  onDropdownWillHide() {
    this.setState({moreActive: false});
  }

  componentWillUpdate(nextProps, nextState) {

  }

  render(){
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const cardPadding = Platform.OS === 'ios' ? {} : {paddingLeft: Style.PADDING, paddingRight: Style.PADDING};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};
    const listMarginTop = Platform.OS === 'ios' ? Style.getWidth(7) : Style.getWidth(1);
    const appBkgColor = '#A4C0CE';

    return <View style={[padding, AppStyles.tabView, {marginTop: Platform.OS === 'ios' ? Style.getHeight(200) : 0}]}>
        {Platform.OS === 'android' &&
          <ActionBar pageLabel={'Call History'} drawer={this.props.drawer} more={this.more} />
        }

        <View style={[AppStyles.row, styles.navbar]}>
            <View style={[AppStyles.card, cardPadding, {flexDirection:'row', backgroundColor: Platform.OS === 'android' ? appBkgColor : 'transparent'}]}>
                <A onPress={()=>{this.setState({group: ''})}}
                    style={[AppStyles.card, {backgroundColor: this.state.group === '' ? '#FFF' : 'rgba(255,255,255,0.6)', marginRight: Style.getWidth(0.5)}]}>
                    <View><MiTransText center color={'#15325F'}>{'All'}</MiTransText></View>
                </A>
                <A onPress={()=>{this.setState({group: 'Missed'})}}
                    style={[AppStyles.card, {backgroundColor: this.state.group === 'Missed' ? '#FFF' : 'rgba(255,255,255,0.6)', marginRight: Style.getWidth(0.5)}]}>
                    <View><MiTransText center color={'#15325F'}>{'Missed'}</MiTransText></View>
                </A>
                <A onPress={()=>{this.setState({group: 'Voicemail'})}}
                    style={[AppStyles.card, {backgroundColor: this.state.group === 'Voicemail' ? '#FFF' : 'rgba(255,255,255,0.6)'}]}>
                    <View><MiTransText center color={'#15325F'}>{'Voicemail'}</MiTransText></View>
                </A>
            </View>
            { Platform.OS === 'ios' && <ModalDropdown
                options={['New Voicemail', 'Organize']}
                dropdownStyle={styles.dropdown}
                adjustFrame={this.adjustFrame}
                onSelect={this.onSelect}
                onDropdownWillShow={this.onDropdownWillShow}
                onDropdownWillHide={this.onDropdownWillHide}
                renderRow={this.renderRow}>
                <View style={[AppStyles.cornerCard, AppStyles.padding]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={more} />
                </View>
            </ModalDropdown>}
        </View>

        <ScrollView ref={'scrollView'} style={{marginTop: listMarginTop}} contentContainerStyle={[listPadding, {marginBottom: 20}]}>
            <ListSearch
                onChangeText={(searchTerm) => this.setState({searchTerm})}
                searchTerm={this.state.searchTerm}
            />
            {this.renderHistory()}
        </ScrollView>
    </View>
  }


}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#FFFFFF',
    },

    dropdown_row_text: {
        marginHorizontal: 4,
        color: 'navy',
        textAlignVertical: 'center',
    },
    dropdown: {
        width: Style.getWidth(200),
        height: Style.getHeight(100),
        margin:1,
        borderWidth: 0,
        shadowColor: 'transparent'
    },
    dropdown_row: {
        width: Style.getWidth(200),
        alignItems: 'center',
    },
    hamburger: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: Style.PADDING,
        flex: 1
    }
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  users: state.users
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(CallHistory);