import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

const defaultProps = {
  error: {},
};

class Error extends React.PureComponent {
  render() {
    const { error } = this.props;
    return (
      <div className={styles.error}>
        <p>There was an error while loading the tasks:</p>
        <p className={styles.errorMessage}>{ error.message }</p>
      </div>
    );
  }
}

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;
