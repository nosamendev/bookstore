import {
  SAVE_ORDER_START,
  SAVE_ORDER,
  SAVE_ORDER_FAILED,
  SAVE_SUCCESS,
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
      return { ...state, loading: true, success: false };
    case SAVE_ORDER:
      return {
        ...state,
        error: false,
        loading: false,
        success: true,
      };
    case SAVE_ORDER_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        success: false,
        description: action.payload,
      };
    case SAVE_SUCCESS:
      return { ...state, success: action.payload };
    default:
      return state;
  }
};
