/**
 * Combine All Reducers
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';

import { combineReducers } from 'redux'

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import users from './users'
import conversations from './conversations';
import auth from './auth';
import favorites from './favorites';
import offline from './offline';
import drawer from './drawer';

// Combine all
const appReducer = combineReducers({
  users: users,
  favorites: favorites,
  conversations: conversations,
  auth: auth,
  offline: offline,
  drawer: drawer
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer
