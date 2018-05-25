'use strict';

if (process.env.NODE_ENV !== 'production') {
  module.exports = require('./umd/redux-thunk-promise.development.js');
} else {
  module.exports = require('./umd/redux-thunk-promise.production.js');
}
