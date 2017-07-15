/* Setup ==================================================================== */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert
} from "react-native";

import { GiftedChat, Actions } from "react-native-gifted-chat";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// App Globals
import AppStyles, { Style, underlayColor, backgroundColor } from "../styles";
import AppConfig from '../config';

import ContactForm from '../components/ContactForm';
import Avatar from "../components/avatar";
import Status from "../components/status";
import ListRow from "../components/list.row";
import A from "../components/anchor";
import MiText from "../components/text";
import LoadingModal from "../components/loadingModal";
import MiTransText from "../components/MiTransText";
import Alerts from '../components/alerts';

import User from "../models/User";
import { loadMsgs, createMsg } from "../redux/conversations";
import { update } from "../redux/auth";
import { deleteUser, clearRedirect, clearUsersError, setRefreshRequired } from "../redux/users";

const back = require("../assets/images/navbar/back@2x.png");
const more = require("../assets/images/navbar/more@2x.png");
const call = require("../assets/images/navbar/call-light@2x.png");
const video = require("../assets/images/video_small_medium@2x.png");
const chat = require("../assets/images/navbar/chat-light@2x.png");
const edit = require("../assets/images/navbar/edit@2x.png"); 

interface props {
  conversations: any;
  auth: any;
  users: any;
  navigator: any;
  data: User;
  update: any;
  deleteUser: any;
  clearUsersError: any;
  clearRedirect: any;
  setRefreshRequired: any;
  isNewContact: boolean;
}

interface state {
  contact: User;
  group: string;
  isInEditMode: boolean;
}

export class Contact extends Component<props, state> {

  private isMounted: boolean;
  private isAlright: boolean;
  
  constructor(props) {

    super(props);
    
    this.state = {
      contact: new User({ ...props.data }),
      group: "Details",
      isInEditMode: props.route.isInEditMode
    };

    this.isMounted = false;
    this.isAlright = null;
    this.renderActivity = this.renderActivity.bind(this);
    this.isCurrentUser = this.isCurrentUser.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderContactOptionsButtons = this.renderContactOptionsButtons.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.openDeleteConfirmation = this.openDeleteConfirmation.bind(this);
    this.hasDeletePermission = this.hasDeletePermission.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentWillMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
    this.props.clearUsersError();
  }

  componentDidUpdate() {
    if (this.props.users.shouldRedirect && !this.props.users.shouldRefresh) {
      
      this.props.setRefreshRequired();

      setTimeout(() => {
        this.goBack();
      }, 1500);
    }
  }

  renderStatus() {
    return (
      <View style={[AppStyles.avatarStatus, styles.status]}>
        <Status color={"yellow"} size={8} />
      </View>
    )
  }

