import { expect } from 'chai';
import 'mocha';
import { spy, stub } from 'sinon';

import promiseThunkMiddleware from '../src/promise-thunk-middleware';

describe('promiseThunkMiddleware unit tests', () => {
  let dummyStore;
  let middlewareFunction;
  let dummyNext;
  let actionHandler;
  let expectedResult;
  let result;

  describe('when it is initialized', () => {
    beforeEach(() => initMiddleware());

    it('should return a function', () => expect(middlewareFunction).to.be.a('function'));
    it('middleware function should return a function', () => expect(actionHandler).to.be.a('function'));
  });

  describe('when actionHandler function is executed', () => {
    let action;
    let actionResult;

    beforeEach(() => initMiddleware());

    describe('and action is not a promise or a thunk', () => {
      beforeEach(() => {
        action = { type: 'GET_INFO' };
        expectedResult = 'expected result';
        dummyNext.withArgs(action).returns(expectedResult);
        return (result = actionHandler(action));
      });

      it('should not call dispatch', () => expect(dummyStore.dispatch.called).to.be.false);
      it('should execute next handler with action', () => expect(dummyNext.calledWith(action)).to.be.true);
      it('should return result of next handler', () => expect(result).to.be.equal(expectedResult));
    });

    describe('and action is a thunk', () => {
      beforeEach(() => {
        expectedResult = 'expected result';
        action = stub();
        action.returns(expectedResult);
        return (result = actionHandler(action));
      });

      it('should not call next handler', () => expect(dummyNext.called).to.be.false);
      it('should execute action', () => expect(action.calledWith({ dispatch: dummyStore.dispatch, getState: dummyStore.getState })).to.be.true);
      it('should return the result of the action', () => expect(result).to.be.equal(expectedResult));
    });

    describe('and action is an FSA with a promise in the payload', () => {
      describe('if promise succeeds', () => {
        beforeEach(() => {
          actionResult = 'action result';
          expectedResult = 'expected result';
          action = { payload: { then: (onFulfilled) => onFulfilled(actionResult) }, type: 'GET_SOMETHING' };
          spy(action.payload, 'then');
          dummyStore.dispatch.returns(expectedResult);
          return (result = actionHandler(action));
        });

        it('should not call next handler', () => expect(dummyNext.called).to.be.false);
        it('should execute the thenable', () => expect(action.payload.then.called).to.be.true);
        it('should dispatch the result of the thenable', () => expect(dummyStore.dispatch.calledWith({ ...action, payload: actionResult })).to.be.true);
        it('should return the result of the dispatch', () => expect(result).to.be.equal(expectedResult));
      });

      describe('if promise fails', () => {
        beforeEach(() => {
          expectedResult = 'THIS IS AN ERROR';
          action = { payload: { then: (onFulfilled, onError) => onError(expectedResult) }, type: 'GET_SOMETHING' };
          spy(action.payload, 'then');
          return actionHandler(action)
            .catch((error) => result = error);
        });

        it('should not call next handler', () => expect(dummyNext.called).to.be.false);
        it('should execute the thenable', () => expect(action.payload.then.called).to.be.true);
        it('should dispatch the error', () => expect(dummyStore.dispatch.calledWith({ ...action, payload: expectedResult, error: true })).to.be.true);
        it('should return a rejected promise with an error', () => expect(result).to.be.equal(expectedResult));
      });
    });
  });

  function initMiddleware() {
    dummyStore = { dispatch: stub(), getState: 'getState' };
    middlewareFunction = promiseThunkMiddleware(dummyStore);
    dummyNext = stub();
    actionHandler = middlewareFunction(dummyNext);
  }
});
