const validFSAKeys = ['type', 'payload', 'error', 'meta'];

/*
 * Dispatches the result of a Promise either a success or an error.
 * @param action - The element to be evaluated.
 * @param dispatch - The element to be evaluated.
 * @param promise - The element to be evaluated.
 * @return {Promise} - The promise
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

/*
 * Checks if the argument received is a Flux Standard Action (FSA).
 * For more info, see https://github.com/redux-utilities/flux-standard-action#actions
 * @param action - The element to be evaluated.
 * @return {boolean} - True if the argument is a FSA. False otherwise.
 */
function isFSA(action: any = {}): boolean {
  // Action is an object
  return (typeof action === 'object')
    // and has a type property with a string value
    && (!!action.type && typeof action.type === 'string')
    // and may have one or more of these properties: 'type', 'payload', 'error' or 'meta'
    && Object.keys(action).every((key) => validFSAKeys.indexOf(key) !== -1);
}

/*
 * Checks if the argument received is a thenable.
 * For more info, see https://promisesaplus.com/#point-53
 * @param action - The element to be evaluated.
 * @return {boolean} - True if the argument is a thenable. False otherwise.
 */
function isThenable(action: any = {}): boolean {
  return typeof action.then === 'function';
}

/*
 * Checks if the argument received is a function.
 * For more info, see https://github.com/gaearon/redux-thunk#whats-a-thunk
 * @param action - The element to be evaluated.
 * @return {boolean} - True if the argument is a function. False otherwise.
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
