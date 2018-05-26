import { dispatchPromiseResult, isFSA, isFunction, isThenable } from './utils';

/***
 * Middleware that takes care of handling both promises and thunks
 * to manage async interactions (e.g. get information from a backend service).
 */
function createThunkPromiseMiddleware(extraArguments: object = {}): any {
  return ({ dispatch, getState }) => (next) => (action) => {
    // If action is a thunk, execute it
    if (isFunction(action)) {
      return action({ dispatch, getState, ...extraArguments });
    }

    // If action is an FSA with a thenable as payload,
    // wait for the result and then dispatch it
    if (isFSA(action) && isThenable(action.payload)) {
      return dispatchPromiseResult(action.payload, action, dispatch);
    }

    // If action is an FSA with a thunk as payload,
    // execute it and then wait for the result if it's a thenable
    if (isFSA(action) && isFunction(action.payload)) {
      const payloadResult = action.payload({ dispatch, getState, ...extraArguments });
      if (payloadResult && isThenable(payloadResult)) {
        return dispatchPromiseResult(payloadResult, action, dispatch);
      }
    }

    return next(action);
  };
}

const thunkPromiseMiddleware = createThunkPromiseMiddleware();
thunkPromiseMiddleware.withExtraArgument = createThunkPromiseMiddleware;

export default thunkPromiseMiddleware;
