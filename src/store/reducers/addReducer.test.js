import { ADD_BOOK, ADD_BOOK_START, ADD_BOOK_FAILED } from '../actions/types';
import addReducer from './addReducer';

test('returns default initial state when no action is passed', () => {
  const newState = addReducer(undefined, {});
  expect(newState.error).toBe(false);
  expect(newState.loading).toBe(false);
  expect(newState.description).toBe('');
});

test('returns action payload of upon receiving an action of type `ADD_BOOK`', () => {
  const initialState = {
    error: false,
    loading: false,
    description: '',
  };
  const newState = addReducer(initialState, {
    type: ADD_BOOK,
    payload: { name: 'bookname' },
  });
  expect(newState.error).toBe(false);
  expect(newState.loading).toBe(false);
  expect(newState.description).toBe('');
  expect(newState.name).not.toBe('');
});

test('returns state of `loading: true` upon receiving an action of type `ADD_BOOK_START`', () => {
  const initialState = {
    error: false,
    loading: false,
    description: '',
  };
  const newState = addReducer(initialState, {
    type: ADD_BOOK_START,
  });
  expect(newState.loading).toBe(true);
  expect(newState.error).toBe(false);
  expect(newState.description).toBe('');
});

test('returns state of `error: true` upon receiving an action of type `ADD_BOOK_FAILED`', () => {
  const initialState = {
    error: false,
    loading: false,
    description: { description: 'errorDescription' },
  };
  const newState = addReducer(initialState, {
    type: ADD_BOOK_FAILED,
  });
  expect(newState.error).toBe(true);
  expect(newState.loading).toBe(false);
  expect(newState.description).not.toBe('');
});
