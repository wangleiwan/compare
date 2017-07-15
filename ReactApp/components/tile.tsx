import React, { Component } from 'react';
import {
  Animated,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform
} from 'react-native';

// App Globals
import AppStyles, {Style, underlayColor} from '../styles'

// Components
import Close from './close';
import Add from './add';
import Status from './status';
import Avatar from './avatar';
import Blue from './blue';
import A from '../components/anchor';
import MiText from './text';

// Calculated Sizes
const padding = Platform.OS === 'ios' ? Style.PADDING : 0;
const outerWidth = Platform.OS === 'ios' ? Style.getWidth(85) : Style.getWidth(90);
const outerHeight = Platform.OS === 'ios' ? Style.getHeight(100) : Style.getHeight(110);
const innerWidth = Platform.OS === 'ios' ? Style.getWidth(71) : Style.getWidth(69);
const innerHeight = Platform.OS === 'ios' ? Style.getHeight(71) : Style.getHeight(69);
const fontSize = Style.getHeight(12);
const lineHeight = Platform.OS === 'ios' ? Style.getHeight(12) : Style.getHeight(16);
const CIRCLE_SIZE = 80;
const CIRCLE_MARGIN = 18;
const NUM_CIRCLES = 30;

interface props {
  onMove?: any,
  editing?: boolean,
  onLastMove?: any,
  restLayout?: any,
  onDeactivate?: any,
  onActivate?: any,
  addNew?: boolean,
  addFirst?: boolean,
  horzEnd?: boolean,
  vertEnd?: boolean,
  photoUrl?: string,
  name?: string,
  openVal?: Animated.Value,
  dummy?: boolean,
  onLayout?: any,
  onRemove?: any,
  containerLayout?: any,
  id?: string,
  onPress?: any,
  hoveredKey?: any,
  activeKey?: any
}

export default class Tile extends Component<props, any> {
  longTimer: number;

  constructor(props) {
    super();
    this._onLongPress = this._onLongPress.bind(this);
    this._toggleIsActive = this._toggleIsActive.bind(this);
    this.state = {
        isActive: false,
        config: {tension: 40, friction: 3}
    };
    this.state.pan = new Animated.ValueXY(); // Vectors reduce boilerplate.  (step1: uncomment)
    this.state.pop = new Animated.Value(0);
    this.state.hoverPop = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.hoveredKey && !this.props.hoveredKey && nextProps.activeKey === this.props.id) {
          Animated.spring(this.state.pop, {
              toValue: -1,
              ...this.state.config,
          }).start();
          return;
      }
      if (!nextProps.hoveredKey && this.props.hoveredKey && nextProps.activeKey === this.props.id) {
          Animated.spring(this.state.pop, {
              toValue: 1,
              ...this.state.config,
          }).start();
          return;
      }

      if (nextProps.hoveredKey && !this.props.hoveredKey && nextProps.hoveredKey === this.props.id) {
          Animated.spring(this.state.hoverPop, {
              toValue: -1,
              ...this.state.config,
          }).start();
          return;
      }

