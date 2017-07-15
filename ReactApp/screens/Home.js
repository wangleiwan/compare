/**
 * Form SCREEN
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  Image,
  Platform,
  Animated,
  LayoutAnimation,
  PanResponder,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

// App Globals
import AppStyles, { Style, underlayColor } from '../styles';
import AppUtil from '../util';

// Screens
import DialPad from './DialPad';
import ContactsList from './ContactsList';

// Components
import A from '../components/anchor';
import HomeTop from '../components/home-top';
import HomeControls from '../components/home-controls';
import HomeFavorites from '../components/home-favorites';
import Overlay from '../components/Overlay';
import MiTransText from '../components/MiTransText';
import Tile from '../components/tile';
import LoadingModal from '../components/loadingModal';

// Redux
import { loadUsers, createGroup, addMemberToGroup } from '../redux/users';
import { loadConvs } from '../redux/conversations';
import {
  toggle as toggleEditFavorites,
  modify,
  toggleContact,
  save,
  load as loadFavs,
  toggleGroupModal,
} from '../redux/favorites';
import { loadProfile, loadAuth, sendVerify, login } from '../redux/auth';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { dialPad: false };

    this.pushToTalk = this.pushToTalk.bind(this);
    this.endPushToTalk = this.endPushToTalk.bind(this);
    this.add = this.add.bind(this);
    this.modify = this.modify.bind(this);
    this.filterContacts = this.filterContacts.bind(this);
    this.renderAddFirstFavorite = this.renderAddFirstFavorite.bind(this);
  }

  pushToTalk(i) {
    this.setState({ pushToTalk: i });
  }

  endPushToTalk() {
    this.setState({ pushToTalk: undefined });
  }

  add(contact) {
    const id = contact.userId || contact.groupId;
    this.props.modify({
      order: this.props.favorites.order.concat([id])
    });
  }

  modify({ order }) {
    this.props.modify({ order });
  }

  renderDot() {
    return <View style={[styles.dot]} />;
  }

  renderActiveDot() {
    return <View style={[styles.dot, styles.activeDot]} />;
  }

  renderAddFirstFavorite() {
    return (
      <View style={{ flex: 1, paddingTop: Style.PADDING * 2 }}>
        <Tile
          addNew
          addFirst
          onPress={() => {
            this.props.toggleContact();
            this.props.toggleEditFavorites();
          }}
          horzEnd={false}
          vertEnd={false}
          key={'add-first-favorite'}
        />
      </View>
    );
  }

  filterContacts(contact) {
    const id = contact.userId || contact.groupId;
    if (this.props.favorites.order.indexOf(id) !== -1) {
      return false;
    }

    return true;
  }

  render() {
    const homePadding = Platform.OS === 'ios' ? AppStyles.padding : {};

    return (
      <View
        ref={view => (this.tabView = view)}
        style={[
          homePadding,
          AppStyles.tabView,
          { paddingTop: Platform.OS === 'ios' ? Style.getHeight(18) : 0 }
        ]}
      >

        <HomeTop
          pushToTalk={this.state.pushToTalk}
          activateDialPad={() => {
            this.setState({ dialPad: true });
          }}
          drawer={this.props.drawer}
        />

        <HomeControls pushToTalk={this.state.pushToTalk} />

        {!this.props.favorites.order.length &&
          !this.props.favorites.editing &&
          !this.props.users.loading &&
          this.renderAddFirstFavorite()}

        <HomeFavorites
          addMemberToGroup={this.props.addMemberToGroup}
          createGroup={this.props.createGroup}
          pushToTalk={this.pushToTalk}
          endPushToTalk={this.endPushToTalk}
          editing={this.props.favorites.editing}
          order={this.props.favorites.order}
          modify={this.modify}
          favorites={Object.assign({}, this.props.users.mappedGroups, this.props.users.mappedUsers)}
          onAddNew={() => {
            this.props.toggleContact();
          }}
        />

        {this.state.dialPad
          ? <Overlay order={'reverse'} topDown={true} parentView={this.tabView}>
              <DialPad
                closeModal={() => this.setState({ dialPad: !this.state.dialPad })}
                navigator={this.props.navigator}
              />
            </Overlay>
          : null}

        {Platform.OS === 'android' && this.props.favorites.contactModal
          ? <Overlay
              order={'reverse'}
              parentView={this.tabView}
              closeModal={() => this.props.toggleContact()}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height - Style.getHeight(94)
                }}
              >
                <ContactsList
                  filter={this.filterContacts}
                  onPress={contact => {
                    this.add(contact);
                    this.props.toggleContact();
                  }}
                  navigator={this.props.navigator}
                />
              </View>
            </Overlay>
          : null}

        {Platform.OS === 'ios' && this.props.favorites.contactModal
          ? <Overlay
              order={'reverse'}
              parentView={this.tabView}
              closeModal={() => this.props.toggleContact()}
            >
              <ContactsList
                filter={this.filterContacts}
                onPress={contact => {
                  this.add(contact);
                  this.props.toggleContact();
                }}
                navigator={this.props.navigator}
              />
            </Overlay>
          : null}

        {Platform.OS === 'android' &&
          this.props.favorites.editing &&
          !this.props.favorites.contactModal &&
          !this.props.favorites.groupModal &&
          <View style={[styles.buttonContainer, styles.saveButton]}>
            <A
              onPress={() => {
                this.props.save(this.props.favorites);
              }}
            >
              <View style={[styles.buttonText]}>
                <MiTransText center>
                  {'Save'}
                </MiTransText>
              </View>
            </A>
          </View>}

        {Platform.OS === 'android' &&
          this.props.favorites.editing &&
          this.props.favorites.contactModal &&
          <View style={[styles.buttonContainer, styles.closeButton]}>
            <A
              onPress={() => {
                this.props.toggleContact();
              }}
            >
              <View style={[styles.buttonText]}>
                <MiTransText center>
                  {'Close'}
                </MiTransText>
              </View>
            </A>
          </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  darkening: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: -96 // compensate for paddingTop in container...bug?
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: Style.getHeight(8),
    height: Style.getHeight(8),
    borderRadius: 7,
    marginLeft: 3,
    marginRight: 3
  },
  activeDot: {
    backgroundColor: '#FFF'
  },
  list: {
    marginTop: Style.PADDING * 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  saveButton: {
    backgroundColor: '#F8CA00'
  },
  closeButton: {
    backgroundColor: '#00b300'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Style.UNIT_Y,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: Dimensions.get('window').width
  },
  buttonText: {
    width: Dimensions.get('window').width,
    height: Style.UNIT_Y,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

// Define which part of the state we're passing to this component
const mapStateToProps = state => ({
  users: state.users,
  favorites: state.favorites
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  toggleContact,
  toggleGroupModal,
  toggleEditFavorites,
  save,
  modify,
  loadAuth,
  loadProfile,
  loadFavs,
  loadConvs,

  loadUsers,
  createGroup,
  addMemberToGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
