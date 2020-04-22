const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const workspace = path.resolve();
const pathPublic = path.join(workspace, 'public');
const pathBuild = path.join(workspace, 'build');

const pathJs = path.join(pathPublic, 'js');
const pathView = path.join(pathPublic, 'view');

module.exports = {
  mode: 'none',
  entry: {
    index: ['@babel/polyfill', path.join(pathJs, 'index.js')],
  },
  output: {
    filename: '[name].js',
    path: pathBuild,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/image', to: 'image' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: path.join(pathView, 'index.ejs'),
      templateParameters: {
        title: '<%= title %>',
      },
      chunks: ['index'],
      favicon: path.join(pathPublic, 'favicon.ico'),
    }),
    new HtmlWebpackPlugin({
      filename: 'error.ejs',
      template: path.join(pathView, 'error.ejs'),
      templateParameters: {
        message: '<%= message %>',
        error: {
          status: '<%= error.status %>',
          stack: '<%= error.stack %>',
        },
      },
      chunks: [],
      favicon: path.join(pathPublic, 'favicon.ico'),
    }),
  ],
};
