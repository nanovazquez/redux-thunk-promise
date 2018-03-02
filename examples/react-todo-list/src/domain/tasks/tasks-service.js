export default {
  fetchTasks: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% of the time the call fails
      const hasFailed = Math.round() > 0.5;
      if (hasFailed) {
        return reject(new Error('The network connection has failed'));
      }
      return resolve([
        { id: 1, name: 'Write the tool', state: 'completed' },
        { id: 2, name: 'Add unit tests', state: 'completed' },
        { id: 3, name: 'Add integration tests', state: 'completed' },
        { id: 4, name: 'Add usage examples for React/Redux devx', state: 'in progress' },
        { id: 5, name: 'Post about this tool', state: 'pending' },
      ]);
    }, 2500);
  }),
};
