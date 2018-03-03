import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    status: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
    stack: PropTypes.string,
  }),
  fetchTasks: PropTypes.func.isRequired,
};

const defaultProps = {
  tasks: undefined,
  isLoading: false,
  error: undefined,
};

class TodoList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
  }

  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  handleRefreshButtonClick() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  renderTasksSection() {
    const { isLoading, error, tasks } = this.props;

    if (isLoading) {
      return (
        <div className={styles.loading}>Loading tasks...</div>
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <p>
            <span>There was an error when loading the tasks..</span>
            <br />
            <span>{ error.message }</span>
          </p>
        </div>
      );
    }

    if (!tasks) {
      return (
        <div className={styles.tasks}>No tasks to do. Enjoy!</div>
      );
    }

    return (
      <ul className={styles.tasks}>
        {
          tasks.map(task => (
            <li key={task.id} className={styles.task}>
              <div className={`${styles.status} ${task.status.toLowerCase().replace(/ /g, '-')}`} />
              <span className={styles.description}>{ task.description }</span>
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.todoList}>
        <header className={styles.header}>
          <h1>TODO List!</h1>
          <button onClick={this.handleRefreshButtonClick}>Update!</button>
        </header>
        <section className={styles.body}>
          { this.renderTasksSection() }
        </section>
      </div>
    );
  }
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;
export default TodoList;
