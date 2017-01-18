const $ = require('gulp-load-plugins')();
const path = require("path");
const gulp = require("gulp");
const config = require("../config").webpack;
const webpackConfig = require(path.resolve('webpack.config.js'));

gulp.task('webpack', () => {
  gulp.src(config.src)
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest(config.dest));
});