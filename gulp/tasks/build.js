const gulp = require('gulp');
gulp.task('build', [
  'webpack',
  'sass',
  'pug',
  'images'
]);