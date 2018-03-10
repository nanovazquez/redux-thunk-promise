import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    isDone: PropTypes.bool,
  })),
  completeTask: PropTypes.func.isRequired,
};

const defaultProps = {
  tasks: [],
};

class Tasks extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleTaskClick = this.handleTaskClick.bind(this);
  }

  handleTaskClick(evt) {
    const { completeTask } = this.props;
    const { id } = evt.currentTarget.dataset;
    completeTask(id);
  }

  render() {
    const { tasks } = this.props;

    if (!tasks.length) {
      return (
        <p className={styles.noTasks}>No tasks to do. Enjoy!</p>
      );
    }

    return (
      <ul className={styles.tasks}>
        {
          tasks.map(task => (
            <li
              role="presentation"
              key={task.id}
              data-id={task.id}
              className={`${styles.task} ${task.isDone && styles.isDone}`}
              onClick={styles.isDone && this.handleTaskClick}
            >
              <div className={styles.status} />
              <span className={styles.description}>{ task.description }</span>
            </li>
          ))
        }
      </ul>
    );
  }
}

Tasks.propTypes = propTypes;
Tasks.defaultProps = defaultProps;
export default Tasks;
