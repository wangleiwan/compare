import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

// Components
import A from '../components/anchor';
import MiTransText from '../components/MiTransText';

const more = require('../assets/images/navbar/more@2x.png');
const hamburger = require('../assets/images/navbar/hamburger.png');


interface props{
  more?: any;
  pageLabel: string;
  marginBottom?: any;
  drawer?: any;
}

interface state{

}

export default class ActionBar extends Component<props, state> {
  private more;
  private pageLabel;

  constructor(props) {
    super(props);

    this.more = this.props.more;
    this.pageLabel = this.props.pageLabel;
  }

  render() {
    return (
        <View style ={[AppStyles.row, {marginBottom: this.props.marginBottom ? this.props.marginBottom : Style.PADDING, backgroundColor: '#FFF', 
              flexDirection: 'row', alignItems: 'center'}]}>

              <View style={[styles.hamburger]}> 
                {this.props.drawer && <A style={[styles.hamburgerAnchor]} onPress={() => this.props.drawer.openDrawer()}>
                  <Image resizeMode='contain' style={[AppStyles.icon, {width: Style.getHeight(19), height: Style.getHeight(13)}]} source={hamburger} />
                </A>}
              </View>

              <MiTransText 
                type={'baseText'}
                color={'#15325F'} 
                center
                style={[{flex: 1, lineHeight: Style.getHeight(17), fontSize: Style.getHeight(14)}]}>
                {this.pageLabel}
              </MiTransText>

              {this.more && this.more.options && this.more.options.length > 0 && <ModalDropdown
                options={this.more.options}
                dropdownStyle={styles.dropdown}
                adjustFrame={this.more.adjustFrame}
                onSelect={this.more.onSelect}
                onDropdownWillShow={this.more.onDropdownWillShow}
                onDropdownWillHide={this.more.onDropdownWillHide}
                renderRow={this.more.renderRow}>
                <View style={[AppStyles.cornerCard]}>
                    <Image resizeMode='contain' style={AppStyles.icon} source={more} />
                </View>
              </ModalDropdown>}

              {this.more && this.more.options && this.more.options.length === 0 && <View>
                  <A onPress={() => {}} style={[AppStyles.cornerCard]}>
                    <Image resizeMode="contain" style={AppStyles.icon} source={more} />
                </A>
              </View>
              }

              {!this.more && <View style={[AppStyles.cornerCard]}></View>}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    dropdown: {
        width: 200,
        height: 100,
        margin:1,
        borderWidth: 0,
        shadowColor: 'transparent'
    },
    dropdown_row: {
        width: 200,
        alignItems: 'center',
    },
    hamburger: {
        paddingLeft: Style.getWidth(21.5),
        width: Style.getWidth(40.5)
    },
    hamburgerAnchor: {
        height: Style.UNIT_Y, 
        width: Style.UNIT_X, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    }
});
