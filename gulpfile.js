var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('scripts', function() {
  return gulp.src('public/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/assests/js'))
    .pipe(notify({ message: 'scripts task complete' }));
});

gulp.task('clean', function(cb) {
  del(['dist/assets/js'], cb);
});

gulp.task('default', ['clean'], function() {
  gulp.start('scripts');
});
