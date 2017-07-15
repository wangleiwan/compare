'use strict';

import {without} from 'lodash';

const initialState = {
  actionQueue: [],
  isConnected: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    case 'ADD_TO_ACTION_QUEUE':
      return Object.assign({}, state, {
        actionQueue: state.actionQueue.concat([action.request]),
      });
    case 'REMOVE_FROM_ACTION_QUEUE':
      return Object.assign({}, state, {
        //actionQueue: _.without(state.actionQueue, action.request),
        actionQueue: without(state.actionQueue, action.request),
      });
    default:
      return state
  }
}

export function playRequest(req) {
    return (dispatch, getState) => {
        fetch(req.url, req.options)
        .then(resp => resp.json())
        .then(req.successFunc, req.errorFunc)
        .then(res => dispatch({ type: 'REMOVE_FROM_ACTION_QUEUE', request: req }));
    }
}

export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};
