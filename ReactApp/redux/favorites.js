

// App DB
import AppDB from '../db';
import AppUtil from '../util';

// Set initial state
const initialState = {
  order: [],
  contactModal: false,
  groupModal: false,
  editing: false,
  inited: false,
  error: null,
};

const MODIFY = 'MODIFY_FAVS';
const TOGGLE = 'TOGGLE_EDITING_FAVS';
const SUCCESS = 'SUCCESS_FAVS';
const FAILURE = 'FAILURE_FAVS';
const TOGGLECONTACT = 'TOGGLE_CONTACT';
const TOGGLEGROUPMODAL = 'TOGGLE_GROUP_MODAL';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        editing: !state.editing,
      };
    case MODIFY:
      // modify the state without saving the positioning
      // used when in editing mode
      return {
        ...state,
        ...action.payload,
      };
    case SUCCESS:
      return {
        ...state,
        order: action.payload.order || [],
        inited: action.payload.inited,
        editing: false,
        error: action.error,
      };
    case FAILURE:
      return {
        ...state,
        editing: false,
        error: action.error,
      };
    case TOGGLECONTACT:
      return {
        ...state,
        contactModal: !state.contactModal,
      };
    case TOGGLEGROUPMODAL:
      return {
        ...state,
        groupModal: !state.groupModal,
      };
    default:
      return state;
  }
}

export function modify(values) {
  return (dispatch) => {
    dispatch({ type: MODIFY, payload: values });
  };
}

export function toggleContact() {
  return (dispatch) => {
    dispatch({ type: TOGGLECONTACT });
  };
}

export function toggle() {
  return (dispatch) => {
    dispatch({ type: TOGGLE });
  };
}

export function toggleGroupModal() {
  return (dispatch) => {
    dispatch({ type: TOGGLEGROUPMODAL });
  };
}

export function load() {
  return (dispatch) => {
    AppDB.settings.get_all((result) => {
      if (result.totalrows > 0) {
        var firstIndex = AppUtil.firstIndexInObj(result.rows);
        dispatch({ type: SUCCESS, payload: result.rows[firstIndex].values });
      } else {
        dispatch({ type: SUCCESS, payload: [] });
      }
    });
  };
}

export function save(values) {
  return (dispatch) => {
    AppDB.settings.get_all((result) => {
      if (result.totalrows == 0) {
        AppDB.settings.add({ values }, (added_data) => {
          dispatch({ type: SUCCESS, payload: values });
        });
      } else {
        // Update row
        var firstIndex = AppUtil.firstIndexInObj(result.rows);
        AppDB.settings.update_id(firstIndex, { values }, (updated_data) => {
          dispatch({ type: SUCCESS, payload: values });
        });
      }
    });
  };
}
