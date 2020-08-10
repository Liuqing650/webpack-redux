const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const antdTheme = require('../src/theme/index');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: antdTheme
              }
            }
          },
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
              },
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '..', 'src/'), 'node_modules'],
    extensions: [ '.js', '.less', '.css' ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-mobx',
      template: path.join(process.cwd(), '/public/index.html')
    }),
    new webpack.NamedModulesPlugin()
  ],
}
