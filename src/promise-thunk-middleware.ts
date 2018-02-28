import { isFSA, isFunction, isThenable } from './utils';

/*
 * This middleware will take care of handling both
 * promises and thunks to manage async interactions
 * (e.g. get information from a backend service).
 */
function createPromiseThunkMiddleware(extraArguments: object = {}): any {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (isFunction(action)) {
      return action({ dispatch, getState, ...extraArguments });
    }

    if (isFSA(action) && isThenable(action.payload)) {
      return action.payload.then(
        (result) => dispatch({ ...action, payload: result }),
        (error) => {
          dispatch({ ...action, payload: error, error: true });
          return Promise.reject(error);
        },
      );
    }
    return next(action);
  };
}

const promiseThunkMiddleware = createPromiseThunkMiddleware();
promiseThunkMiddleware.withExtraArgument = createPromiseThunkMiddleware;

export default promiseThunkMiddleware;
