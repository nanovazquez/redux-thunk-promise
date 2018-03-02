const prefix = 'my-app/tasks'; // "my-app" is a prefix to ensure the action types are unique

const FETCH_TASKS = `${prefix}/FETCH_TASKS`;
const UPDATE_TASK_STATUS = `${prefix}/UPDATE_TASK_STATUS`;

export default {
  FETCH_TASKS,
  UPDATE_TASK_STATUS,
};
