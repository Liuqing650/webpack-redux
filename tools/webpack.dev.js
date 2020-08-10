
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge').default;

const baseConfig = require('./webpack.base');

const port = process.env.PORT || 3000;
const publicPath = `http://localhost:${port}/dist`;
module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',

  entry: [
    `webpack-dev-server/client?http://localhost:${port}/`,
    require.resolve('../src/index')
  ],

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT: port,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  devServer: {
    port,
    // publicPath,
    overlay: true,
    inline: true,
    hot: true,
    stats: {
      modules: false,
      colors: true
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, '..', 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: true, // 如果使用 createBrowserHistory 那么应该设置为 true
  }
});