  renderNameDisplay(contact: any) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <MiText center color={"dark"} style={[styles.itemText]}>
          {contact.name}
        </MiText>
      </View>
    )
  }

  renderDetailOrEdit(isInEditMode, isNewContact, contact) {
    const padding = Platform.OS === 'ios' ? AppStyles.padding : {};
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return isInEditMode ? (
        <ContactForm contact={contact} isNewContact={isNewContact} navigator={this.props.navigator} toggleEditMode={this.toggleEditMode} saveContact={this.saveContact} renderContactOptionsButtons={this.renderContactOptionsButtons} auth={this.props.auth}/>
    ) : (
       <View style={[{ flex: 1}, padding]}>
        {this.props.users.loading && <LoadingModal request={this.props.users.request} visible={this.props.users.loading}/>}

        {this.props.users.error && <Alerts error={this.props.users.error}/>}
        {this.props.users.shouldRedirect && <Alerts success={'User Deleted Successfully'}/>}

        {this.renderContactOptionsCard(this.state.contact)}
        {this.renderTabs()}
        
        <View style={[{ flex: 1 }, listPadding]}>
          <ScrollView
            ref={"scrollView"}
            contentContainerStyle={[{ marginBottom: 20 }]}
          >
            {this.state.group === "Details" && this.renderDetails()}
            {this.state.group === "Activity" && this.renderActivity()}
          </ScrollView>
        </View>
      </View>
    )
  }

  renderTopRightButton() {
    return this.isCurrentUser(this.props.auth.user, this.state.contact) ? (
      <A onPress={() => { this.toggleEditMode() }} style={[AppStyles.cornerCard]}>
        <Image resizeMode="contain" style={AppStyles.icon} source={edit} />
      </A>
    ) : (
      <A onPress={() => {}} style={[AppStyles.cornerCard]}>
        <Image resizeMode="contain" style={AppStyles.icon} source={more} />
      </A>
    )
  }

  renderTabs() {
    const listPadding = Platform.OS === 'ios' ? {} : {padding: Style.PADDING, paddingTop: 0};

    return (
      <View style={[AppStyles.row, styles.tabs, listPadding]}>
        <A
          onPress={() => {
            this.setState({ group: "Details" });
          }}
          style={[
            AppStyles.card,
            {
              backgroundColor: this.state.group === "Details"
                ? "#FFF"
                : "#C5D2DA"
            }
          ]}
        >
          <View>
            <MiTransText color={"dark"} center>{"Details"}</MiTransText>
          </View>
        </A>
        <A
          onPress={() => {
            this.setState({ group: "Activity" });
          }}
          style={[
            AppStyles.card,
            {
              backgroundColor: this.state.group === "Activity"
                ? "#FFF"
                : "#C5D2DA"
            }
          ]}
        >
          <View>
            <MiTransText color={"dark"} center>{"Activity"}</MiTransText>
          </View>
        </A>
      </View>
    )
  }

  renderDetails() {
    const height = Style.getHeight(54);
    const phones = [
      { type: "phone", title: "mobile", data: this.state.contact.mobile },
      { type: "phone", title: "work", data: this.state.contact.work },
      { type: "phone", title: "home", data: this.state.contact.home },
      { type: "phone", title: "extension", data: this.state.contact.extension}
    ];
    const emails = [
      { type: "email", title: "email", data: this.state.contact.email }
    ];
    let details = phones.map((el, key) => {
      return (
        <View
          key={el.type + "-" + key}
          style={[
            styles.listItemOuter,
            { borderBottomWidth: key === phones.length - 1 ? 1 : 0 }
          ]}
        >
          <View style={[styles.listItemTextView, { height: height }]}>
            <MiTransText color={"dark"} style={[styles.itemTitle]}>{el.title}</MiTransText>
            <MiText color={"light"} style={[styles.itemTitle]}>
              {el.data}
            </MiText>
          </View>
        </View>
      );
    });
    
    details = details.concat(
      emails.map((el, key) => {
        return (
          <View
            key={el.type + "-" + key}
            style={[
              styles.listItemOuter,
              { borderBottomWidth: key === emails.length - 1 ? 1 : 0 }
            ]}
          >
            <View style={[styles.listItemTextView, { height: height }]}>
              <MiTransText color={"dark"} style={[styles.itemTitle]}>{el.title}</MiTransText>
              <MiText color={"light"} style={[styles.itemTitle]}>
                {el.data}
              </MiText>
            </View>
          </View>
        );
      })
    );

    details = details.concat(
      this.renderActions(this.state.contact)
    )

    return details;
  }

  renderActivity() {
    // todo: implement activity from call history. Currently mocked.
    let i = 0;
    const contact = this.state.contact;
    const calls = [ { time: '9:50 AM'}, { time: '9:40 AM' }, { time: '9:30 AM' }, { time: 'Yesterday'}]
    let tiles = calls.map(call => {
      i++;

      const profileImage = contact.photoUrl ? { uri: contact.photoUrl } : null;
      const icon = !(i % 3) ? "call-missed" : "call-made";
      const color = !(i % 3) ? "red" : "black";
      const size = Style.UNIT_Y;
      const avatarSize = Math.round(size * (80/108));
      const name = contact.name ? contact.name : ".";

      if (!name) return null;

      return (
        <ListRow
          color={'red'}
          key={i}
          onClick={() => {}}
          imageSrc={profileImage}
          leftText={name}
          leftSubText={'home'}
          rightText={call.time}
          rightIcon={<MaterialIcons name={icon} size={20} color={color} />}
        />
      );
    });

    return tiles;
  }

  renderActions(contact) {
    let actions = [];
    if (this.isCurrentUser(this.props.auth.user, this.state.contact)) {
      actions = actions.concat(this.renderEditButton())
    } else {
      actions = actions.concat(
        [
          <A
            key={"action-0"}
            onPress={this.shareContact}
            style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
          >
            <View style={[styles.listItemTextView, { alignItems: "center"}]}>
              <MiTransText color={"dark"}>{"ShareContact"}</MiTransText>
            </View>
          </A>,
          <A
            key={"action-1"}
            onPress={this.assignAsBLF}
            style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
          >
            <View style={[styles.listItemTextView, { alignItems: "center"}]}>
              <MiTransText color={"dark"}>{"AssignAsBLF"}</MiTransText>
            </View>
          </A>,
          <A
            key={"action-2"}
            onPress={this.addToHome}
            style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
          >
            <View style={[styles.listItemTextView, { alignItems: "center"}]}>
              <MiTransText color={"dark"}>{"AddToHome"}</MiTransText>
            </View>
          </A>,
          <A
            key={"action-3"}
            onPress={this.blockUser}
            style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
          >
            <View style={[styles.listItemTextView, { alignItems: "center"}]}>
              <MiTransText color={"danger"}>{"BlockUser"}</MiTransText>
            </View>
          </A>
        ]
      )
      if (this.hasDeletePermission(this.props.auth.user)) {
        actions = actions.concat(
          <A
            key={"delete-button"}
            onPress={() => {this.openDeleteConfirmation()}}
            style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
          >
            <View style={[styles.listItemTextView, styles.deleteButton, { alignItems: "center"}]}>
              <MiTransText color={"dark"}>{"DeleteUser"}</MiTransText>
            </View>
          </A>  
        )
      }
    }
    return actions;
  }

  renderEditButton() {
    return (
      <A
        key={"edit-button"}
        onPress={this.toggleEditMode}
        style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
      >
        <View style={[styles.listItemTextView, { alignItems: "center"}]}>
          <MiTransText color={"dark"}>{"Edit"}</MiTransText>
        </View>
      </A>
    )
  }

  renderContactOptionsCard(contact) {
    const contactOptions = [
      { title: "mobile", value: this.state.contact.mobile, icon: call, onPress: () => {}},
      { title: "work", value: this.state.contact.work, icon: call, onPress: () => {} },
      { title: "video", value: true, icon: video, onPress: () => {} },
      { title: "chat", value: true, icon: chat, onPress: () => {} }
    ];

    const profileImage = contact.photoUrl ? { uri: contact.photoUrl } : null;

    return (
      <View style={[ styles.topCard]}>
        <View style={[AppStyles.row, { backgroundColor: backgroundColor, justifyContent: "space-between" }]}>
          <A onPress={this.props.navigator.pop} style={[AppStyles.cornerCard]}>
            <Image resizeMode="contain" style={AppStyles.icon} source={back} />
          </A>
          <View style={[AppStyles.row]} />
          {this.renderTopRightButton()}
        </View>

        <View style={[styles.content, { backgroundColor: backgroundColor }]}>
          <View style={[AppStyles.margin, styles.avatar]}>
            <Avatar
              width={75}
              height={75}
              imageSrc={profileImage}
              name={contact.name}
              isNewContact={false}
            />

            {this.renderStatus()}
          </View>
          {this.renderNameDisplay(contact)}
        </View>

      <View style={[AppStyles.row, styles.buttonRow]}>
        {this.renderContactOptionsButtons(contactOptions)}
      </View>
    </View>
    )
  }

  renderContactOptionsButtons(options) {
    return options.map((el, key) => (
      <A key={key} onPress={el.onPress} style={{ opacity: this.isInactive(el) ? 0.2 : 1 }}>
        <View style={[{ flex: 1, flexDirection: "column" }]}>
          <Image
            resizeMode="contain"
            style={[AppStyles.icon, { marginBottom: 6 }]}
            source={el.icon}
          />
          <MiTransText center color={"light"}>{el.title}</MiTransText>
        </View>
      </A>
    ));
  }

  render() {
    const contact = this.state.contact;
    const isInEditMode = this.state.isInEditMode;
    const { isNewContact } = this.props;

    return (
      this.renderDetailOrEdit(isInEditMode, isNewContact, contact)
    )
  }

  addToHome(): void {
    // todo: implement
  }

  shareContact(): void {
    // todo: implement 
  }

  blockUser(): void {
    // todo: implement
  }

  assignAsBLF(): void {
    // todo: implement
  }

  isCurrentUser(currentUser: User, contact: User): boolean {
    return currentUser.userId === contact.userId;
  }

  hasDeletePermission(currentUser: User): boolean {
    return currentUser.isAdmin() ;
  }

  isInactive(contactMethod): boolean {
    return this.state.isInEditMode || !contactMethod.value;
  }

  toggleEditMode() {
    this.setState({ isInEditMode: !this.state.isInEditMode })
  }

  saveContact(contact) {
    this.setState({ 
      contact: {
        ...contact
      }
    })
    delete contact.role;
    this.props.update(contact)
      .then(() => { this.toggleEditMode() })
      .catch((error) => {
        Alert.alert('ERROR','An error occured when trying to update this user')
        console.error(error);
      })
  }

  openDeleteConfirmation() {
    Alert.alert(
      'DELETE USER',
      'Deleting this user will remove their account completely from the application database. Are you sure you wish to do this?',
      [ 
        {text: 'Cancel', onPress: () => {}},
        {text: 'Delete', onPress: () => { this.deleteContact(this.state.contact.userId)}}
      ]
    )
  }

  deleteContact(userId) {
    this.props.deleteUser(userId)
  }

  goBack() {
    this.props.navigator.pop();
  }
}


