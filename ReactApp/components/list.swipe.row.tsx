/**
 * List Row
 */
'use strict';

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {SwipeRow} from 'react-native-swipe-list-view';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';
import AppConfig from '../config';
import AppUtil from '../util';

import ListRow from './list.row';
import A from './anchor';
import MiText from './text';
import MiTransText from './MiTransText';

const {height, width} = Dimensions.get('window');

interface props {
  leftOpenValue: number,
  rightOpenValue: number,
  disableRightSwipe?: boolean,
  disableLeftSwipe?: boolean,
  leftButtonPress: any,
  rightButtonPressLeft: any,
  rightButtonPressRight: any,
  listRowPress: any,
  color: string,
  profileImage: any,
  icon: any,
  listLeftText?: string,
  listRightIcon?: any,
  listRightText?: string,
  stopLeftSwipe?: number,
  stopRightSwipe?: number,
  listLeftSubText?: string
  swipeRowRef?: any
}

interface state {

}

export default class ListSwipeRow extends Component<props, state> {
  private row
  constructor(props) {
      super(props);
  }

  render(){
      const {
          leftOpenValue,
          rightOpenValue,
          disableRightSwipe,
          disableLeftSwipe,
          leftButtonPress,
          rightButtonPressLeft,
          rightButtonPressRight,
          listRowPress,
          color,
          profileImage,
          icon,
          listLeftText,
          listRightIcon,
          listRightText,
          stopLeftSwipe,
          stopRightSwipe,
          listLeftSubText
      } = this.props;
    return <SwipeRow
            ref={e => this.row = e}
            tension={70}
            friction={13}
            swipeToOpenPercent={25}
            leftOpenValue={leftOpenValue}
            rightOpenValue={rightOpenValue}
            disableLeftSwipe={disableLeftSwipe ? disableLeftSwipe : false}
            disableRightSwipe={disableRightSwipe ? disableRightSwipe : false}
            stopLeftSwipe={stopLeftSwipe}
            stopRightSwipe={stopRightSwipe}
            >
                <View style={[styles.standaloneRowBack]}>
                    <View style={[styles.left]} >
                        <TouchableOpacity
                            style={[styles.button, {flexDirection: 'row', backgroundColor: '#3FAC49'}]}
                            onPress={leftButtonPress}
                        >
                            <MaterialIcons name={'phone'} color={'white'} size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.right]}>
                        <TouchableOpacity
                            onPress={rightButtonPressLeft} //TODO: add button functionalities
                            style={[styles.button, {flexDirection: 'row', backgroundColor: '#00A1E0'}]}>
                            <View style={[styles.unreadBtnShadow]} />
                            
                            <MiTransText color={'white'}>{'Unread'}</MiTransText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={rightButtonPressRight}
                            style={[styles.button, {flexDirection: 'row', backgroundColor: '#ED1C24'}]}>
                            <View style={[styles.deleteBtnShadow]} />
                            <MiTransText color={'white'}>{'Delete'}</MiTransText>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ListRow
                        onClick={() => {
                            this.row.closeRow();
                            listRowPress()
                        }}
                        color={color}
                        imageSrc={profileImage}
                        leftText={listLeftText}
                        leftSubText={listLeftSubText}
                        rightIcon={listRightIcon}
                        rightText={listRightText}
                        leftTextFontSize={Style.getHeight(15)}
                        rightTextFontSize={Style.getHeight(13)}
                        subtextFontSize={Style.getHeight(11)}
                        avatarSize={Style.getWidth(40)} />
                </View>
        </SwipeRow>;
  }


}

const styles = StyleSheet.create({
    standaloneRowBack: {
        height: Style.UNIT_Y,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    left: {
        width: width/4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: Style.UNIT_Y,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width: width/2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    unreadBtnShadow: {
      position: 'absolute', 
      top: 0,
      left: 0, 
      backgroundColor: '#0081B3', 
      width: Style.getWidth(100), 
      height: Style.getHeight(2.5)
    },
    deleteBtnShadow: {
      position: 'absolute', 
      top: 0,
      left: 0, 
      backgroundColor: '#C51D23', 
      width: Style.getWidth(100), 
      height: Style.getHeight(2.5)
    }
});
