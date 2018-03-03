import { createAction } from 'redux-actions';
import actionTypes from './action-types';

export default {
  isLoading: createAction(actionTypes.IS_LOADING),
};
