import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  RefreshControl,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';

// App Globals
import AppStyles, { Style, underlayColor } from '../styles';
import AppUtil from '../util';
import AppDB from '../db';
import AppConfig from '../config';

// Screens
import Contact from './Contact';

// Dispatch functions
import { loadUsers, loadGroups, clearRefresh } from '../redux/users';


// Components
import ListSearch from '../components/list.search';
import A from '../components/anchor';
import MiText from '../components/text';
import MiTransText from '../components/MiTransText';
import ListSwipeRow from '../components/list.swipe.row';
import mobileAnalyticsClient from '../mobileAnalyticsClient';
import ActionBar from '../components/actionbar';
import LoadingModal from '../components/loadingModal';

// images
const more = require('../assets/images/navbar/more@2x.png');

const { height, width } = Dimensions.get('window');

export class ContactsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      group: '',
      moreActive: false,
      moreOption: -1,
      searchTerm: '',
      callButtonPressed: 0,
    };

    this.renderRow = this.renderRow.bind(this);
    this.onDropdownWillShow = this.onDropdownWillShow.bind(this);
    this.onDropdownWillHide = this.onDropdownWillHide.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderContacts = this.renderContacts.bind(this);
    this.refreshLists = this.refreshLists.bind(this);
    this.extraFilter = this.props.filter ? this.props.filter : () => true;
    this.goToContact = this.goToContact.bind(this);
    this.handleCallButtonPress = this.handleCallButtonPress.bind(this);

    this.more = {
      options: ['New Contact', 'Organize'],
      adjustFrame: this.adjustFrame,
      onSelect: this.onSelect,
      onDropdownWillShow: this.onDropdownWillShow,
      onDropdownWillHide: this.onDropdownWillHide,
      renderRow: this.renderRow,
    };
  }

  componentWillMount() {
    if (this.props.users.shouldRefresh) {
      this.props.clearRefresh();
      this.onRefresh();
    }
  }

  componentDidMount() {
    this.refs.scrollView.scrollTo({ x: 0, y: Style.UNIT_Y, animated: false });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.users.shouldRefresh) {
      this.props.clearRefresh();
      this.refreshLists();
    }
  }

  onDropdownWillHide() {
    this.setState({ moreActive: false });
  }

  onDropdownWillShow() {
    this.setState({ moreActive: true });
  }

  onSelect(index, value) {
    this.setState({ moreOption: index });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.refreshLists().then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleCallButtonPress() {
    mobileAnalyticsClient.recordEvent(
      'callsFromContactsList',
      {
        calls: 'calls',
      },
      {
        callsMade: this.state.callButtonPressed + 1,
      },
    );
    this.setState({ callButtonPressed: this.state.callButtonPressed + 1 });
  }

  renderContacts() {
    let i = 0;
    let tiles = this.props.users.mixed
      .filter(this.extraFilter)
      .filter((contact) => {
        if (this.state.group === 'Business') return contact.emailVerified;
        if (this.state.group === 'Personal') return contact.mobileVerified;

        return true;
      })
      .filter((contact) => {
        if (contact.name) {
          return (
            contact.name
              .toLowerCase()
              .indexOf(this.state.searchTerm.toLowerCase()) !== -1
          );
        }
        return false;
      })
      .map((contact) => {
        i++;
        const profileImage = contact.photoUrl
          ? { uri: contact.photoUrl }
          : null;
        const onPress = this.props.onPress
          ? this.props.onPress
          : this.goToContact;
        const name = contact.name ? contact.name : null;
        if (!name) return null;

        return (
          <ListSwipeRow
            leftOpenValue={width / 4}
            disableLeftSwipe
            stopLeftSwipe={width / 4}
            leftButtonPress={this.handleCallButtonPress}
            listRowPress={() => {
              onPress(contact);
            }}
            key={i}
            profileImage={profileImage}
            listLeftText={name}
          />
        );
      });

    return tiles;
  }

  renderRow(rowData, rowID, highlighted) {
    return (
      <View>
        <A>
          <View style={[AppStyles.row, styles.dropdown_row]}>
            <MiText
              style={[
                styles.dropdown_row_text,
                highlighted && { color: 'mediumaquamarine' },
              ]}
            >
              {rowData}
            </MiText>
          </View>
        </A>
      </View>
    );
  }

  render() {
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return (
      <View style={[padding, AppStyles.tabView]}>
        <LoadingModal
          visible={this.props.users.loading}
          request={this.props.users.request}
        />
        
        {Platform.OS === 'android' &&
          <ActionBar
            pageLabel={'Contacts'}
            drawer={this.props.drawer}
            more={this.more}
          />}

        <View style={[ AppStyles.row,
                      { marginBottom: Platform.OS === 'ios' ? Style.PADDING : 0 },]}>
          <View style={[AppStyles.card, { flexDirection: 'row' }, listPadding]}>
            <A onPress={() => { this.setState({ group: '' });}}
               style={[ AppStyles.card, { backgroundColor: this.state.group === '' ? '#FFF' : 'whitesmoke'}]}>
              <View>
                <MiTransText color={'dark'} center>{'All'}</MiTransText>
              </View>
            </A>
            <A onPress={() => { this.setState({ group: 'Business' }); }}
               style={[ AppStyles.card, { backgroundColor: this.state.group === 'Business' ? '#FFF' : 'whitesmoke'}]}>
              <View>
                <MiTransText color={'dark'} center>{'Business'}</MiTransText>
              </View>
            </A>
            <A onPress={() => { this.setState({ group: 'Personal' }); }}
               style={[ AppStyles.card, { backgroundColor: this.state.group === 'Personal' ? '#FFF' : 'whitesmoke'}]}>
              <View>
                <MiTransText color={'dark'} center>{'Personal'}</MiTransText>
              </View>
            </A>
          </View>

          {Platform.OS === 'ios' &&
            <ModalDropdown
              options={['New Contact', 'Organize']}
              dropdownStyle={styles.dropdown}
              adjustFrame={this.adjustFrame}
              onSelect={this.onSelect}
              onDropdownWillShow={this.onDropdownWillShow}
              onDropdownWillHide={this.onDropdownWillHide}
              renderRow={this.renderRow}
            >
              <View style={[AppStyles.cornerCard]}>
                <Image
                  resizeMode="contain"
                  style={AppStyles.icon}
                  source={more}
                />
              </View>
            </ModalDropdown>}
        </View>

        <ScrollView
          ref={'scrollView'}
          contentContainerStyle={[{ marginBottom: 20 }, listPadding]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              title={'Updating List'}
              enabled
            />
          }
        >
          <ListSearch
            onChangeText={searchTerm => this.setState({ searchTerm })}
            searchTerm={this.state.searchTerm}
          />
          {this.renderContacts()}
        </ScrollView>
      </View>
    );
  }

  refreshLists() {
    return Promise.all([this.getUsers(), this.getGroups()]);
  }

  getUsers() {
    return this.props.loadUsers();
  }

  getGroups() {
    return this.props.loadGroups();
  }

  goToContact(contact) {
    this.props.navigator.push({
      title: contact.name,
      data: contact,
      component: Contact,
      index: 1,
    });
  }

  adjustFrame(style) {
    style.right += 1;
    return style;
  }

}

const styles = StyleSheet.create({
  dropdown_row_text: {
    marginHorizontal: 4,
    fontSize: 14,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdown: {
    width: 200,
    height: 100,
    margin: 1,
    borderWidth: 0,
    shadowColor: 'transparent',
  },
  dropdown_row: {
    width: 200,
    alignItems: 'center',
  },
  hamburger: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: Style.PADDING,
    flex: 1,
  },
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  users: state.users,
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  loadUsers,
  loadGroups,
  clearRefresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
