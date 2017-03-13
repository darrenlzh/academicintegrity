var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var mamp = require('gulp-mamp');

var options = {
  user: 'darrenlim',
  port: '8888',
  site_path: '/Users/darrenlim/workspace/academicintegrity/app'
};

gulp.task('config', function(cb){
    mamp(options, 'config', cb);
});

gulp.task('start', function(cb){
    mamp(options, 'start', cb);
});

gulp.task('stop', function(cb){
    mamp(options, 'stop', cb);
});

gulp.task('mamp', ['config', 'start']);

gulp.task('sass', function() {
  return gulp.src('app/sass/main.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('pug', function() {
  return gulp.src(['app/pug/**/*.pug', '!app/pug/includes/*.pug'])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('app'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'localhost:8888'
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
  runSequence(['sass', 'mamp', 'browserSync', 'watch'],
    callback
  )
});

gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
