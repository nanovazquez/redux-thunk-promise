const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: `umd/redux-thunk-promise.${process.env.NODE_ENV || 'production'}.js`,
    library: 'ReduxThunkPromise',
    libraryTarget: 'umd'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/lib.index.js', to: 'index.js' }
    ])
  ]
};
