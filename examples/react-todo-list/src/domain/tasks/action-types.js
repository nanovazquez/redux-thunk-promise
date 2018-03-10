const prefix = 'my-app/tasks'; // "my-app" is a prefix to ensure the action types are unique

const FETCH_TASKS = `${prefix}/FETCH_TASKS`;
const COMPLETE_TASK = `${prefix}/COMPLETE_TASK`;

export default {
  FETCH_TASKS,
  COMPLETE_TASK,
};
