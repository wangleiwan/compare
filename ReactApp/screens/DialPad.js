import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// App Globals
import AppStyles, {underlayColor, Style} from '../styles';

import { createConv as createConversation } from '../redux/conversations';
import ListRow from '../components/list.row';
import A from '../components/anchor';
import Messenger from './Messenger';
import MiText from '../components/text';
import MiTextInput from '../components/MiTextInput';
import MiTransText from '../components/MiTransText';

const back = require('../assets/images/navbar/backspace@2x.png');
const close = require('../assets/images/navbar/close@2x.png');
const call = require('../assets/images/navbar/call white@2x.png');
const inputHeight = Platform.OS === 'android' ? Style.getHeight(57) : Style.getHeight(54);
const padding = Platform.OS === 'android' ? 0 : Style.PADDING;

export class DialPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
        };
        this.offset = Platform.OS === 'android' ? -Style.getHeight(289) : -Style.getHeight(279)

        this.animatedValue = new Animated.Value(0);

        this._isMounted = false;
        this.renderDialTile = this.renderDialTile.bind(this);
    }

    componentDidMount() {
        this.expand();
    }

    expand(){
        this.animatedValue.setValue(0);

        Animated.timing(
            this.animatedValue,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.linear,
            }
        ).start( () => {} );

    }

    goToConversation(convoTitle, convoId) {
        this.props.navigator.replace({
            pageId: convoId,
            title: convoTitle,
            component: Messenger,
            index: 1
        });
    }

    renderDialTile() {
        const oneMarginLeft = Platform.OS === 'android' ? Style.getWidth(56) : Style.getWidth(49);
        const twoMarginLeft = Platform.OS === 'android' ? Style.getWidth(55.75) : Style.getWidth(48.75);
        const oneMarginRight = Platform.OS === 'android' ? Style.getWidth(10.45) : Style.getWidth(4.95);
        const twoMarginRight = Platform.OS === 'android' ? Style.getWidth(10.7) : Style.getWidth(5.2);

         let keys = [
            {number: '1', letters: [], marginLeft: oneMarginLeft, marginRight: 0, marginTop: Style.getWidth(25.5)},
            {number: '2', letters: ['A', 'B', 'C'], marginLeft: 0, marginRight: 0, marginTop: Style.getWidth(25.5)},
            {number: '3', letters: ['D', 'E', 'F'], marginLeft: 0, marginRight: oneMarginRight, marginTop: Style.getWidth(25.5)},
            {number: '4', letters: ['G', 'H', 'I'], marginLeft: twoMarginLeft, marginRight: 0, marginTop: Style.getWidth(38)},
            {number: '5', letters: ['J', 'K', 'L'], marginLeft: 0, marginRight: 0, marginTop: Style.getWidth(38)},
            {number: '6', letters: ['M', 'N', 'O'], marginLeft: 0, marginRight: twoMarginRight, marginTop: Style.getWidth(38)},
            {number: '7', letters: ['P', 'Q', 'R', 'S'], marginLeft: twoMarginLeft, marginRight: 0, marginTop: Style.getWidth(38.5)},
            {number: '8', letters: ['T', 'U', 'V'], marginLeft: 0, marginRight: 0, marginTop: Style.getWidth(38.5)},
            {number: '9', letters: ['W', 'X', 'Y' , 'Z'], marginLeft: 0, marginRight: twoMarginRight, marginTop: Style.getWidth(38.5)},
            {number: '*', letters: [], marginLeft: twoMarginLeft, marginRight: 0, marginTop: Style.getWidth(37.5)},
            {number: '0', letters: [], marginLeft: 0, marginRight: 0, marginTop: Style.getWidth(37.5)},
            {number: '#', letters: [], marginLeft: 0, marginRight: twoMarginRight, marginTop: Style.getWidth(37.5)}
        ];

        return keys.map(key => {
            return <TouchableOpacity  key={key.number}
                      onPress={() => {this.setState({number: this.state.number + key.number})}}>
                      <View style={[styles.item, {marginLeft: key.marginLeft, marginRight: key.marginRight, marginTop: key.marginTop}]}>
                        <View style={{flexDirection: 'column',
                                      alginItems: 'center',
                                      justifyContent: 'center',
                                      height: Style.getHeight(28.5),
                                      width: Style.getWidth(18.2)}}>
                          <MiTransText
                            color={'#404141'}
                            weight={'light'}
                            type={'h1'}>
                            {key.number}
                          </MiTransText>
                        </View>
                        <View style={{flexDirection: 'row',
                                      alginItems: 'center',
                                      justifyContent: 'center',
                                      width: Style.getWidth(45.5),
                                      height: Style.getHeight(16.5),
                                      marginBottom: Style.getHeight(5),
                                      marginTop: Style.getHeight(7)}}>
                        { this.renderLetters(key) }
                        </View>
                      </View>
                   </TouchableOpacity>
        });
    }

    renderLetters(key) {
        return key.letters.map(letter => {
            return <View style={{height: Style.getHeight(16.5)}}>
                    <MiTransText
                        type={'baseText'}
                        color={'#404141'}
                        weight={'light'}
                        style={{fontSize: Style.getHeight(14)}}>
                        {letter}
                    </MiTransText>
                </View>;
        });
    }

    render() {
        const marginLeft = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300]
        });
        const deleteIconWidth = Platform.OS === 'android' ? Style.getWidth(37.9) : Style.getWidth(36.5);
        const deleteWidth =  Platform.OS === 'android' ? Style.getWidth(67.55) : Style.getWidth(65);
        const closeIconWidth = Platform.OS === 'android' ? Style.getWidth(20.8) : Style.getWidth(20);
        const closeWidth = Platform.OS === 'android' ? Style.getWidth(36.35) : Style.getWidth(35);
        const callIconWidth = Platform.OS === 'android' ? Style.getWidth(20.8) : Style.getWidth(20);

        return (
          <View style={{
              position: 'absolute',
              left: 0,
              top: Platform.OS === 'ios' ? Style.getHeight(18) : 0,
              overflow: 'hidden',
              paddingLeft: padding}}>
            <Animated.View style ={[styles.row,
                {
                opacity:this.animatedValue,
                zIndex:10,
              }
              ]}>
              <View style={[styles.textInputOuter]}>
                <MiTextInput
                    style={{height: inputHeight,
                            width: Platform.OS === 'android' ? Style.getWidth(248.75) : Style.getWidth(239.15),
                            marginLeft:  Platform.OS === 'android' ? Style.getWidth(22.35) : Style.getWidth(21.85),
                            borderWidth: 0}}
                    placeholder={'To:'}
                    onChangeText={(number) => this.setState({number})}
                    value={this.state.number}
                />
              </View>

              <A onPress={()=>{
                    this.setState({
                        number: this.state.number.substring(0,this.state.number.length-1)
                    })
                }}
                style={[styles.corner, {width: deleteWidth}]}>
                  <Image resizeMode='contain' style={{height: Style.getHeight(20), width: deleteIconWidth, marginRight: deleteWidth - deleteIconWidth}} source={back} />
              </A>

              <A onPress={()=>{this.props.closeModal()}}
                 style={[styles.corner, {width: closeWidth}]}>
                <Image resizeMode='contain' style={{height: Style.getHeight(20), width: closeIconWidth, marginRight: closeWidth - closeIconWidth}} source={close} />
              </A>
            </Animated.View>


            <Animated.View style={[{
                zIndex:9,
                opacity: this.animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0,0,1]
                }),
                transform: [{translateY: this.animatedValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [this.offset, this.offset, 0]
                })}]
            }]}>
                <View style={[styles.list]}>
                  {this.renderDialTile()}
                </View>
                <A onPress={()=>{}} style={[styles.callRow, AppStyles.active]}>
                    <Image resizeMode='contain' style={{height: Style.getHeight(20), width: callIconWidth}} source={call} />
                </A>
            </Animated.View>

          </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: inputHeight,
        width: Platform.OS === 'android' ? Style.getWidth(375) : Style.getWidth(375) - 2 * padding,
        backgroundColor: '#FFFFFF',
        marginBottom: 1
    },
    callRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: Style.getHeight(54),
        width: Platform.OS === 'android' ? Style.getWidth(375) : Style.getWidth(375) - 2 * padding,
    },
    corner: {
        justifyContent: 'center',
        alignItems: 'center',
        height: inputHeight,
    },
    list: {
        marginTop: Style.getHeight(0.5),
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: Platform.OS === 'android' ? Style.getHeight(289) : Style.getHeight(279),
        width: Platform.OS === 'android' ? Style.getWidth(375) : Style.getWidth(375) - 2 * padding,
    },
    item: {
        width: Platform.OS === 'android' ? Style.getWidth(102.85) : Style.getWidth(102.35),
        height: Style.getHeight(28.5),
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    itemText: {
        fontSize: Style.getHeight(20),
    },
    textInputOuter: {
        justifyContent: 'center',
        backgroundColor: '#FFF',
        height: inputHeight,
        width: Platform.OS === 'android' ? Style.getWidth(271.1) : Style.getWidth(261),
    },
});

// Define which part of the state we're passing to this component
const mapStateToProps = (state) => ({
  users: state.users
});

// Define the actions this component may dispatch
const mapDispatchToProps = {
    createConversation,
};


export default connect(mapStateToProps, mapDispatchToProps)(DialPad);
