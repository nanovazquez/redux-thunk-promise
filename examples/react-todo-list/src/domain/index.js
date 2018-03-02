import { actions as tasksActions, actionTypes as taskActionTypes, reducers as tasksReducers, selectors as tasksSelectors } from './tasks';
import { reducers as uiReducers, selectors as uiSelectors } from './ui';

const actions = {
  ...tasksActions,
};

const actionTypes = {
  ...taskActionTypes,
};

const reducers = {
  tasks: tasksReducers,
  ui: uiReducers,
};

const selectors = {
  ...tasksSelectors,
  ...uiSelectors,
};

export {
  actions,
  actionTypes,
  reducers,
  selectors,
};
