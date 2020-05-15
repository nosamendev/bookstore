import {
  DELETE_BOOK,
  DELETE_BOOK_START,
  DELETE_BOOK_FAILED,
  BOOK_TO_BE_DELETED,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
  deleted: false,
};

const deleteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_BOOK:
      return { ...state, ...action.payload, loading: false, deleted: true };
    case DELETE_BOOK_START:
      return { ...state, loading: true, deleted: false };
    case DELETE_BOOK_FAILED:
      return {
        ...state,
        loading: false,
        description: action.payload,
        error: true,
        deleted: false,
      };
    case BOOK_TO_BE_DELETED:
      return { ...state, deleted: action.payload };

    default:
      return state;
  }
};

export default deleteReducer;
