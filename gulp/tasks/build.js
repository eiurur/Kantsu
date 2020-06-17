const gulp = require('gulp');
gulp.task('build', gulp.parallel('sass', 'pug', 'images'));
