import 'mocha';
import { expect } from 'chai';
import { applyMiddleware, createStore } from 'redux';
import thunkPromiseMiddleware from '../src/thunk-promise-middleware';

// Examples taken from https://github.com/reactjs/redux/blob/master/docs/api/applyMiddleware.md
// FSA taken from here https://github.com/redux-utilities/flux-standard-action
describe('thunkPromiseMiddleware unit tests', () => {
  let expectedResult;
  let syncAction;
  let promiseAction;
  let thunkAction;
  let store;

  beforeEach(() => {
    expectedResult = { text: 'Understand the middleware' };
    syncAction = { type: 'ADD_TODO_SYNC', payload: expectedResult };
    promiseAction = { type: 'ADD_TODO_PROMISE', payload: Promise.resolve(expectedResult) };
    thunkAction = (actionType) => ({ dispatch, getState }) => (
      Promise.resolve().then(() => {
        dispatch({ type: actionType, payload: expectedResult });
      })
    );
    store = createReduxStore();
  });

  describe('sync action', () => {
    beforeEach(() => store.dispatch(syncAction));
    it('should update the state', () => {
      expect(store.getState()[syncAction.type]).to.be.equal(expectedResult);
    });
  });

  describe('promise action', () => {
    beforeEach(() => store.dispatch(promiseAction));
    it('should update the state', () => {
      expect(store.getState()[promiseAction.type]).to.be.equal(expectedResult);
    });
  });

  describe('thunk action', () => {
    let actionType;
    beforeEach(() => {
      actionType = 'ADD_TODO_THUNK';
      return store.dispatch(thunkAction(actionType));
    });
    it('should update the state', () => {
      expect(store.getState()[actionType]).to.be.equal(expectedResult);
    });
  });

  function createReduxStore() {
    const reducers = (state = {}, action) => {
      return {
        ...state,
        [action.type]: action.payload,
      };
    };

    return createStore(
      reducers,
      {},
      applyMiddleware(thunkPromiseMiddleware),
    );
  }
});
