'use strict';
var gulp = require('gulp');
var gulpExec = require('gulp-exec');
var exec = require('child_process').exec;
var del = require('del');
var gulpif = require('gulp-if');
var mergeStream = require('merge-stream');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');

// Task
gulp.task('livereload', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: './bin/www',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
})


gulp.task('default',
		gulp.series(  'livereload', function() {  })
);
