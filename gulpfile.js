// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var haml = require('gulp-haml');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var livereload = require("gulp-livereload");

//sounds: Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink

// Compile Our Sass
gulp.task('sass', function() {
	var onError = function(err) {
		notify.onError({
			title:    "SASS",
			message:  "Compilation error!",
			sound:    "Funk"
		})(err);

		console.log(err);
		this.emit('end');
	};

	livereload.listen();

	return gulp.src('sass/main.sass')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('./css/'))
		.pipe(livereload())
		.pipe(notify({title: "SASS", message: "compilation [OK]"}))
});

gulp.task('haml', function() {
	var onError = function(err) {
		notify.onError({
			title:    "HAML",
			message:  "Compilation error!",
			sound:    "Funk"
		})(err);

		console.log(err);
		this.emit('end');
	};

	livereload.listen();

	return gulp.src('haml/**/*.haml')
		.pipe(plumber({errorHandler: onError}))
		.pipe(haml())
		.pipe(gulp.dest('./'))
		.pipe(livereload())
		.pipe(notify({title: "HAML", message: "compilation [OK]"}))
});

//Creates a local server on port 8000
gulp.task('connect', function() {
  connect.server({
		name: 'local dev',
		port: 8888,
		livereload: true
  });
});

// Default Task
gulp.task('default', ['sass', 'haml', 'connect'], function() {
	// Watch Files For Changes
	gulp.watch('sass/**/*.sass', ['sass']);
	gulp.watch('haml/**/*.haml', ['haml']);
});
