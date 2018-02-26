const validFSAKeys = ["type", "payload", "error", "meta"];

/*
 * Checks if the argument received is a Flux Standard Action.
 * For more info, see https://github.com/redux-utilities/flux-standard-action#actions
 */
function isFSA(action: any): boolean {
  // Action is an object
  return (!!action && typeof action === "object")
    // and has a type property with a string value
    && (!!action.type && typeof action.type === "string")
    // and may have one or more of these properties: "type", "payload", "error" or "meta"
    && Object.keys(action).every((key) => validFSAKeys.indexOf(key) !== -1);
}

/*
 * Checks if the argument received is a thenable.
 * For more info, see https://promisesaplus.com/#point-53
 * @param action - The element to be evaluated.
 * @return {boolean} - True if the argument is a thenable. False otherwise.
 */
function isThenable(action: any): boolean {
  return action && typeof action.then === "function";
}

/*
 * Checks if the argument received is a function.
 * For more info, see https://github.com/gaearon/redux-thunk#whats-a-thunk
 */
function isFunction(action: any): boolean {
  return action && typeof action === "function";
}

export {
  isFSA,
  isThenable,
  isFunction,
};
