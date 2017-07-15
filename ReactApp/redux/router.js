'use strict';

// Set initial state
const initialState = {
  router: null,
  routes: {},
  currentRoute: {},
}

const SET_ROUTER = 'SET_ROUTER';

export const PUSH = 'PUSH';
export const RESET = 'RESET';
export const POP = 'POP';
export const REPLACE = 'REPLACE';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ROUTER:
      return {
        ...state,
        router: action.router,
      }
    case PUSH:
      return {
        ...state,
        currentRoute: action.route,
      }
    case RESET:
      return {
        ...state,
        currentRoute: action.route,
      }

    case REPLACE:
      return {
        ...state,
        currentRoute: action.route,
      }
    case POP:
      return {
        ...state,
        data: action.payload,
        currentRoute: action.route,
      }
    default:
      return state
  }
}

export function setRouter(router) {
    return dispatch => {
        dispatch({ type: SET_ROUTER, router });
    }
}


export function pop() {
    return dispatch => {
        dispatch({ type: POP });
    }
}

export function reset(route) {
    return dispatch => {
        dispatch({ type: RESET, route });
    }
}

export function replace(route) {
    return dispatch => {
        dispatch({ type: REPLACE, route });
    }
}

export function push(route) {
    return dispatch => {
        dispatch({ type: PUSH, route });
    }
}

