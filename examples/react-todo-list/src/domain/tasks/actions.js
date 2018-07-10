import { createAction } from 'redux-actions';

import actionTypes from './action-types';
import tasksService from './tasks-service';
import { actions as uiActions } from '../ui';

// As a thunk
const fetchTasksFromService = () => ({ dispatch }) => {
  dispatch(uiActions.isLoading(true));

  // The result of the call will be sent to reducers
  // as the payload of the FETCH_TASKS action. You don't
  // need to dispatch the main action, the library does
  // it for you. If there is an error in the request
  // action.error will be set to true
  return tasksService.fetchTasks();
};

export default {
  fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
  completeTask: createAction(actionTypes.COMPLETE_TASK),
};
