import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import auth, {sendVerify, verify, loadProfile, signup, login, loadAuth} from '../../redux/auth';

@suite("reducer auth")
class AuthTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        data: {},
        user: {},
        loading: false,
        error: null,
        init: false,
        resetPassword: {}
      };
      let state = auth();
      expect(state).to.eql(initialState);
    }

    @test("state: REQUEST")
    state_2() {
      const state = {
        data: {},
        user: {},
        loading: false,
        error: null,
        init: false,
        resetPassword: {}
      };
      let newState = auth(state, {type:'REQUEST_AUTH'});
      expect(newState).to.eql({
         ...state,
        loading: true,
        error: null
      });
    }

    @test("state: SIGNUP_SUCCESS")
    state_3() {
      const state = {
        data: {},
        user: {},
        loading: false,
        animating: false,
        request: '',
        error: null,
        init: false,
        resetPassword: {}
      };
      const values = { name: 'A', mobile: '1111111234', email: 'abc@example.com', password: '123' };
      const values2 = { username: 'abc@example', password: '123' };
      const user = JSON.parse(JSON.stringify(values));
      const authInfo = JSON.parse(JSON.stringify(values2));
      const action = {
        user: user,
        authInfo: authInfo,
        type:'SIGNUP_SUCCESS'
      };
      let newState = auth(state, action);
      expect(newState).to.eql({
         ...state,
        newSignup: true,
        user: action.user,
        request: '',
        authInfo: action.authInfo,
        loading: false,
        animating: false,
        error: null
      });
    }

    @test("state: AUTH_SUCCESS")
    state_4() {
      const state = {
        data: {},
        user: {},
        request: '',
        loading: false,
        error: null,
        init: false,
        resetPassword: {}
      };
      const payload = {};
      const action = {
        payload: payload,
        type:'AUTH_SUCCESS'
      };
      let newState = auth(state, action);
      expect(newState).to.eql({
        ...state,
        data: action.payload,
        request: '',
        loading: false,
        animating: false,
        init: true,
        error: null
      });
    }

    @test("state: USER_SUCCESS")
    state_5() {
      const state = {
        data: {},
        user: {},
        request: '',
        loading: false,
        error: null,
        init: false,
        resetPassword: {}
      };
      const payload = { name: 'A', mobile: '1111111234', email: 'abc@example.com'};
      const action = {
        payload: payload,
        type:'USER_SUCCESS'
      };
      let newState = auth(state, action);
      expect(newState).to.eql({
        ...state,
        user: action.payload,
        loading: false,
        animating: false,
        init: true,
        error: null
      });
    }

    @test("state: VERIFY_SUCCESS")
    state_6() {
      const state = {
        data: {},
        user: {},
        request: '',
        loading: false,
        error: null,
        init: false,
        resetPassword: {}
      };
      const values = { name: 'A', mobile: '1111111234', email: 'abc@example.com'};
      const user = JSON.parse(JSON.stringify(values));
      const action = {
        type:'VERIFY_SUCCESS',
        verifyType: 'mobile',
        user: user
      };
      const field = action.verifyType + 'Verified';
      let newState = auth(state, action);
      expect(newState).to.eql({
        ...state,
        [field]: true,
        user: action.user,
        loading: false,
        animating: false,
        error: null
      });
    }

    @test("state: FAILURE")
    state_7() {
      const state = {
        data: {},
        user: {},
        emailManual: false,
        loading: false,
        animating: false,
        error: null,
        init: false,
        request: '',
        resetPassword: {}
      };
      const payload = {};
      const action = {
        type:'FAILURE_AUTH',
        error: 'failure auth'
      };
      let newState = auth(state, action);
      expect(newState).to.eql({
        ...state,
        loading: false,
        init: true,
        error: action.error
      });
    }
    
    @test("sendVerify mobile")
    test_sendVerify_1() {
      const accountId = "12345";
      const userId = "1111";
      const inType = "mobile";

      let fn = sendVerify(accountId,userId,inType);
    }

    @test("sendVerify email")
    test_sendVerify_2() {
      const accountId = "12345";
      const userId = "1111";
      const inType = "";

      let fn = sendVerify(accountId,userId,inType);
    }

    @test("verify mobile")
    test_verify_1() {
      const accountId = "12345";
      const userId = "abc";
      const inType = "mobile";
      const code = "123456";
      
      let fn = verify(accountId,userId,inType,code);
    }

    @test("verify email")
    test_verify_2() {
      const accountId = "12345";
      const userId = "abc";
      const inType = "";
      const code = "123456";

      let fn = verify(accountId,userId,inType,code);
    }

    @test("loadProfile")
    test_loadProfile() {
      let fn = loadProfile();
    }

    @test("signup")
    test_signup() {
      const values = { name: 'A', mobile: '1111111234', email: 'abc@example.com', password: '123' };
      const user = JSON.parse(JSON.stringify(values));
      let fn = signup(user);
    }

    /*@test("login")
    test_login() {
      const values = { username: 'abc@example', password: '123' };
      const user = JSON.parse(JSON.stringify(values));
      let fn = login(user);
    }*/

    @test("loadAuth")
    test_loadAuth() {
      let fn = loadAuth();
    }

}