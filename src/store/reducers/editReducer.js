import { EDIT_BOOK, EDIT_BOOK_START, EDIT_BOOK_FAILED } from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
};

const editReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_BOOK:
      return { ...state, ...action.payload, loading: false };
    case EDIT_BOOK_START:
      return { ...state, loading: true };
    case EDIT_BOOK_FAILED:
      return {
        ...state,
        loading: false,
        description: action.payload,
        error: true,
      };

    default:
      return state;
  }
};

export default editReducer;
