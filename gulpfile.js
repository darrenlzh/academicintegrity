var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/sass/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function() {
  return gulp.src('app/pug/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('app'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['sass', 'fonts'],
    callback
  )
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
