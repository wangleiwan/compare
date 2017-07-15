// core libraries
import React, { Component } from "react";
import { Alert, View, ScrollView, TextInput, StyleSheet, Image, Platform, TouchableOpacity } from "react-native";

//localization
import I18n from 'react-native-i18n';

// third party libraries
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalDropdown from 'react-native-modal-dropdown';

// our components 
import MiText from "./text";
import Button from "./button";
import A from './anchor';
import Avatar from './avatar';
import MiTransText from './MiTransText';
import Remove from './remove';
import MiTextInput from './MiTextInput';
import LoadingModal from './loadingModal';

import { Shape } from "../enums/shape";
import AppStyles, { Style, backgroundColor } from "../styles";
import AppConfig from '../config';
import AppUtil from '../util';

// image assets
const add = require("../assets/images/navbar/add@2x.png");
const back = require("../assets/images/navbar/back@2x.png");
const more = require("../assets/images/navbar/more@2x.png");
const call = require("../assets/images/navbar/call-light@2x.png");
const video = require("../assets/images/video_small_medium@2x.png");
const chat = require("../assets/images/navbar/chat-light@2x.png");

interface props {
  contact: any;
  navigator: any;
  isNewContact: boolean;
  toggleEditMode: any;
  renderContactOptionsButtons: any;
  saveContact: any;
  auth: any;
}

/* 
  phoneFields and emailFields are used to determine which inputs to display
  phoneOptions is the list of possible phone types
*/ 
interface state {
  contact: any;
  phoneOptions: string[];
  emailOptions: string[];
  phoneFields: string[];
  emailFields: string[];
  errors: any;
}

export class ContactForm extends Component<props, any> {

  constructor(props) {
    super(props)

    this.state = {
      contact: {
        ...props.contact
      },
      phoneOptions: ['home', 'work', 'mobile'],
      extensionOptions: ['extension'],
      emailOptions: ['email'],
      phoneFields: [],
      emailFields: [],
      extensionFields: [],
      errors: {}
    }

    this.addContactField = this.addContactField.bind(this);
    this.removeContactMethod = this.removeContactMethod.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.validateAndUpdateField = this.validateAndUpdateField.bind(this);
    this.renderFormRow = this.renderFormRow.bind(this);
    this.renderDropdownRow = this.renderDropdownRow.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderPhoneSelector = this.renderPhoneSelector.bind(this);
    this.hasContactType = this.hasContactType.bind(this);
  }

  componentWillMount() {
    this.initializeContactFields('phoneFields', this.state.phoneOptions.filter(this.hasContactType));
    this.initializeContactFields('emailFields', this.state.emailOptions.filter(this.hasContactType));
    this.initializeContactFields('extensionFields', this.state.extensionOptions.filter(this.hasContactType));
  }

  render() {
    return (
      <KeyboardAwareScrollView ref="scroll" style={{ flex: 1, padding: 10 }}>
        <LoadingModal request={this.props.auth.request} visible={this.props.auth.loading}/>
        {this.renderContactOptionsCard(this.state.contact, this.props.isNewContact)}
        {this.renderMainForm()}
        {this.renderSaveButton(this.state.contact)}
      </KeyboardAwareScrollView>
    )
  }

  renderContactOptionsCard(contact, isNewContact) {
    const contactOptions = [
      { title: "mobile", icon: call, onPress: () => {}},
      { title: "work", icon: call, onPress: () => {} },
      { title: "video", icon: video, onPress: () => {} },
      { title: "chat", icon: chat, onPress: () => {} }
    ];

    const profileImage = contact.photoUrl ? { uri: contact.photoUrl } : null;

    return (
      <View style={ styles.topCard }>
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
              isNewContact={isNewContact}
            />
          </View>
          {this.renderNameDisplay(contact)}
        </View>

      <View style={[AppStyles.row, styles.buttonRow]}>
        {this.props.renderContactOptionsButtons(contactOptions)}
      </View>
    </View>
    )
  }

  renderMainForm() {
    return (
      <View>
        {this.renderContactMethods('phoneFields')}
        {this.renderContactMethods('extensionFields')}
        {this.renderPhoneSelectionRow()}
        {this.renderContactMethods('emailFields')}
        {this.renderEmailSelectionRow()}
      </View>
    )
  }

  renderSaveButton(contact) {
    return (
      <A
        key={"save-button"}
        onPress={() => { return this.saveContact(contact)}}
        style={[styles.listItemOuter, AppStyles.card, styles.actionItem]}
      >
        <View style={[styles.listItemTextView, styles.saveButton, { alignItems: "center"}]}>
          <MiTransText color={"dark"}>{"Save"}</MiTransText>
        </View>
      </A>
    )
  }

