const gulp = require('gulp');
const watch = require('gulp-watch');
const config = require('../config').watch;

gulp.task('watch', () => {
  watch(config.images, () => gulp.start(['images']));
});
