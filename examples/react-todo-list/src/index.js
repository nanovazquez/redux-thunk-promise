import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { TodoList } from './components';
import { reducers } from './domain';
// import promiseThunkMiddleware from '../../../dist';

const store = createStore(combineReducers(reducers));
// applyMiddleware(promiseThunkMiddleware)

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root'),
);

