import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { TodoList } from './components';
import { reducers } from './domain';

// import thunkPromiseMiddleware from 'redux-thunk-promise';
import thunkPromiseMiddleware from '../../../dist';

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunkPromiseMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root'),
);

