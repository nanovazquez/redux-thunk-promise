# Redux Thunk Promise
[![Build Status](https://travis-ci.org/nanovazquez/redux-thunk-promise.svg?branch=master)](https://travis-ci.org/nanovazquez/redux-thunk-promise) [![Coverage Status](https://coveralls.io/repos/github/nanovazquez/redux-thunk-promise/badge.svg?branch=master)](https://coveralls.io/github/nanovazquez/redux-thunk-promise?branch=master) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![npm](https://img.shields.io/npm/v/redux-thunk-promise.svg?style=flat)](https://www.npmjs.com/package/redux-thunk-promise) [![npm](https://img.shields.io/npm/dw/redux-thunk-promise.svg)](https://www.npmjs.com/package/redux-thunk-promise)


[Thunk](https://www.npmjs.com/package/redux-thunk) and [FSA promise](https://www.npmjs.com/package/redux-promise) middleware for Redux.

**Benefits**
* It lets you work with **thunks**, **promises**, both or a mixture. You get to choose what to use.
* It lets you write sync & async action using the same syntax.
* It let's you take advantage of the best of both worls:
  * The ability to _dispatch_ other actions and get information from the _state_ (from _thunks_).
  * The simplicity of firing async calls and getting the result in the reducer, even if it's not successfull (from _promises_).

## Installation

```
npm i -S redux-thunk-promise
```

Then, add this middleware in your [Redux](http://redux.js.org/) store:

```js
import { createStore, applyMiddleware } from 'redux';
import thunkPromiseMiddleware from 'redux-thunk-promise';
import { reducers } from './domain';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkPromiseMiddleware)
);
```

[See a real life example here](./examples), you can run it locally by clonning the repo and running `npm start`.

## Usage

Let's say you want to define two actions, one to fetch tasks from your server (async) and other to mark tasks as completed in the UI (sync). You can do this by using the following code in your Redux container:

```js
...

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(actions.fetchTasks()), // async action
  completeTask: taskId => dispatch(actions.completeTask({ id: taskId })), // sync action
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```
> **Note:** notice that you don't need to differenciate between async and sync actions in th econtainer.

Then, you can write your async actions in different ways:

1. **FSA promise:** this is the simplest case, mostly used when you only care about the result of your action. *redux-thunk-promise* will take care of sending it to the reducer, following the [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) pattern

    ```js
    import { createAction } from 'redux-actions';
    import actionTypes from './action-types';
    import tasksService from './tasks-service';
    import { actions as uiActions } from '../ui';

    const fetchTasksFromService = () => tasksService.fetchTasks();

    export default {
      fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
      completeTask: createAction(actionTypes.COMPLETE_TASK),
    };
    ```

1. **Thunk:** in this case, you wrap the function into another function. This lets you do several things (like dispatching other actions, getting information from the state or even get global arguments) before/after the main action. For instance:

    ```js
    import { createAction } from 'redux-actions';
    import actionTypes from './action-types';
    import tasksService from './tasks-service';
    import { actions as uiActions } from '../ui';

    const fetchTasksFromService = () => ({ dispatch, getState, ...extraArguments }) => {
      dispatch(uiActions.isLoading(true));

      // The result of the call will be sent to reducers as the payload of the FETCH_TASKS action.
      // If there was an error, action.error will be set to true

      return tasksService.fetchTasks()
        .then(() => actions.isLoading(false))
        .catch(() => actions.isLoading(false));
    };

    export default {
      fetchTasks: createAction(actionTypes.FETCH_TASKS, fetchTasksFromService),
      completeTask: createAction(actionTypes.COMPLETE_TASK),
    };
    ```

1. **A mixture of both:** depending on the action, you can choose what suits you best.

