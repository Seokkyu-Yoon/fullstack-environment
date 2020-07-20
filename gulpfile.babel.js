const path = require('path');
const gulp = require('gulp');
const dotenv = require('dotenv');

const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const del = require('del');

const nodemon = require('gulp-nodemon');

const webpack = require('gulp-webpack');
const browserSync = require('browser-sync');

const webpackConfig = require('./webpack.config.js');

dotenv.config({ path: path.join(__dirname, 'envs', 'dev.env') });
class Dirs {
  constructor() {
    this.root = __dirname;
    this.server = path.join(this.root, 'bin', 'server.js');
    this.app = path.join(this.root, 'app.js');
    this.routes = path.join(this.root, 'routes');

    this.views = path.join(this.root, 'views', '*.ejs');

    this.src = path.join(this.root, 'src');
    this.public = path.join(this.root, 'public');
  }
}

const dirs = new Dirs();

gulp.task('clean', () => del.sync([dirs.public]));

gulp.task('js', () => gulp.src(path.join(dirs.src, 'js', '*.js'))
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(path.join(dirs.public, 'js'))));

gulp.task('css', () => gulp.src(path.join(dirs.src, 'style', '*.css'))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest(path.join(dirs.public, 'style'))));

gulp.task('images', () => gulp.src(path.join(dirs.src, 'images', '*'))
  .pipe(imagemin())
  .pipe(gulp.dest(path.join(dirs.public, 'images'))));

gulp.task('views', () => gulp.src(path.join(dirs.views, '*.ejs')));

gulp.task('hot-reload', () => {
  gulp.watch(dirs.src, gulp.parallel('js', 'css', 'images'));
  gulp.watch(dirs.views, gulp.parallel('views'));
});

gulp.task('nodemon', () => nodemon({
  script: dirs.server,
  watch: [
    dirs.app,
    dirs.server,
    dirs.routes,
  ],
  env: process.env,
}));

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    proxy: 'http://localhost:5072',
    files: [
      'public/**/*.*',
      'views/**/*.ejs',
    ],
    port: 5071,
  });
});

gulp.task('default', gulp.parallel(
  'clean',
  'js', 'css', 'images',
  'hot-reload', 'nodemon', 'browser-sync',
));
