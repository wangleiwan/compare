import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import favorites, {modify, toggle, load, save} from '../../redux/favorites';

@suite("reducer favorites")
class FavoritesTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        order: [],
        editing: false,
        contactModal: false,
        groupModal: false,
        inited: false,
        error: null,
      };
      let state = favorites();
      expect(state).to.eql(initialState);
    }

    @test("state: TOGGLE")
    state_2() {
      const state = {
        order: [],
        editing: true,
        contactModal: false,
        groupModal: false,
        inited: false,
        error: null,
      };
      let newState = favorites(state, {type:'TOGGLE_EDITING_FAVS'});
      expect(newState).to.eql({
        ...state,
        editing: !state.editing
      });
    }

    @test("state: MODIFY")
    state_3() {
      const state = {
        order: [],
        editing: true,
        contactModal: false,
        groupModal: false,
        inited: false,
        error: null,
      };
      const action = {
        payload: {
          body: '123',
          length: 3
        },
        type:'MODIFY_FAVS'
      }
      let newState = favorites(state, action);
      expect(newState).to.eql({
        ...state,
        ...action.payload,
      });
    }

    @test("state: SUCCESS")
    state_4() {
      const state = {
        order: [],
        editing: false,
        contactModal: false,
        groupModal: false,
        inited: false,
        error: null,
      };
      const action = {
        payload: {
          order: 1,
          inited: true
        },
        type:'SUCCESS_FAVS',
        error: null
      }
      let newState = favorites(state, action);
      expect(newState).to.eql({
         ...state,
        order: action.payload.order,
        inited: action.payload.inited,
        editing: false,
        error: action.error
      });
    }

    @test("state: FAILURE")
    state_5() {
      const state = {
        order: [],
        editing: false,
        contactModal: false,
        groupModal: false,
        inited: false,
        error: null,
      };
      const action = {
        type:'FAILURE_FAVS',
        error: 'failure'
      };
      let newState = favorites(state, action);
      expect(newState).to.eql({
        ...state,
        editing: false,
        error: action.error
      });
    }

    @test("modify")
    test_modify() {
      const values = { username: '123', order: 1};
      let fn = modify(values);
    }

    @test("toggle")
    test_toggle() {
      let fn = toggle();
    }

    @test("load")
    test_load() {
      let fn = load();
    }

    @test("save")
    test_save() {
      const values = { username: '123', order: 1};
      let fn = save(values);
    }
}
