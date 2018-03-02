import actionTypes from './action-types';
import tasksService from './tasks-service';
import { actions as uiActions } from '../ui';

const fetchTasksFromService = () => ({ dispatch }) => {
  dispatch(uiActions.isLoading(true));

  return tasksService.fetchTasks()
    .then((result) => {
      // The result of the call is already handled by the middleware
      // and sent as payload of the FETCH_TASKS action
      // Here we only need to execute our business logic
      dispatch(uiActions.isLoading(false));
      return result;
    })
    .catch((error) => {
      // The error is already handled by the middleware
      // and sent as payload of the FETCH_TASKS action
      // Here we only need to execute our business logic
      dispatch(uiActions.isLoading(false));
      return error;
    });
};

// Use a tool like redux-actions to reduce the boilerplate
// We'll use the basic approach to simplify the example.
const fetchTasks = () => ({
  type: actionTypes.IS_LOADING,
  payload: fetchTasksFromService,
});

const updateTaskStatus = payload => ({
  type: actionTypes.UPDATE_TASK_STATUS,
  payload,
});

export default {
  fetchTasks,
  updateTaskStatus,
};
