import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import users, {loadUsers, REQUEST, CREATE_GROUP_SUCCESS, LOAD_GROUPS_SUCCESS, LOAD_USERS_SUCCESS, FAILURE} from '../../redux/users';

@suite("reducer users")
class UsersTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        mixed: [],
        users: [],
        mappedUsers: {},
        groups: [],
        mappedGroups: {},
        shouldRedirect: false,
        shouldRefresh: false,
        loading: false,
        error: null,
      };
      let state = users();
      expect(state).to.eql(initialState);
    }

    @test("state: REQUEST")
    state_2() {
      const state = {
        mixed: [],
        users: [],
        mappedUsers: {},
        groups: [],
        shouldRedirect: false,
        shouldRefresh: false,
        mappedGroups: {},
        loading: false,
        error: null,
      };
      const action = {
        type: REQUEST
      }
      let newState = users(state, action);
      expect(newState).to.eql({
        ...state,
        loading: true
      });
    }

    @test("state: LOAD_USERS_SUCCESS")
    state_3() {
      const state = {
        mixed: [],
        users: [],
        mappedUsers: {},
        groups: [],
        shouldRedirect: false,
        shouldRefresh: false,
        mappedGroups: {},
        loading: false,
        request: '',
        error: null,
      };
      const action = {
        type: LOAD_USERS_SUCCESS,
        payload: [{userId: 111}, {userId: 222}, {userId: 333}],
        error: null
      }
      let newState = users(state, action);
      expect(newState).to.eql({
        ...state,
        mixed: action.payload,
        users: action.payload,
        mappedUsers: action.payload.reduce((a,b) => { return a ? { ...a, [b.userId]: b } : {} }, {}),
        loading: false,
        error: action.error
      });
    }

    @test("state: FAILURE")
    state_4() {
      const state = {
        mixed: [],
        users: [],
        mappedUsers: {},
        groups: [],
        mappedGroups: {},
        shouldRefresh: false,
        shouldRedirect: false,
        loading: true,
        error: null,
        request: 'loading'
      };
      const action = {
        type: FAILURE,
        error: null,
        loading: false,
        request: ''
      }
      let newState = users(state, action);
      expect(newState).to.eql({
        ...state,
        loading: false,
        error: action.error,
        request: ''
      });
    }

    @test("loadUsers")
    test_loadUsers() {
      let fn = loadUsers();
    }
}
