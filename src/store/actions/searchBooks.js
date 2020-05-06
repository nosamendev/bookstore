import { SEARCH_STARTED, SEARCH_STOPPED } from '../actions/types';

export const searchStarted = () => {
  return {
    type: SEARCH_STARTED,
    payload: true,
  };
};

export const searchStopped = () => {
  return {
    type: SEARCH_STOPPED,
    payload: false,
  };
};
