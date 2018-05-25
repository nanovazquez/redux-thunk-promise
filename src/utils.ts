const validFSAKeys = ['type', 'payload', 'error', 'meta'];

/***
 * Dispatches the result of a Promise that could be either a success or an error.
 * @param promise The promise whose result will be dispatched.
 * @param action The action to dispatch.
 * @param dispatch The dispatch function provided by the middleware.
 * @returns The promise whose result will be dispatched.
 */
function dispatchPromiseResult(promise: Promise<any>, action: any, dispatch: any) {
  return promise
    .then(
      (result) => dispatch({ ...action, payload: result }),
      (error) => {
        dispatch({ ...action, payload: error, error: true });
        return Promise.reject(error);
    });
}

/**
 * Checks if an action is a Flux Standard Action (FSA).
 * For more info, see https://github.com/redux-utilities/flux-standard-action#actions
 * @param action The action to be evaluated
 * @returns `true` if the action received via argument is an FSA.
 */
function isFSA(action: any = {}): boolean {
  // Action is an object
  return (typeof action === 'object')
    // and has a type property with a string value
    && (!!action.type && typeof action.type === 'string')
    // and may have one or more of these properties: 'type', 'payload', 'error' or 'meta'
    && Object.keys(action).every((key) => validFSAKeys.indexOf(key) !== -1);
}

/**
 * Checks if an action is thenable.
 * For more info, see https://promisesaplus.com/#point-53
 * @param action The action to be evaluated
 * @returns `true` if the action received via argument is a thenable.
 */
function isThenable(action: any = {}): boolean {
  return typeof action.then === 'function';
}

/**
 * Checks if an action a function.
 * For more info, see https://github.com/gaearon/redux-thunk#whats-a-thunk
 * @param action The element to be evaluated.
 * @return `true` if the action received via argument is a function.
 */
function isFunction(action: any = {}): boolean {
  return typeof action === 'function';
}

export {
  dispatchPromiseResult,
  isFSA,
  isThenable,
  isFunction,
};
