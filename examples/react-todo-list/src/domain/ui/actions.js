import actionTypes from './action-types';

// Use a tool like redux-actions to reduce the boilerplate
// We'll use the basic approach to simplify the example.
const isLoading = payload => ({
  type: actionTypes.IS_LOADING,
  payload,
});

export default {
  isLoading,
};
