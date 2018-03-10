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
  completeTask: taskId => dispatch(actions.completeTask({ id: taskId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
