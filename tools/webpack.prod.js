
const webpack = require('webpack');
const merge = require('webpack-merge').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.base');

const getOptimization = () => {
  const optimization = {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      // 按需加载块时并行请求的最大数量应小于或等于5
      // 大量请求会降低性能，但是由于请求和响应多路复用，因此在 HTTP2 中不必担心
      maxAsyncRequests: 5,
      // 初始页面加载时并行请求的最大数量应小于或等于3
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
    
  };
  return optimization;
}

module.exports = merge(baseConfig, {
  devtool: false,
  mode: 'production',
  target: 'web',

  entry: {
    main: ['./src/index.js'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
  ],
  optimization: getOptimization(),
});
