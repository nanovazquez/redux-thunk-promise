import { handleActions } from 'redux-actions';
import actionTypes from './action-types';
import taskActionTypes from '../tasks/action-types';

const initialState = {
  isLoading: false,
  error: undefined,
};

export default handleActions({
  [actionTypes.IS_LOADING]: (state, action) => ({
    ...state,
    isLoading: action.payload,
  }),
  [taskActionTypes.FETCH_TASKS]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error ? action.payload : undefined,
  }),
}, initialState);
