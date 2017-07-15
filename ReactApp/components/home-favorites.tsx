'use strict';

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
  AppRegistry,
  Platform,
  Dimensions,
  Modal,
} from 'react-native'
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

const CIRCLE_SIZE = 85;
const CIRCLE_MARGIN = 3;
const NUM_CIRCLES = 16;
const x = Dimensions.get('window').width;

// App Globals
import AppStyles, {Style, underlayColor} from '../styles';

// Components
import Blue from '../components/blue';
import Tile from '../components/tile';
import MiTransText from '../components/MiTransText';
import A from '../components/anchor';
import Overlay from '../components/Overlay';
import MiTextInput from '../components/MiTextInput';

// Redux
/*
interface props {
    order: Array<any>,
    favorites: any,
    editing: boolean,
    pushToTalk: any,
    onAddNew: any,
    endPushToTalk: any,
    modify: any,
    createGroup?: any,
}*/

export class HomeFavorites extends Component<any,any> {

    constructor(props) {
        super(props);
        this.state = {
            hoveredKey: null,
            keys: this.props.order,
            restLayouts: [],
            openVal: new Animated.Value(0),
            groupModal: false,
            members: [],
            groupName: ''
        }

        this.moveToClosest = this.moveToClosest.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onLastMove = this.onLastMove.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.createGroupModal = this.createGroupModal.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.addGroupTile = this.addGroupTile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order && nextProps.order.length !== this.state.keys.length) {
            this.setState({keys: nextProps.order});
        }
    }

    createGroupModal() {
        let groupName = '';
        if (this.state.hoveredKey &&
            this.state.hoveredKey in this.props.favorites &&
            this.props.favorites[this.state.hoveredKey].groupId) {
            groupName = this.props.favorites[this.state.hoveredKey].name;
        }
        this.setState({groupModal: true, groupName});
    }

    createGroup(replace) {
        // if the hovered key is a group then add member to the group
        if (this.state.hoveredKey &&
            this.state.hoveredKey in this.props.favorites &&
            this.props.favorites[this.state.hoveredKey].groupId) {
            const activeKey = this.state.members.filter(b => b.userId !== this.state.hoveredKey);
            this.props.addMemberToGroup(this.state.hoveredKey, activeKey[0].userId).then(group => {
                this.updateGroupTile(activeKey[0].userId, replace);
            })
            return
        }
        this.props.createGroup(this.state.groupName, this.state.members).then(group => {
            this.addGroupTile(this.state.hoveredKey, group, replace);
        })
    }

    renderDot() {
        return <View style={[styles.dot]} />
    }

    renderActiveDot() {
        return <View style={[styles.dot, styles.activeDot]} />
    }

    renderTitle() {
        return <MiTextInput
            style={{height: Style.getHeight(40), width: Style.getWidth(150), borderWidth: 0,
            paddingVertical: 0, textAlign: 'center'}}
            placeholder={'Create a group'}
            onChangeText={(groupName) => this.setState({groupName})}
            value={this.state.groupName}
        />
    }

    renderGroupModal() {
      const members = this.state.members.map(member => {
        const id = member.userId || member.groupId;
        return (<Tile
            key={id}
            id={id}
            name={this.props.favorites[id].name}
            photoUrl={this.props.favorites[id].photoUrl}
        />);
      })
        return <Overlay>
          <View style={[{height: Style.getHeight(357),
                         marginLeft: Style.PADDING, marginRight: Style.PADDING,
                         marginTop: Platform.OS === 'android' ? (Dimensions.get('window').height - Style.getHeight(357))/2 : 0}]}>
              <View style={[{
                height: Style.getHeight(192),
                backgroundColor: '#F5F5F6',
                alignItems: 'center',
                justifyContent: 'center',
                padding: Style.getHeight(25)}]}>

                <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
                  {this.renderTitle()}
                </View>
                <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Style.getHeight(25)}]}>
                  {members}
                </View>
              </View>
              <A onPress={()=>this.createGroup(false)} style={[styles.listItemOuter]}>
                <View style={[styles.listItemTextView]}>
                  <MiTransText center color={'dark'}>{'Duplicate contacts to group'}</MiTransText>
                </View>
              </A>
              <A onPress={()=>this.createGroup(true)} style={[styles.listItemOuter]}>
                <View style={[styles.listItemTextView]}>
                  <MiTransText center color={'dark'}>{'Move contacts to group'}</MiTransText>
                </View>
              </A>
              <A onPress={() => this.setState({keys: this.state.prev, groupModal: false, hoveredKey: null})} style={[styles.listItemOuter]}>
                <View style={[styles.listItemTextView]}>
                  <MiTransText center color={'red'}>{'Cancel'}</MiTransText>
                </View>
              </A>
           </View>
       </Overlay>
    }

    render() {
      return (
          this.renderFavorites()
      )
    }

    renderFavorites() {
        let i = 0;
        var circles = this.state.keys.map((key, idx) => {
          i = idx;
          const horzEnd = (idx+1) % 4 === 0 ? true : false;
          const vertEnd = (idx+1) > 10 && idx < 17 ? true : false;
          const fav = this.props.favorites[key];
          if (!fav) return;

          if (key === this.state.activeKey) {
            return <Tile key={key + 'd'} horzEnd={horzEnd} vertEnd={vertEnd} dummy={true} />;
          } else {
            if (!this.state.restLayouts[idx]) {
              var onLayout = function(index, e) {
                var layout = e.nativeEvent.layout;
                this.setState((state) => {
                  state.restLayouts[index] = layout;
                  return state;
                });
              }.bind(this, idx);
            }
            return (
              <Tile
                key={key}
                id={key}
                horzEnd={horzEnd}
                vertEnd={vertEnd}
                hoveredKey={this.state.hoveredKey}
                name={fav.name}
                photoUrl={fav.photoUrl}
                editing={this.props.editing}
                onRemove={this.onRemove}
                onLayout={onLayout}
                restLayout={this.state.restLayouts[idx]}
                onActivate={() => {
                    this.setState({
                      activeKey: key,
                      pushToTalk: this.props.editing ? false : true,
                      activeInitialLayout: this.state.restLayouts[idx],
                    })
                    if (!this.props.editing) {
                        this.props.pushToTalk(key);
                    }
                }}
              />
            );
          }
        });

        if (this.props.editing) {
            i++;
            const horzEnd = i % 4 === 0 ? true : false;
            const vertEnd = i > 10 && i < 17 ? true : false;
            circles.push(<Tile addNew onPress={this.props.onAddNew} horzEnd={horzEnd} vertEnd={vertEnd} key={i} />)
        }

        if (this.state.activeKey) {
          circles.push(
            <Animated.View key="dark" style={[styles.darkening, {opacity: this.state.openVal}]} />
          );
          circles.push(
            <Tile
              key={this.state.activeKey}
              id={this.state.activeKey}
              activeKey={this.state.activeKey}
              hoveredKey={this.state.hoveredKey}
              name={this.props.favorites[this.state.activeKey].name}
              photoUrl={this.props.favorites[this.state.activeKey].photoUrl}
              restLayout={this.state.activeInitialLayout}
              containerLayout={this.state.layout}
              editing={this.props.editing}
              onMove={this.onMove}
              onLastMove={this.onLastMove}
              onDeactivate={() => {
                this.setState({activeKey: undefined, pushToTalk: undefined});
                if (!this.props.editing) {
                    this.props.endPushToTalk();
                }
              }}
            />
          );
        }
        
        const margin = Platform.OS === 'android' ? {marginLeft: Style.getWidth(7), marginRight: Style.getWidth(7)} : {};
        
        return (
            <View style={[{flex: 1}, margin]}>

                <View
                    style={[styles.list]}
                    onLayout={(e) => this.setState({layout: e.nativeEvent.layout})}>
                        {circles}
                </View>

                {Platform.OS === 'android' && this.state.groupModal && <View style={[styles.overlayContainer,{
                  backgroundColor: 'rgba(0,0,0,0.5)'}]}>
                    {this.state.groupModal && this.renderGroupModal()}
                </View>}

                {Platform.OS === 'ios' && this.state.groupModal && <View style={[styles.overlayContainer,{
                  zIndex: 99}]}>
                    {this.state.groupModal && this.renderGroupModal()}
                </View>}
            </View>
        );
    }

    debounce = (func, wait, immediate) => {
        var timeout;
        return function(value) {
            var later = function() {
                timeout = null;
                if (!immediate) func(value);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(value);
        };
    }

    onMove = this.debounce((position) => {
        const {keys, hoveredKey} = this.moveToClosest(this.state, position);
        if (keys !== this.state.keys) {
          //LayoutAnimation.easeInEaseOut();
          //base on the changes in LayoutAnimation source code, rewrite the calling of function.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({keys, hoveredKey});
        }
    }, 20, true)

    onLastMove(position) {
        const {keys, hoveredKey} = this.moveToClosest(this.state, position);
        if (hoveredKey) {
          this.setState({keys, prev: this.props.order, members: [{userId: this.state.activeKey}, {userId: hoveredKey}]});
          this.createGroupModal()
          return;
        }
        if (keys !== this.state.keys) {
          //LayoutAnimation.easeInEaseOut();
          //base on the changes in LayoutAnimation source code, rewrite the calling of function.
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({keys, hoveredKey: null});
        }
        this.props.modify({order: keys})
    }

    addGroupTile(key, group, replace) {
        let keys = JSON.parse(JSON.stringify(this.state.keys));
        const index = keys.indexOf(key);
        if (index !== -1 && replace) {
            keys.splice(index, 1, group.groupId);
        } else {
            keys = keys.concat([group.groupId]);
        }

        if (keys !== this.state.keys) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({keys, groupModal: false, hoveredKey: null});
        }
        this.props.modify({order: keys})
    }

    updateGroupTile(key, replace) {
        let keys = JSON.parse(JSON.stringify(this.state.keys));
        const index = keys.indexOf(key);
        if (index !== -1 && replace) {
            keys.splice(index, 1);
        }

        if (keys !== this.state.keys) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({keys, groupModal: false, hoveredKey: null});
        }
        this.props.modify({order: keys})
    }

    onRemove(userId) {
        const newOrder = this.state.keys.filter((key) => { return key !== userId})
        //LayoutAnimation.easeInEaseOut();
        //base on the changes in LayoutAnimation source code, rewrite the calling of function.
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({keys: newOrder});
        this.props.modify({
            order: newOrder
        });
    }

    moveToClosest({activeKey, keys, restLayouts}, position) {
      var activeIdx = -1;
      var closestIdx = activeIdx;
      var minDist = Infinity;
      var newKeys = [];
      const activeKeyIsGroup = this.props.favorites[activeKey].groupId ? true : false;
      keys.forEach((key, idx) => {
        var dist = distance(position, restLayouts[idx]);
        if (key === activeKey) {
          idx = activeIdx;
        } else {
          newKeys.push(key);
        }
        if (dist < minDist) {
          minDist = dist;
          closestIdx = idx;
        }
      });
      if (closestIdx === activeIdx) {
        return {keys, hoveredKey: null}; // nothing changed
      } else {
        let hoveredKey = null;
        if (!activeKeyIsGroup && minDist < 1400) {
            hoveredKey = newKeys[closestIdx];
        } else {
            newKeys.splice(closestIdx, 0, activeKey);
        }
        return {keys: newKeys, hoveredKey};
      }
    }
}

function distance(p1, p2) {
  var dx = p1.x - p2.x;
  var dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}

const mapStateToProps = (state) => ({
  //favorites: state.favorites
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFavorites);

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        alignItems: 'center',
        top: 48,
        left: 0,
        right: 0,
    },
    dragView: {
        shadowRadius: 10,
        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: {height: 8, width: 0},
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
    },
    darkening: {
        backgroundColor: 'black',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: -96, // compensate for paddingTop in container...bug?
    },
    list: {
        paddingTop: Platform.OS === 'ios' ? Style.PADDING*2 : 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
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
    listItemOuter: {
        borderColor: 'rgba(151,151,151, 0.31)',
        backgroundColor: '#F5F5F6',
        flexDirection: 'row',
        height: Style.UNIT_Y,
        flex: 1,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    overlayContainer: {
      position: 'absolute',
      top: -2 * Style.UNIT_Y - Style.PADDING,
      bottom: 0,
      left: - Style.PADDING,
      right: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    }
});
