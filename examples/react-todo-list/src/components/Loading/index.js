import React from 'react';
import styles from './styles.css';
import LoadingIndicator from './loading-indicator.svg';

const propTypes = {};
const defaultProps = {};

class Loading extends React.PureComponent {
  render() {
    return (
      <p className={styles.loading}>
        <span>Loading tasks...</span>
        <LoadingIndicator className={styles.loadingIndicator} />
      </p>
    );
  }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;
export default Loading;
