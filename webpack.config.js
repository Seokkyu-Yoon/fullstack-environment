const fs = require('fs');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const workspace = __dirname;
const pathSrc = path.join(workspace, 'src');
const pathJs = path.join(pathSrc, 'js');

const listJs = fs.readdirSync(path.join(pathJs), { encoding: 'utf-8' });
const entry = listJs.reduce((bucket, filename) => {
  const objname = filename.slice(0, filename.lastIndexOf('.'));
  // eslint-disable-next-line no-param-reassign
  bucket[objname] = ['@babel/polyfill', path.join(pathJs, filename)];
  return bucket;
}, {});

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: path.join(workspace, 'public'),
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true,
        },
      }),
    ],
  },
};
