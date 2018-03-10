export default {
  fetchTasks: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% of the time the call fails
      if (Math.random() > 0.5) {
        return reject(new Error('The network connection has failed (try again)'));
      }

      return resolve([
        { id: '1', description: 'Write the redux-thunk-promise library', isDone: true },
        { id: '2', description: 'Add unit tests', isDone: true },
        { id: '3', description: 'Add integration tests', isDone: true },
        { id: '4', description: 'Create real-life example with React/Redux', isDone: false },
        { id: '5', description: 'Blog post about this tool', isDone: false },
      ]);
    }, 2500);
  }),
};
