const gulp = require('gulp');
gulp.task('build', gulp.parallel('sass', 'images'));
