const gulp = require('gulp');
const concat = require('gulp-concat');
const child = require('child_process');
var exec = require('child_process').exec;
const gutil = require('gulp-util');
const { watch } = require('gulp');
const browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
const { pipeline } = require('stream');
const terser = require('gulp-terser');
// var pipeline = require('readable-stream').pipeline;

const siteRoot = '_site';
const jsFiles = 'js/**/*.js';


gulp.task('compress', function () {
  return gulp.src('js/init.js')
    .pipe(terser({
      keep_fnames: false,
      mangle: true
    }))
    .pipe(gulp.dest('assets'))
});

gulp.task('jekyll', function (cb) {
  exec('bundle exec jekyll build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  watch([jsFiles], function(cb) {
    // body omitted
    cb();
  });
});

gulp.task('js', function() {
  return gulp.src('js/init.js')
    .pipe(concat('init-concat.js'))
    .pipe(gulp.dest('js'))
});

gulp.task("default", gulp.series('compress', 'jekyll', 'serve'));
