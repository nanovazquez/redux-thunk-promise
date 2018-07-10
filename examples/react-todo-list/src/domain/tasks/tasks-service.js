export default {
  fetchTasks: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      // 5% of the time the call fails
      if (Math.random() > 0.95) {
        return reject(new Error('The network connection has failed (try again)'));
      }

      return resolve([
        { id: '1', description: 'Write the redux-thunk-promise library', isCompleted: true },
        { id: '2', description: 'Add unit tests', isCompleted: true },
        { id: '3', description: 'Add integration tests', isCompleted: true },
        { id: '4', description: 'Create real-life example with React/Redux', isCompleted: false },
        { id: '5', description: 'Blog post about this tool', isCompleted: false },
      ]);
    }, 2500);
  }),
};
