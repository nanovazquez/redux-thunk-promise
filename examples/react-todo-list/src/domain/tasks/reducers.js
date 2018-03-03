import { handleActions } from 'redux-actions';
import actionTypes from './action-types';

const initialState = {
  items: [],
};

export default handleActions({
  [actionTypes.FETCH_TASKS]: (state, action) => ({
    ...state,
    items: !action.error ? action.payload : [],
  }),
}, initialState);
