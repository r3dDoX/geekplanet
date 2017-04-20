import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '80px 0',
  },
};

export default () => (
  <div style={styles.container}>
    <CircularProgress size={80} thickness={5} />
  </div>
);
