import { createAction } from 'redux-actions';

import actionTypes from './action-types';
import tasksService from './tasks-service';
import { actions as uiActions } from '../ui';

const fetchTasksFromService = () => ({ dispatch }) => {
  dispatch(uiActions.isLoading(true));

  // The result of the call will be sent to reducers
  // as the payload of the FETCH_TASKS action. If there
  // was an error, action.error will be set to true
  return tasksService.fetchTasks();
};

export default {
  fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
  updateTaskStatus: createAction(actionTypes.UPDATE_TASK_STATUS),
};
