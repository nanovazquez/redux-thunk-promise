import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { TodoList } from './components';
import { reducers } from './domain';

import './index.css';

// In a real app, the next line should be:
// import thunkPromiseMiddleware from 'redux-thunk-promise';
import thunkPromiseMiddleware from '../../../lib';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(
  combineReducers(reducers),
  {},
  composeEnhancers(applyMiddleware(thunkPromiseMiddleware)),
);

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root'),
);

