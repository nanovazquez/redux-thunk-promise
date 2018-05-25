import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import { Error, Loading, Tasks } from '../';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  fetchTasks: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
};

const defaultProps = {
  tasks: [],
  isLoading: false,
  error: undefined,
};

class TodoList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleRefreshButtonClick = this.handleRefreshButtonClick.bind(this);
  }

  componentDidMount() {
    const { fetchTasks, tasks } = this.props;

    if (!tasks.length) {
      fetchTasks();
    }
  }

  handleRefreshButtonClick() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  renderTasksSection() {
    const { isLoading, error, tasks, completeTask } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Error error={error} />;
    }

    return <Tasks tasks={tasks} completeTask={completeTask} />;
  }

  render() {
    return (
      <div className={styles.todoList}>
        <header className={styles.header}>
          <h1 className={styles.title}>todos</h1>
          <button className={styles.refreshButton} onClick={this.handleRefreshButtonClick} />
        </header>
        <section className={styles.content}>
          { this.renderTasksSection() }
        </section>
        <footer className={styles.footer} />
      </div>
    );
  }
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;
export default TodoList;
