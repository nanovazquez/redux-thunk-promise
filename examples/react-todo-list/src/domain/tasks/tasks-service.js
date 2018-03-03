export default {
  fetchTasks: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% of the time the call fails
      if (Math.random() > 0.5) {
        return reject(new Error('The network connection has failed'));
      }

      return resolve([
        { id: 1, description: 'Write the tool', status: 'Completed' },
        { id: 2, description: 'Add unit tests', status: 'Completed' },
        { id: 3, description: 'Add integration tests', status: 'Completed' },
        { id: 4, description: 'Add usage examples for React/Redux devx', status: 'In progress' },
        { id: 5, description: 'Post about this tool', status: 'Pending' },
      ]);
    }, 2500);
  }),
};
