import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import authReducer from './authReducer';
import cartStatusReducer from './cartStatusReducer';

export default combineReducers({
  booksReducer: booksReducer,
  authReducer: authReducer,
  cartStatusReducer: cartStatusReducer,
});
