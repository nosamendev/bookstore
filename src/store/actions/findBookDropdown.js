import {
  OPEN_FIND_BOOK_DROPDOWN,
  CLOSE_FIND_BOOK_DROPDOWN,
} from '../actions/types';

export const openFindBookDropdown = () => {
  return {
    type: OPEN_FIND_BOOK_DROPDOWN,
    payload: true,
  };
};

export const closeFindBookDropdown = () => {
  return {
    type: CLOSE_FIND_BOOK_DROPDOWN,
    payload: false,
  };
};
