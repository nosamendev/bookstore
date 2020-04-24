import { ADD_BOOK, ADD_BOOK_START, ADD_BOOK_FAILED } from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
};

const addReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, ...action.payload, loading: false };
    case ADD_BOOK_START:
      return { ...state, loading: true };
    case ADD_BOOK_FAILED:
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

export default addReducer;
