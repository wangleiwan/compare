import React, { View } from 'react-native';
import { expect } from 'chai';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import router, {setRouter, pop, reset, replace, push} from '../../redux/router';

@suite("reducer router")
class RouterTest {

    @test("inital state")
    inital_state() {
      const initialState = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      let state = router();
      expect(state).to.eql(initialState);
    }
    
    @test("state: SET_ROUTER")
    state_2() {
      const state = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      const action = {
        type:'SET_ROUTER',
        router: {
          name: 'router1',
          route: '/path/to/here' 
        }
      }
      let newState = router(state, action);
      expect(newState).to.eql({
        ...state,
        router: action.router,
      });
    }

    @test("state: PUSH")
    state_3() {
      const state = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      const action = {
        type:'PUSH',
        route: '/path/to/here'
      }
      let newState = router(state, action);
      expect(newState).to.eql({
        ...state,
        currentRoute: action.route,
      });
    }

    @test("state: RESET")
    state_4() {
      const state = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      const action = {
        type:'RESET',
        route: '/path/to/here'
      }
      let newState = router(state, action);
      expect(newState).to.eql({
        ...state,
        currentRoute: action.route,
      });
    }

    @test("state: REPLACE")
    state_5() {
      const state = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      const action = {
        type:'REPLACE',
        route: '/path/to/here'
      }
      let newState = router(state, action);
      expect(newState).to.eql({
        ...state,
        currentRoute: action.route,
      });
    }

    @test("state: POP")
    state_6() {
      const state = {
        router: null,
        routes: {},
        currentRoute: {},
      };
      const action = {
        type:'POP',
        route: '/path/to/here',
        payload: {
          data: 'data',
          length: 4
        }
      }
      let newState = router(state, action);
      expect(newState).to.eql({
        ...state,
        data: action.payload,
        currentRoute: action.route,
      });
    }
    
    @test("setRouter")
    test_setRouter() {
      let fn = setRouter({
          name: 'router1',
          route: '/path/to/here' 
        });
    }

    @test("pop")
    test_pop() {
      let fn = pop();
    }

    @test("reset")
    test_reset() {
      const route = '/path/to/here' ;
      let fn = reset(route);
    }

    @test("replace")
    test_replace() {
      const route = '/path/to/here' ;
      let fn = replace(route);
    }

    @test("push")
    test_push() {
      const route = '/path/to/here' ;
      let fn = push(route);
    }
}