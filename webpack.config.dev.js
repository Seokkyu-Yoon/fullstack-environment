const path = require('path');
const webpack = require('webpack');
const webpackBase = require('./webpack.config');

const workspace = path.resolve();
const pathBuild = path.join(workspace, 'build');

const mode = 'development';
const devtool = 'inline-source-map';

function isEjs(filePath) {
  return path.parse(filePath).ext === '.ejs';
}

const devServer = {
  contentBase: pathBuild,
  index: 'index.ejs',
  hot: true,
  open: true,
  overlay: true,
  before(app, server, compiler) {
    compiler.plugin('done', () => {
      const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

      if (!this.hot) return;
      if (changedFiles.some(isEjs)) {
        server.sockWrite(server.sockets, 'content-changed');
      }
    });
  },
};

const webpackDevelopment = {
  ...webpackBase,
  mode,
  devtool,
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...webpackBase.plugins,
  ],
};

module.exports = webpackDevelopment;
