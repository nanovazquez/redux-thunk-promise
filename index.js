define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const validFSAKeys = ['type', 'payload', 'error', 'meta'];
    /*
     * Checks if the argument received is a Flux Standard Action.
     * For more info, see https://github.com/redux-utilities/flux-standard-action#actions
     */
    function isFSA(action = {}) {
        // Action is an object
        return (typeof action === 'object')
            // and has a type property with a string value
            && (!!action.type && typeof action.type === 'string')
            // and may have one or more of these properties: 'type', 'payload', 'error' or 'meta'
            && Object.keys(action).every((key) => validFSAKeys.indexOf(key) !== -1);
    }
    exports.isFSA = isFSA;
    /*
     * Checks if the argument received is a thenable.
     * For more info, see https://promisesaplus.com/#point-53
     * @param action - The element to be evaluated.
     * @return {boolean} - True if the argument is a thenable. False otherwise.
     */
    function isThenable(action = {}) {
        return typeof action.then === 'function';
    }
    exports.isThenable = isThenable;
    /*
     * Checks if the argument received is a function.
     * For more info, see https://github.com/gaearon/redux-thunk#whats-a-thunk
     */
    function isFunction(action = {}) {
        return typeof action === 'function';
    }
    exports.isFunction = isFunction;
});
define("promise-thunk-middleware", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * This middleware will take care of handling both
     * promises and thunks to manage async interactions
     * (e.g. get information from a backend service).
     */
    function createThunkPromiseMiddleware(extraArguments = {}) {
        return ({ dispatch, getState }) => (next) => (action) => {
            if (utils_1.isFunction(action)) {
                return action(Object.assign({ dispatch, getState }, extraArguments));
            }
            if (utils_1.isFSA(action) && utils_1.isThenable(action.payload)) {
                return action.payload.then((result) => dispatch(Object.assign({}, action, { payload: result })), (error) => {
                    dispatch(Object.assign({}, action, { payload: error, error: true }));
                    return Promise.reject(error);
                });
            }
            return next(action);
        };
    }
    const promiseThunkMiddleware = createThunkPromiseMiddleware();
    promiseThunkMiddleware.withExtraArgument = createThunkPromiseMiddleware;
    exports.default = promiseThunkMiddleware;
});
define("index", ["require", "exports", "promise-thunk-middleware"], function (require, exports, promise_thunk_middleware_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = promise_thunk_middleware_1.default;
});
