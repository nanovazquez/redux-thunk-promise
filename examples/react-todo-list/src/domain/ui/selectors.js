const ui = state => state.ui;
const isLoading = state => ui(state).isLoading;
const errors = state => ui(state).errors;

export default {
  ui,
  isLoading,
  errors,
};
