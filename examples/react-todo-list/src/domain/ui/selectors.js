const ui = state => state.ui;
const isLoading = state => ui(state).isLoading;
const error = state => ui(state).error;

export default {
  ui,
  isLoading,
  error,
};
