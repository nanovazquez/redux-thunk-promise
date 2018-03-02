// Use a tool like redux-actions to reduce the boilerplate
// We'll use the basic approach to simplify the example.
import actionTypes from './action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.FETCH_TASKS): {
      debugger;
      return {
        ...state,
        tasks: action.payload,
      };
    }

    case (actionTypes.UPDATE_TASK_STATUS): {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};
