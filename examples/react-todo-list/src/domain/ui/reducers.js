// Use a tool like redux-actions to reduce the boilerplate
// We'll use the basic approach to simplify the example.
import actionTypes from './action-types';
import { actionTypes as tasksActionTypes } from '../tasks';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.IS_LOADING): {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case (tasksActionTypes.FETCH_TASKS): {
      debugger;
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
