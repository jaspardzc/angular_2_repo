var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	jshint = require('gulp-jshint'),
 	uglify = require('gulp-uglify'),
 	concat = require('gulp-concat'),
 	imagemin = require('gulp-imagemin'),
 	rename = require('gulp-rename'),
 	notify = require('gulp-notify'),
 	cache = require('gulp-cache'),
 	livereload = require('gulp-livereload'),
 	del = require('del'),
 	browsersync = require('browser-sync'),
 	connect = require('gulp-connect'),
 	watch = require('gulp-watch');

// HTML Task
gulp.task('htmls', function() {
	return gulp.src('src/**/*.html')
		.pipe(concat('bundle.min.html'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/views'));
});

// styles task
// preprocessor => autoprefixer => move to dist => rename => minify => move to dist => notify
gulp.task('styles', function() {
	return sass('styles/scss/*.scss', {
			style: 'expanded'
		})
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

// Scripts Task
// jshint => concat => move to dist => rename => uglify => move to dist => notify
gulp.task('scripts', function() {
	return gulp.src('src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('bundle.min.js'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

// Images Task
gulp.task('images', function() {

	var imageminWithCache = cache(imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	}));

	return gulp.src('img/**/*')
		.pipe(imageminWithCache)
		.pipe(gulp.dest('dist/img'))
		.pipe(notify({
			message: 'Images Task complete'
		}));
});

// WebServer Task
gulp.task('webserver', function() {
	connect.server({
		port: 9000,
		host: 'gulp-seed',	// need to add the mapping in the /etc/hosts file
		livereload: true,
		root: ['.', 'dist']
	});
});

// Web Content Reloading Task
gulp.task('livereload', function() {
	return watch(['dist/styles/*.css', 'dist/scripts/*.js'], function() {
			gulp.src(['dist/styles/*.css', 'dist/scripts/*.js'])
				.pipe(connect.reload());
	});
});

// BrowserSync task
//
gulp.task('browser-sync', function() {
	browsersync.create().init({
		server: {
			baseDir: './'
		}
	});
});

// Clean Task
// Synchronize the dist folder with src folder, clean dist on every restart
gulp.task('clean', function() {
	return del(['dist/styles', 'dist/scripts', 'dist/img']);
});
 

// Watch Task
gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('styles/scss/*.scss', ['styles']);
});


// Default Task
// Used to kick off all other tasks
gulp.task('default', ['clean'], function() {
	gulp.start('htmls', 'styles', 'scripts', 'images', 'webserver', 'livereload', 'watch');
});