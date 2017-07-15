/**
 * Index - this is where everything
 *  starts - but offloads to app.js
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import React, { Component } from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import fetchMiddleware from '../redux/fetchMiddleware';
import { setMiExceptionHandler } from '../miExceptionHandler';

import App from './app'

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '../redux/index'

interface Props {

}

interface State {

}

const loggerMiddleware = logger();

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
  promiseMiddleware,
  fetchMiddleware,
  loggerMiddleware
];

if (__DEV__) {
  // Dev-only middleware
  middleware = [
    ...middleware,
  ];
}

// Init redux store (using the given reducer & middleware)
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer);

// Handles unexpected errors
setMiExceptionHandler();

// Wrap App in Redux provider (makes Redux available to all sub-components)
export default class AppContainer extends Component<Props, State> {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
