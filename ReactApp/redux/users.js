import AppConfig from '../config';

const USERS_URL = AppConfig.usersUrl;
const GROUPS_URL = AppConfig.groupsUrl;

// Set initial state
const initialState = {
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

export const REQUEST = 'REQUEST_USERS';
export const SEND_REQUEST = 'SEND_REQUEST_USERS';
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT_USERS';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const LOAD_GROUPS_SUCCESS = 'LOAD_GROUPS_SUCCESS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const FAILURE = 'FAILURE_USERS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const CLEAR_USERS_ERROR = 'CLEAR_USERS_ERROR';
export const CLEAR_REFRESH = 'CLEAR_USERS_REFRESH';
export const SET_REFRESH_REQUIRED = 'SET_REFRESH_REQUIRED';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_REQUEST:
      return {
        ...state,
        request: action.request,
        loading: true,
        shouldRedirect: false,
      };
    case REQUEST:
      return {
        ...state,
        loading: true,
        shouldRedirect: false,
      };
    case CLEAR_USERS_ERROR:
      return {
        ...state,
        error: null,
        shouldRedirect: false,
      };
    case CLEAR_REDIRECT:
      return {
        ...state,
        shouldRedirect: false,
      };
    case CLEAR_REFRESH:
      return {
        ...state,
        shouldRefresh: false,
      };
    case SET_REFRESH_REQUIRED:
      return {
        ...state,
        shouldRefresh: true,
      };

    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        mixed: state.mixed
          .concat([action.payload])
          .sort((a, b) => a.name < b.name),
        groups: state.groups.concat([action.payload]),
        mappedGroups: Object.assign({}, state.mappedGroups, {
          [action.payload.groupId]: action.payload,
        }),
        loading: false,
        request: '',
        error: null,
        shouldRedirect: false,
      };
    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        mixed: state.mixed
          .filter((a) => { a.groupId !== action.payload.groupId })
          .concat([action.payload])
          .sort((a, b) => a.name < b.name),
        groups: state.groups.filter((a) => { a.groupId !== action.payload.groupId })
          .concat([action.payload]),
        mappedGroups: Object.assign({}, state.mappedGroups, {
          [action.payload.groupId]: action.payload,
        }),
        loading: false,
        request: '',
        error: null,
        shouldRedirect: false,
      };
    case LOAD_GROUPS_SUCCESS:
      return {
        ...state,
        mixed: state.users
          .concat(action.payload)
          .sort((a, b) => a.name < b.name),
        groups: action.payload,
        mappedGroups: action.payload.reduce(
          (a, b) => (a ? { ...a, [b.groupId]: b } : {}),
          {},
        ),
        loading: false,
        request: '',
        error: null,
        shouldRedirect: false,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        mixed: state.groups
          .concat(action.payload)
          .sort((a, b) => a.name < b.name),
        users: action.payload,
        request: '',
        mappedUsers: action.payload.reduce(
          (a, b) => (a ? { ...a, [b.userId]: b } : {}),
          {},
        ),
        loading: false,
        error: null,
        shouldRedirect: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        request: '',
        loading: false,
        error: null,
        shouldRedirect: true,
      };
    case FAILURE:
      return {
        ...state,
        request: '',
        loading: false,
        error: action.error,
        shouldRedirect: false,
      };
    default:
      return state;
  }
}

export function loadUsers() {
  return (dispatch) => {
    const config = {
      path: USERS_URL,
      method: 'GET',
      headers: {},
      success: (data) => {
        if (data.count > 0 && data._embedded) {
          dispatch({ type: LOAD_USERS_SUCCESS, payload: data._embedded.items });
        } else {
          dispatch({ type: LOAD_USERS_SUCCESS, payload: [] });
        }
      },
      failure: error =>
        dispatch({ type: FAILURE, error: error.name || error.message }),
    };

    dispatch({ type: SEND_REQUEST, request: 'LOADING CONTACTS' });
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function loadGroups() {
  return (dispatch) => {
    const config = {
      path: GROUPS_URL,
      method: 'GET',
      headers: {},
      success: (data) => {
        if (data.count > 0 && data._embedded) {
          dispatch({
            type: LOAD_GROUPS_SUCCESS,
            payload: data._embedded.items,
          });
        } else {
          dispatch({ type: LOAD_GROUPS_SUCCESS, payload: [] });
        }
      },
      failure: error =>
        dispatch({ type: FAILURE, error: error.name || error.message }),
    };
    dispatch({ type: REQUEST, fetchConfig: config });
  };
}

export function createGroup(name, members) {
  const group = {
    name,
    visibility: 'PUBLIC',
    members,
  };
  return (dispatch, getState) =>
    new Promise((res, rej) => {
      const { auth } = getState();
      const config = {
        path: GROUPS_URL,
        method: 'POST',
        headers: {},
        body: group,
        success: (createdGroup) => {
          dispatch({ type: CREATE_GROUP_SUCCESS, payload: createdGroup });
          res(createdGroup);
        },
        failure: (error) => {
          dispatch({ type: FAILURE, error: error.name || error.message });
          rej(error);
        },
      };

      dispatch({ type: REQUEST, fetchConfig: config });
    });
}

export function addMemberToGroup(groupId, userId) {
  const member = {userId};

  return (dispatch, getState) =>
    new Promise((res, rej) => {
      const { auth } = getState();
      const config = {
        path: GROUPS_URL + '/' + groupId + '/members',
        method: 'POST',
        headers: {},
        body: member,
        success: (updatedGroup) => {
          dispatch({ type: UPDATE_GROUP_SUCCESS, payload: updatedGroup });
          res(updatedGroup);
        },
        failure: (error) => {
          dispatch({ type: FAILURE, error: error.error || error.message });
          rej(error);
        },
      };

      dispatch({ type: REQUEST, fetchConfig: config });
    });
}


export function deleteUser(userId) {
  const id = userId;

  return dispatch =>
    new Promise((res, rej) => {
      const config = {
        path: `${USERS_URL}/${id}`,
        method: 'DELETE',
        headers: {},
        success: (message) => {
          dispatch({ type: DELETE_USER_SUCCESS });
        },
        failure: (error) => {
          dispatch({ type: FAILURE, error: error.name || error.message });
        },
      };
      dispatch({ type: SEND_REQUEST, request: 'DELETING CONTACT' });
      dispatch({ type: REQUEST, fetchConfig: config });
    });
}

export function setRefreshRequired() {
  return dispatch => dispatch({ type: SET_REFRESH_REQUIRED });
}

export function clearUsersError() {
  return dispatch => dispatch({ type: CLEAR_USERS_ERROR });
}

export function clearRedirect() {
  return dispatch => dispatch({ type: CLEAR_REDIRECT });
}

export function clearRefresh() {
  return dispatch => dispatch({ type: CLEAR_REFRESH });
}

function getOptions(authToken) {
  return {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };
}

function postOptions(body, authToken) {
  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
