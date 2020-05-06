import { SEARCH_STARTED, SEARCH_STOPPED } from '../actions/types';

const INITIAL_STATE = {
  searchBooksStarted: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return { ...state, searchBooksStarted: action.payload };
    case SEARCH_STOPPED:
      return { ...state, searchBooksStarted: action.payload };
    default:
      return state;
  }
};
