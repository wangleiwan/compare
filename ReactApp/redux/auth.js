import AppUtil from '../util';
import AppConfig from '../config';
import User from '../models/User';

import { authentication } from './cloudlink'

const USER_URL = AppConfig.usersUrl;

// Set initial state
const initialState = {
  data: {},
  user: new User(),
  loading: false,
  error: null,
  init: false,
  resetPassword: {}
};

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const USER_SUCCESS = 'USER_SUCCESS';
const VERIFY_SEND_SUCCESS = 'VERIFY_SEND_SUCCESS';
const LOGOUT = 'LOGOUT';
const MANUAL_VERIFY = 'MANUAL_VERIFY';
const BACK_TO_SIGNUP = 'BACK_TO_SIGNUP';

const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
const RESET_PASSWORD = 'RESET_PASSWORD';
const VERIFY_RESET_CODE = 'VERIFY_RESET_CODE';
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
const CLEAR_RESET ='CLEAR_RESET';

const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';
const CLEAR_AUTH = 'CLEAR_AUTH';

const REQUEST = 'REQUEST_AUTH';
const SEND_REQUEST = 'SEND_REQUEST_AUTH';
const UPLOADING = 'UPLOADING';
const FAILURE = 'FAILURE_AUTH';


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_REQUEST:
      return {
        ...state,
        loading: true && action.from === undefined,
        error: null,
        request: action.request,
      };
    case REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        request: '',
        error: null,
        resetPassword: {
          ...state.resetPassword,
          error: null
        }
      };
    case CLEAR_AUTH:
      return {
        data: {},
        user: new User(),
        loading: false,
        request: '',
        error: null,
        init: true,
        resetPassword: {}
      };
    case BACK_TO_SIGNUP:
      return {
        ...state,
        newSignup: false,
        emailManual: false,
        error: null,
        resetPassword: {}
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        newSignup: true,
        user: new User(action.user),
        authInfo: action.authInfo,
        request: '',
        loading: false,
        animating: false,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        from: action.from,
        loading: false,
        animating: false,
        request: '',
        init: true,
        error: null,
        resetPassword: {}
      };
    case LOGOUT:
      return {
        data: {},
        loading: false,
        animating: false,
        init: true,
        request: '',
        error: null,
        resetPassword: {}
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: new User(action.payload),
        request: '',
        loading: false,
        animating: false,
        init: true,
        error: null,
      };
    case VERIFY_SEND_SUCCESS:
      return {
        ...state,
        request: '',
        loading: false,
        animating: false,
      };
    case VERIFY_SUCCESS:
      const field = `${action.verifyType}Verified`;
      return {
        ...state,
        [field]: true,
        user: new User(action.user),
        request: '',
        loading: false,
        animating: false,
        error: null,
      };
    case FAILURE:
      return {
        ...state,
        emailManual: false,
        loading: false,
        animating: false,
        init: true,
        request: '',
        error: action.error,
        resetPassword: {}
      };
    case MANUAL_VERIFY:
      return {
        ...state,
        loading: false,
        animating: true,
        emailManual: action.manual,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        error: null,
        resetPassword: {
          resetType: action.method,
          method: action.resetType,
          data: action.payload,
          requesting: true,
          reset: false,
          verified: false,
          resend: action.resend ? action.resend : null
        }
      }
    case RESET_PASSWORD:
     return {
       ...state,
       loading: false,
       error: null,
       resetPassword: {
          ...state.resetPassword,
          requesting: false,
          error: null,
          reset: true,
          tempAccessCode: null,
        }
     }
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
        resetPassword: {
          ...state.resetPassword,
          error: action.error
        }
      }
    case VERIFY_RESET_CODE:
      return {
        ...state,
       loading: false,
       error: null,
       resetPassword: {
          ...state.resetPassword,
          error: null,
          verified: true,
          tempAccessCode: action.tempAccessCode,

        }
      }
    case CLEAR_RESET:
      return {
        ...state,
        error: null,
        loading: false,
        resetPassword: {}
      }
    default:
      return state;
  }
}