  renderPhoneSelectionRow() {
    return (
      <View style={[AppStyles.row, { flex: 1, width: Style.getWidth(355), backgroundColor: AppConfig.accentColor}]}>
        {this.renderPhoneSelector()}
        {this.renderExtensionSelector()}
      </View>
    )
  }

  renderEmailSelectionRow() {
    return (
      <View style={[AppStyles.row, { flex: 1, width: Style.getWidth(355), backgroundColor: AppConfig.accentColor }]}>
        {
          this.renderButton({
            text: 'AddEmail',
            onPress: () => { this.addContactField('emailFields', 'email')}, 
            isEnabled: !this.hasSelectedAllOptions(this.state.emailFields, this.state.emailOptions), 
            fullWidth: true
          })
        }
      </View>
    )
  }

  renderExtensionSelector() {
    return (
      this.renderButton({
        text: 'AddExtension',
        onPress: () => { this.addContactField('extensionFields', 'extension')}, 
        isEnabled: !this.hasSelectedAllOptions(this.state.extensionFields, this.state.extensionOptions)
      })
    )
  }

  renderPhoneSelector() {
    return this.hasSelectedAllOptions(this.state.phoneFields, this.state.phoneOptions) ? (
      this.renderButton({
        text: 'AddPhone',
        onPress: () => {},
        isEnabled: false,
        hasRightBorder: true
      })
    ) : (
      <ModalDropdown
        options={this.state.phoneOptions.filter((option) => { return !this.state.phoneFields.includes(option) })}
        dropdownStyle={styles.dropdown}
        renderRow={this.renderDropdownRow}
        ref="phone-modal-dropdown"
      >
        {
          this.renderButton({
            text: 'AddPhone', 
            onPress: () => {
              const dropdown: any = this.refs["phone-modal-dropdown"];
              dropdown.show()
            },
            isEnabled: true,
            hasRightBorder: true
          })
        }
      </ModalDropdown>
    )
  }

  renderDropdownRow(rowData, rowID, highlighted) {
    return (
      <View>
        <A onPress={() => {
          this.addContactField('phoneFields', rowData)
          const dropdown: any = this.refs["phone-modal-dropdown"];
          dropdown.hide();
        }}>
          <View style={[AppStyles.row,styles.dropdown_row]}>
            <MiTransText style={[styles.dropdown_row_text, highlighted && {color: 'mediumaquamarine'}]}>
              {rowData}
            </MiTransText>
          </View>
        </A>
      </View>
    );
  }

