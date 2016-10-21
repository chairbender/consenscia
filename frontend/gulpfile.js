var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');

var path = {
  ALL: ['src/js/*.jsx', 'src/js/**/*.jsx', 'src/index.html', 'src/sass/**/*.scss', 'src/images/**/*.png'],
  HTML: 'src/index.html',
  DEST: 'dist',
  WEBPACK_ENTRY: 'src/js/react/App.jsx'
};

gulp.task('startConnect', ['build'], function () {
  connect.server({
    root: 'dist',
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api' : ''
          }
        })
      ]
    }
  });
});

gulp.task('transform', function () {
  gulp.src(path.WEBPACK_ENTRY)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(path.DEST))
    .pipe(connect.reload());
});

gulp.task('copy', function () {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(path.ALL, ['build']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['transform', 'copy']);
