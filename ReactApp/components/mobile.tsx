import React, { Component } from 'react';

import {reduce, first, tail} from 'lodash';

// import countryData from './country_data';
// const allCountriesObject = countryData.allCountriesObject;

import {
  View,
  Text,
  TextInput
} from 'react-native';

import MiTextInput from './MiTextInput';

interface props {
  wrapperStyle?: any,
  countryStyle?: any,
  textStyle?: any,
}

interface state {
  iso_code?: string,
  best_choice?: string,
  index?: number,
  formattedNumber?: string
}

export default class TelephoneInput extends Component<props, state> {
  static propTypes = {
    wrapperStyle: View.propTypes.style,
    countryStyle: Text.propTypes.style,
    textStyle: TextInput.propTypes.style,
  }

  constructor(props) {
    super(props);
    this.state = {
      iso_code: '',
      best_choice: '',
      index: 0,
    };
  }

  getCountryName(phoneNumber) {
    return 'CA';// this.guessSelectedCountry(phoneNumber);
  }

  formatNumber(text, pattern) {
    if (!text || text.length === 0) {
      return '+';
    }

        // for all strings with length less than 3, just return it (1, 2 etc.)
        // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern) {
      return `+${text}`;
    }

    const formattedObject = reduce(pattern, (acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText,
        };
      }

      return {
        formattedText: acc.formattedText + first(acc.remainingText),
        remainingText: tail(acc.remainingText),
      };
    }, { formattedText: '', remainingText: text.split('') });
    return formattedObject.formattedText + formattedObject.remainingText.join('');
  }

  guessSelectedCountry(phoneNumber) {
    // for (let i = 0; i < allCountriesObject.length; i++) {
    //   if (allCountriesObject[i].dialCode === phoneNumber) {
    //     const isoCcode = allCountriesObject[i].iso2.toUpperCase();
    //     this.setState({ best_choice: isoCcode, index: i });
    //     break;
    //   } else {
    //     if (phoneNumber.length < 4) {
    //       this.setState({ iso_code: '', formattedNumber: phoneNumber });
    //     } else {
    //       const formattedNumber = this.formatNumber(phoneNumber.replace(/\D/g, ''),
    //                                                 allCountriesObject[this.state.index].format);
    //       this.setState({
    //         iso_code: this.state.best_choice,
    //         formattedNumber,
    //       });
    //     }
    //   }
    // }
  }

  render() {
    return (
      <View style={[{ flex: 1, flexDirection: 'row' }, this.props.wrapperStyle]}>
        <Text style={[{ flex: 0.1 }, this.props.countryStyle]} >{this.state.iso_code}</Text>
        <MiTextInput
          style={[{ flex: 0.9, }, this.props.textStyle]}
          value={this.state.formattedNumber}
          onChange={(event) => {this.getCountryName(event.nativeEvent.text)}}
          {...this.props}
        />
      </View>
    );
  }
}
