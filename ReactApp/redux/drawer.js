'use strict';

// Set initial state
const initialState = {
  drawerIsOpen: false,
  currentPage: 0,
}

const TOGGLEDRAWER = 'TOGGLE_DRAWER';
const SELECTPAGE = 'SELECT_PAGE';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLEDRAWER:
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen
      }
    case SELECTPAGE:
      return {
        currentPage: action.currentPage,        
        drawerIsOpen: false
      }
    default:
      return state
  }
}

export function toggleDrawer() {
    return dispatch => {
        dispatch({ type: TOGGLEDRAWER });
    }
}

export function goToPage(page) {
    return dispatch => {
      dispatch({ type: SELECTPAGE, currentPage: page});
    }
}