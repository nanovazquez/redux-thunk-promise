import { connect } from 'react-redux';
import { actions, selectors } from '../../domain';
import TodoList from './TodoList';

const mapStateToProps = state => ({
  tasks: selectors.tasks(state),
  isLoading: selectors.isLoading(state),
  error: selectors.error(state),
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(actions.fetchTasks()),
  updateTaskStatus: (task, status) => dispatch(actions.updateTaskStatus({ task, status })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