      if (!nextProps.hoveredKey) {
          Animated.spring(this.state.hoverPop, {
              toValue: 0,
              ...this.state.config,
          }).start();
          return;
      }
  }

  _onLongPress() {
    this.state.pan.addListener((value) => {  // Async listener for state changes  (step1: uncomment)
      this.props.onMove && this.props.onMove(value);
    });
    Animated.spring(this.state.pop, {
      toValue: 1,                  //  Pop to larger size.                      (step2b: uncomment)
      ...this.state.config,                   //  Reuse this.state.config for convenient consistency  (step2b: uncomment)
    }).start();
    const onPanMove = this.props.editing ? Animated.event([
        null,                                         // native event - ignore      (step1: uncomment)
        {dx: this.state.pan.x, dy: this.state.pan.y}, // links pan to gestureState  (step1: uncomment)
      ]) : null;
    this.setState({panResponder: PanResponder.create({
      onPanResponderMove: onPanMove,
      onPanResponderRelease: (e, gestureState) => {
        //LayoutAnimation.easeInEaseOut();  // animates layout update as one batch (step3: uncomment)
        //base on the changes in LayoutAnimation source code, rewrite the calling of function.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        Animated.spring(this.state.pop, {
          toValue: 0,                     // Pop back to 0                       (step2c: uncomment)
          ...this.state.config,
        }).start();
        this.setState({panResponder: undefined});
        this.props.editing && this.props.onLastMove && this.props.onLastMove({
          x: gestureState.dx + this.props.restLayout.x,
          y: gestureState.dy + this.props.restLayout.y,
        });
        this.props.onDeactivate();
      },
    })}, () => {
      this.props.onActivate();
    });
  }

  render() {
    if (this.props.addNew) {
        return this.props.addFirst ? (
          <View style={[styles.fillContainer, {alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', margin: 0}]}>
            <Add addFirst onPress={()=>{this.props.onPress()}} style={{ width: Style.getWidth(177), height: Style.getHeight(309) }}/>
          </View>     
        ) : (
          <View style={[styles.item, {alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', margin: 0}]}>
            {Platform.OS === 'ios' && <Add onPress={()=>{this.props.onPress()}} style={{ width: outerWidth, height: outerHeight }}/>}
            {Platform.OS === 'android' && <Add onPress={()=>{this.props.onPress()}} style={{ width: Style.getWidth(47.5), height: Style.getWidth(47.5), marginRight: Style.getWidth(7) }}/>}
          </View>
        )
    }

    if (this.state.panResponder) {
      var handlers = this.state.panResponder.panHandlers;
      var dragStyle = {                 //  Used to position while dragging
        position: 'absolute',           //  Hoist out of layout                    (step1: uncomment)

        ...this.state.pan.getLayout(),  //  Convenience converter                  (step1: uncomment)
      };
    } else {
      handlers = {
        onStartShouldSetResponder: () => !this.state.isActive,
        onResponderGrant: () => {
          this.state.pan.setValue({x: 0, y: 0});           // reset                (step1: uncomment)
          this.state.pan.setOffset(this.props.restLayout); // offset from onLayout (step1: uncomment)
          this.longTimer = setTimeout(this._onLongPress, 300);
        },
        onResponderRelease: () => {
          if (!this.state.panResponder) {
            clearTimeout(this.longTimer);
            // this._toggleIsActive();
          }
        }
      };
    }

    const animatedStyle = {
      opacity: 1,
      shadowOpacity: this.state.pop,    // no need for interpolation            (step2d: uncomment)
      zIndex: this.state.pop.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 3]         // scale up from 1 to 1.3               (step2d: uncomment)
      }),
      transform: [
        {scale: this.state.pop.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3]         // scale up from 1 to 1.3               (step2d: uncomment)
        })},
      ],
    };
    const animatedStyleAndroid = {
      opacity: 1,
      shadowOpacity: this.state.pop,    // no need for interpolation            (step2d: uncomment)
      elevation: 1,
      transform: [
        {scale: this.state.pop.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.8, 1, 1.3]         // scale up from 1 to 1.3               (step2d: uncomment)
        })},
      ],
    };
    const innerAnimatedStyle = {
      transform: [
        {scale: this.state.hoverPop.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0.5, 1, 1]
        })},
        {translateY: this.state.hoverPop.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-1 * Style.getHeight(50), 0, 0]
        })}
      ],
    }
    const hoverAnimatedStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundColor: 'white',
      opacity: this.state.hoverPop.interpolate({
          inputRange: [-1, 0, 0],
          outputRange: [0.3, 0, 0]         // scale up from 1 to 1.3               (step2d: uncomment)
      })
    }
    const right = this.props.horzEnd ? 0 : padding;
    const bottom = this.props.vertEnd ? 0 : padding;
    const profileImage = this.props.photoUrl ? {uri: this.props.photoUrl}: null;
    const name = this.props.name ? this.props.name.split(' ')[0]: '';
    const openVal = this.props.openVal;

    if (this.props.dummy) {
      animatedStyle.shadowOpacity = 0;
      animatedStyle.opacity = 0;
      animatedStyleAndroid.shadowOpacity = 0;
      animatedStyleAndroid.opacity = 0;
    }

    const itemStyle = Platform.OS === 'android' ? styles.item : styles.itemIos;
    const closeStyle = Platform.OS === 'android' ? styles.close : styles.closeIos;
    const avatarStyle = Platform.OS === 'android' ? styles.avatar : styles.avatarIos;

      return (
        <Animated.View
            onLayout={this.props.onLayout}
            style={[styles.dragView, dragStyle, animatedStyleAndroid,
                {margin: 0, marginRight: right, marginBottom: bottom}]}
            {...handlers}>
            <Animated.View style={[itemStyle, hoverAnimatedStyle]} />
            <Animated.View style={[innerAnimatedStyle]}>

              {Platform.OS === 'android' &&
              <Animated.View style={[itemStyle]}>
                  <Animated.View style={[avatarStyle]}>
                    <Animated.View style={[{width: innerWidth, height: innerHeight, marginBottom: 0, marginLeft: Style.getWidth(7), marginRight: Style.getWidth(7), marginTop: Style.getWidth(7)}]}>
                      <Avatar width={innerWidth} height={innerHeight} imageSrc={profileImage} name={this.props.name || ''} />
                      <Animated.View style={[AppStyles.avatarStatus, styles.status]}>
                          <Status color={'yellow'} />
                      </Animated.View>
                    </Animated.View>
                    <MiText center color={'dark'} style={[styles.itemText, {fontSize: fontSize, lineHeight: lineHeight}]}>{name}</MiText>
                  </Animated.View>
              </Animated.View>}

              {Platform.OS === 'ios' &&
              <Animated.View style={[itemStyle]}>
                  <Animated.View style={[AppStyles.margin, avatarStyle]}>
                      <Avatar width={innerWidth} height={innerHeight} imageSrc={profileImage} name={this.props.name || ''} />
                      <Animated.View style={[AppStyles.avatarStatus, styles.status]}>
                          <Status color={'yellow'} />
                      </Animated.View>
                  </Animated.View>
                  <MiText center color={'dark'} style={[styles.itemTextIos, {fontSize: fontSize, lineHeight: lineHeight}]}>{name}</MiText>
              </Animated.View>}

              {this.props.editing && <View style={[closeStyle]}><Close onPress={()=> this.props.onRemove(this.props.id)} /></View>}

            </Animated.View>
        </Animated.View>
      );
  }
  _toggleIsActive(velocity) {
    const config = {tension: 30, friction: 7};
    if (this.state.isActive) {
      Animated.spring(this.props.openVal, {toValue: 0, ...config}).start(() => { // (step4: uncomment)
        this.setState({isActive: false}, this.props.onDeactivate);
      });                                                                        // (step4: uncomment)
    } else {
      this.props.onActivate();
      this.setState({isActive: true, panResponder: undefined}, () => {
        // this.props.openVal.setValue(1);                                             // (step4: comment)
        Animated.spring(this.props.openVal, {toValue: 1, ...config}).start();    // (step4: uncomment)
      });
    }
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    alignItems: 'center',
    top: 48,
    left: 0,
    right: 0,
    paddingTop: 18,
    height: 90,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: 'black',
    margin: CIRCLE_MARGIN,
    overflow: 'hidden',
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 96,
    backgroundColor: 'transparent',
  },
  dragView: {
    shadowRadius: 10,
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowOffset: {height: 8, width: 0},
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
  },
  open: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: undefined,
    height: undefined,
    borderRadius: 0,
  },
  darkening: {
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: -96, // compensate for paddingTop in container...bug?
  },
  container: {
    flex: 1,
  },
  stream: {
    flex: 1,
    backgroundColor: 'rgb(230, 230, 230)',
  },
  avatar: {
      backgroundColor: '#FFF',
      height: Style.getHeight(97),
      width: Style.getWidth(83),
      //borderWidth: 1,
      //borderColor: 'blue',
      marginTop: Style.getWidth(10)

  },
  avatarIos: {
      marginBottom: 1,
  },
  status: {
      borderStyle: 'solid',
      borderColor: 'white',
      borderTopWidth:1,
      borderLeftWidth:1,
  },
  close: {
      position: 'absolute',
      right: 0,
      top: 0,
  },
  closeIos: {
      position: 'absolute',
      right: -6,
      top: -12,
  },
  item: {
      width: outerWidth,
      height: outerHeight,
      //borderColor: 'red',
      //borderWidth: 1
  },
  itemIos: {
      backgroundColor: '#FFF',
      width: outerWidth,
      height: outerHeight,
  },
  itemText: {
      marginTop: Style.getHeight(1),
  },
  itemTextIos: {
      padding: 2,
  },
  fillContainer: {
    height: Style.getHeight(375),
    width: Style.getWidth(360)
  }
});
