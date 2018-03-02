import { connect } from 'react-redux';
import { actions, selectors } from '../domain';
import TodoList from './TodoList';

const mapStateToProps = state => ({
  tasks: selectors.tasks(state),
  isLoading: selectors.isLoading(state),
  errors: selectors.errors(state),
});

const mapDispatchToProps = () => ({
  fetchTasks: () => actions.fetchTasks(),
  updateTaskStatus: (task, status) => actions.updateTaskStatus({ task, status }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
