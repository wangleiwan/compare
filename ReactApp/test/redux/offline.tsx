import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import offline, {playRequest} from '../../redux/offline';

import {without} from 'lodash';

@suite("reducer offline")
class OfflineTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        actionQueue: [],
        isConnected: false,
      };
      let state = offline();
      expect(state).to.eql(initialState);
    }

    @test("state: CHANGE_CONNECTION_STATUS")
    state_2() {
      const state = {
        actionQueue: [],
        isConnected: false,
      };
      const action = {
        type:'CHANGE_CONNECTION_STATUS',
        isConnected: true,
      }
      let newState = offline(state, action);
      expect(newState).to.eql(Object.assign({}, state, {
        isConnected: action.isConnected,
      }));
    }

    @test("state: ADD_TO_ACTION_QUEUE")
    state_3() {
      const state = {
        actionQueue: [],
        isConnected: false,
      };
      const action = {
        type:'ADD_TO_ACTION_QUEUE',
        isConnected: true,
        request: {}
      }
      let newState = offline(state, action);
      expect(newState).to.eql(Object.assign({}, state, {
        actionQueue: state.actionQueue.concat([action.request]),
      }));
    }

    @test("state: REMOVE_FROM_ACTION_QUEUE")
    state_4() {
      const state = {
        actionQueue: [],
        isConnected: false,
      };
      const action = {
        type:'REMOVE_FROM_ACTION_QUEUE',
        isConnected: true,
        request: {}
      }
      let newState = offline(state, action);
      expect(newState).to.eql(Object.assign({}, state, {
        actionQueue: without(state.actionQueue, action.request),
      }));
    }
    
    @test("playRequest")
    test_playRequest() {
      const req = {
        url: '',
        options: {},
        successFunc: () => {return 'success';},
        errorFunc: () => {return 'error';},
      };

      let fn = playRequest(req);
    }
}