export function sendVerify(accountId, userId, type) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${userId}/accessCode`,
      method: 'POST',
      headers: {},
      body: {
        accountId,
        type,
        'mobileAppName': 'Mitel VoiceConnect'
      },
      success: (resp) => {
        dispatch({ type: VERIFY_SEND_SUCCESS, payload: resp });
      },
      failure: (error) => {
          dispatch({ type: FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function verify(accountId, userId, type, code, from) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${userId}/accessCode`,
      method: 'PUT',
      headers: {},
      body: { accountId, type, tempAccessCode: code },
      success: (resp) => {
        dispatch({ type: VERIFY_SUCCESS, user: resp, verifyType: type });
      },
      failure: (error) => {
          dispatch({ type: FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: SEND_REQUEST, request: 'VERIFYING', from });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function manualVerify(accountId, userId, type, code) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${userId}/accessCode`,
      method: 'PUT',
      headers: {},
      body: { accountId, type, tempAccessCode: code },
      success: (resp) => {
        dispatch({ type: VERIFY_SUCCESS, user: resp, verifyType: type });
      },
      failure: (error) => {
          dispatch({ type: FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: MANUAL_VERIFY, manual: true });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function loadProfile(from) {
  return dispatch =>
    new Promise((resolve, reject) => {
      const config = {
        path: `${USER_URL}/me`,
        method: 'GET',
        headers: {},
        success: (resp) => {
          dispatch({ type: USER_SUCCESS, payload: resp });
          resolve(resp);
        },
        failure: (error) => {
            dispatch({ type: FAILURE, error: error.name || error.message });
            reject(error);
        },
      };
      dispatch({ type: SEND_REQUEST, request: 'LOADING PROFILE', from });
      dispatch({ type: REQUEST, fetchConfig: config });
    });
}

export function update(user) {
  return dispatch =>
    new Promise((resolve, reject) => {
      const config = {
        path: `${USER_URL}/me`,
        method: 'PUT',
        headers: {},
        body: user,
        success: (updateResp) => {
          dispatch({ type: USER_SUCCESS, payload: updateResp });
          resolve(updateResp);
        },
        failure: (error) => {
            dispatch({ type: FAILURE, error: error.name || error.message });
            reject(error);
        },
      };
      dispatch({ type: SEND_REQUEST, request: 'UPDATING' });
      dispatch({ type: REQUEST, fetchConfig: config });
    });
}

export function signup(authInfo, from) {
  return (dispatch) => {
    const config = {
      path: USER_URL,
      method: 'POST',
      headers: {},
      body: authInfo,
      success: (signupResp) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          user: signupResp,
          authInfo,
        });
      },
      failure: (error) => {
        dispatch({ type: FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: SEND_REQUEST, request: 'SIGNING UP', from });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function login(authInfo, from) {
    let savedToken = null;

    return dispatch => {
        dispatch({ type: SEND_REQUEST, request: 'LOGGING IN', from });

        authentication.login(authInfo.email, authInfo.password, authInfo.accountId)
            .then(token => {
                    authentication.whoAmI();
                    if(token){
                        savedToken = token;
                    }
                }
            )
            .then(resp => {
                dispatch({ type: AUTH_SUCCESS, payload: savedToken, from });
            })
            .catch(error => {
                let _bodyText = error._bodyText ? JSON.parse(error._bodyText) : null;
                if(_bodyText && _bodyText.message){
                    dispatch({ type: FAILURE, error: _bodyText.name || _bodyText.message });
                }else{
                    dispatch({ type: FAILURE, error: error.name || error.message});
                }
            });
    }
}

export function logout() {
  return (dispatch) => {
    authentication.logout();
    dispatch({ type: LOGOUT });
  };
}

export function loadAuth() {
  return dispatch => {
    authentication.getToken()
      .then(token => {
        if(!token){
          dispatch({
            type: AUTH_SUCCESS,
            payload: {},
          });
        }else{
          dispatch({
            type: AUTH_SUCCESS,
            payload: token,
          });
        }
      })
      .catch(error => {
        dispatch({ type: AUTH_SUCCESS, payload: {} });
      })
  }
}

export function backToSignUp() {
  return (dispatch) => {
    dispatch({ type: BACK_TO_SIGNUP });
  };
}

export function clearAuthError(page) {
  return (dispatch) => {
    if (page) {
      dispatch({ type: CLEAR_AUTH });
    } else {
      dispatch({ type: CLEAR_AUTH_ERROR });
    }
  };
}

export function clearAuth() {
  return (dispatch) => {
    dispatch({ type: CLEAR_AUTH });
  };
}

// forgot password
export function forgotPassword(resetMethod, method, resend, from) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${resetMethod}/password`,
      method: 'PUT',
      headers: {},
      body: {
        'action': 'forgot',
        'mobileAppName': 'Mitel VoiceConnect'
      },
      success: (resp) => {
        dispatch({ type: FORGOT_PASSWORD, payload: resp, resetType: resetMethod, method, resend });
      },
      failure: (error) => {
          dispatch({ type: RESET_PASSWORD_FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: SEND_REQUEST, request: 'SENDING', from });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function resetPassword(tempAccessCode, newPassword, resetMethod) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${resetMethod}/password`,
      method: 'PUT',
      headers: {},
      body : {
        'action': 'reset',
        tempAccessCode,
        'password': newPassword,
        'mobileAppName': 'Mitel VoiceConnect'
      },
      success: (resp) => {
        dispatch({ type: RESET_PASSWORD, payload: resp, resetType: resetMethod });
      },
      failure: (error) => {
          dispatch({ type: RESET_PASSWORD_FAILURE, error: error.name || error.message });
      },
    };
    dispatch({ type: SEND_REQUEST, request: 'RESETTING' });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function verifyResetCode(resetMethod, tempAccessCode, method, from) {
  return (dispatch) => {
    const config = {
      path: `${USER_URL}/${resetMethod}/password`,
      method: 'PUT',
      headers: {},
      body: {'action': 'reset', tempAccessCode},
      success: (resp) => {
        dispatch({ type: VERIFY_RESET_CODE, payload: resp, resetType: resetMethod, tempAccessCode });
      },
      failure: (error) => {
          dispatch({ type: RESET_PASSWORD_FAILURE, error: error.name || error.message });
      },
    };
    if(method === 'mobile') {
      dispatch({ type: SEND_REQUEST, request: 'VERIFYING TEMP CODE', from });
    }
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function clearReset() {
  return dispatch => {
    dispatch({ type: CLEAR_RESET })
  }
}