const styles = StyleSheet.create({

  status: {
    borderStyle: "solid",
    borderColor: "white",
    borderTopWidth: 1,
    borderLeftWidth: 1
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20
  },
  itemTitle: {
    paddingLeft: 12,
    fontSize: 12
  },
  itemText: {
    padding: 10,
    fontSize: 20
  },
  listItemOuter: {
    borderColor: "rgba(151,151,151, 0.31)",
    backgroundColor: "#FFF",
    flexDirection: "row",
    height: Style.UNIT_Y
  },

  listItemTextView: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    flex: 1,
    height: Style.UNIT_Y
  },

  tabs: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(151,151,151,1)"
  },

  topCard: {
    marginBottom: 6  
  },

  deleteButton: {
    backgroundColor: AppConfig.dangerColor
  },

  actionItem: {
    borderTopWidth: 1,
    borderColor: "rgba(151,151,151, 1)",
    alignItems: 'center'
  },
    buttonRow: {
    height: Style.UNIT_Y,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: backgroundColor,
    justifyContent: "space-around",
    alignItems: "center"
  },

  avatar: {
    marginBottom: 1
  }
});

// Define which part of the state we're passing to this component
const mapStateToProps = state => ({
  conversations: state.conversations,
  users: state.users,
  auth: state.auth
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
  loadMsgs,
  createMsg,
  update,
  deleteUser,
  clearRedirect,
  clearUsersError,
  setRefreshRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
