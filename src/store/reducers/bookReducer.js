import {
  FETCH_BOOK,
  FETCH_BOOK_START,
  FETCH_BOOK_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
};

const bookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return { ...state, ...action.payload, loading: false };
    case FETCH_BOOK_START:
      return { ...state, loading: true };
    case FETCH_BOOK_FAILED:
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

export default bookReducer;
