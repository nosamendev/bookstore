import {
  SAVE_ORDER_START,
  SAVE_ORDER,
  SAVE_ORDER_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  error: false,
  loading: false,
  description: '',
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_ORDER_START:
      return { ...state, loading: true };
    case SAVE_ORDER:
      return { ...state, error: false, loading: false, success: true };
    case SAVE_ORDER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        description: action.payload,
      };
    default:
      return state;
  }
};
