import {
  OPEN_FIND_BOOK_DROPDOWN,
  CLOSE_FIND_BOOK_DROPDOWN,
} from '../actions/types';

const INITIAL_STATE = {
  isFindBookDropdownOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_FIND_BOOK_DROPDOWN:
      return { ...state, isFindBookDropdownOpen: action.payload };
    case CLOSE_FIND_BOOK_DROPDOWN:
      return { ...state, isFindBookDropdownOpen: action.payload };
    default:
      return state;
  }
};