  renderTopRightButton() {
    return (
      <A onPress={() => { this.saveContact(this.state.contact) }} style={[AppStyles.cornerCard]}>
        <View style={[{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center'}]}>
          <MiTransText center color={"dark"}>{'Save'}</MiTransText>
        </View>
      </A>
    )
  }

  renderNameDisplay(contact: any) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <MiTextInput
          style={[AppStyles.baseText, AppStyles.textbox, styles.itemText, { textAlign: 'center' }]}
          onChangeText={(name) => {
            this.setState({
              contact: {
                ...this.state.contact,
                name: name
              }
            })
          }}
          value={this.state.contact.name}
          placeholder={I18n.t('EnterName')}
          placeholderTextColor='black'
          selectionColor={AppConfig.secondaryColor}
          ref='contactName'
        />
      </View>
    )
  }

  renderContactMethods(fieldType: string) {
    return this.state[fieldType].map((contactType) => { return this.renderFormRow('keyboard-arrow-down', fieldType, contactType, this.state.contact[contactType])})
  }

  renderFormRow(icon, fieldType, contactType, value) {
    return (
      <View key={contactType} style={[AppStyles.row, styles.editableRow, { justifyContent: 'center', alignItems: 'center'}]}>

        <View style={[AppStyles.row, styles.leftSection]}>
          <MaterialIcons name={icon} size={15} color={'black'} style={{ marginRight: 5 }}/>
          <MiTransText color={'dark'} style={{ margin: 10 }}>{contactType}</MiTransText>
          <MiTextInput
            style={[AppStyles.baseText, AppStyles.textbox, styles.contactFormInput, { textAlign: 'left' }]}
            onChangeText={(value) => {
              this.validateAndUpdateField(contactType, value)
            }}
            value={value}
            placeholder={I18n.t('Enter')}
            placeholderTextColor='gray'
            selectionColor={AppConfig.secondaryColor}
            ref={contactType}
          />
        </View>
        <View style={[AppStyles.row, styles.rightSection]}>
          <Remove onPress={() => { this.removeContactMethod(fieldType, contactType) }}/>
        </View>
      </View>
    )
  }

  renderButton(buttonConfig) {
    return (
      <Button
        buttonStyle={[styles.addButton, { borderRightWidth: buttonConfig.hasRightBorder ? 1 : 0 }]}
        textStyle={styles.buttonText}
        icon={add}
        iconSize={15}
        type={"custom"}
        text={buttonConfig.text}
        size={"medium"}
        onPress={buttonConfig.onPress}
        disabled={!buttonConfig.isEnabled}
        fullWidth={buttonConfig.fullWidth}
        halfWidth={!buttonConfig.fullWidth}
      />
    )
  }

  saveContact(contact) {
    if (this.isFormValid()) {
      this.props.saveContact(contact);
    } else {
      this.handleErrors();
    }
  }
  
  validateAndUpdateField(key, newValue) {
    this.setState({ 
      contact: {
        ...this.state.contact,
        [key]: newValue
      },
      errors: {
        ...this.state.errors,
        [key]: !this.isValid(key, newValue)
      }
    });
  }

  hasContactType(type: string): boolean {
    return !!this.state.contact[type];
  }

  initializeContactFields(fieldType: string, fields: string[]) {
    this.setState({
      [fieldType]: fields
    })
  }

  addContactField(fieldType: string, contactType: string) {
    this.setState({ 
      [fieldType]: this.state[fieldType].includes(contactType) ? this.state[fieldType] : [...this.state[fieldType], contactType]
    });
  }

  removeContactMethod(fieldType: string, contactType: string) {
    let contact = { ...this.state.contact };
    let errors = { ...this.state.errors };
    delete contact[contactType];
    delete errors[contactType];

    this.setState({
      contact: contact,
      errors: errors,
      [fieldType]: this.state[fieldType].filter((field: string) => { return field !== contactType })
    })
  }

  isFormValid(): boolean {
    let isValid: boolean = true;
    Object.keys(this.state.errors).forEach((field) => {
      if (this.state.errors[field]) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleErrors() {
    // todo: update with approrpiate error handling after establishing requirements for phone & name validation
    Alert.alert(
      'Please correct the following errors:',
      Object.keys(this.state.errors)
        .map((field) => { return this.getErrorMessage(field); })
        .reduce((errorMessages, message) => { return errorMessages + (message + '.\n') }, '')
    )
  }

  getErrorMessage(field): string {
    if (field === 'email' && this.state.errors['email']) {
      return 'You have entered an invalid email';
    } else if (field === 'mobile' && this.state.errors['mobile']) {
      return 'You have entered an invalid mobile number'
    } else if (field === 'work' && this.state.errors['work']) {
      return 'You have entered an invalid work number'
    } else if (field === 'home' && this.state.errors['home']) {
      return 'You have entered an invalid home number'
    } else if (field === 'extension' && this.state.errors['extension']) {
      return 'You have entered an invalid extension'
    } else {
      return 'Unknown error';
    } 
  }

  isValid(field, value): boolean {
    switch (field) {
      case 'email':
        return AppUtil.validateEmail(value)
      case 'mobile':
        return AppUtil.validatePhone(value)
      case 'work':
        return AppUtil.validatePhone(value)
      case 'home':
        return AppUtil.validatePhone(value)
      case 'extension':
        return AppUtil.validatePhone(value)
      default:
        console.error('No validation available for this field.');
        return true;
    }
  }

  hasSelectedAllOptions(contactFields, contactOptions): boolean {
    return contactFields && contactFields.length === contactOptions.length;
  }

}

const styles = StyleSheet.create({

  content: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20
  },

  itemText: {
    padding: 10,
    fontSize: 20
  },

  topCard: {
    marginBottom: 6  
  },

  listItemOuter: {
    borderColor: "rgba(151,151,151, 0.31)",
    backgroundColor: "#FFF",
    flexDirection: "row",
    height: Style.UNIT_Y
  },

  saveButton: {
    backgroundColor: AppConfig.callToActionColor
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
  },

  editableRow: {
    backgroundColor: AppConfig.accentColor,
    height: Style.UNIT_Y,
    width: Style.getWidth(355)
  },

  leftSection: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    width: Style.getWidth(250)
  },

  rightSection: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 15,
    width: Style.getWidth(105)
  },

  dropdown_row_text: {
    marginHorizontal: 4,
    fontSize: 14,
    color: 'navy',
    textAlignVertical: 'center',
  },

  dropdown: {
    width: Style.getWidth(200),
    height: Style.getHeight(200),
    margin:1,
    borderWidth: 1,
    shadowColor: 'transparent'
  },

  dropdown_row: {
    width: Style.getWidth(200),
    alignItems: 'center',
    justifyContent: 'center'
  },

  contactFormInput: {
    color: AppConfig.secondaryColor
  },

  listItemTextView: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    flex: 1,
    height: Style.UNIT_Y
  },

  addButton: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },

  buttonText: {
    color: AppConfig.primaryColor
  }
});

export default ContactForm;
