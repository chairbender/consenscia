var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');

var path = {
    HTML: 'src/index.html',
    DEST_SRC: 'dist/src',
    DEST: 'dist',
    WEBPACK_ENTRY: 'src/js/App.jsx'
};

gulp.task('transform', function () {
    gulp.src(path.WEBPACK_ENTRY)
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copy', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function () {
    gulp.watch(path.ALL, ['transform', 'copy']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['transform','copy']);
