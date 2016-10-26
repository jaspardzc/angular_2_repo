// reference links: gulpjs.com
// reference links: https://github.com/gulpjs/gulp/blob/master/docs/README.md
// reference links: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');

// Paths Declaration
var paths = {

}

// Gulp Functions
function errorLog(error) {
	console.error.bind(console);
	this.emit('end');
}

// Scripts Task
// Merge, Concat, Uglify
gulp.task('scripts', function() {

	var jsFromAppRoot = gulp.src('app/*.js');
	var jsFromModule_Profile_Controller = gulp.src('app/modules/profile/controller/*.js');
	var jsFromModule_Profile_Domain = gulp.src('app/modules/profile/domain/*.js');

	return es.merge(jsFromAppRoot, jsFromModule_Profile_Controller, jsFromModule_Profile_Domain)
			.pipe(plumber())
			.pipe(concat('bundle.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist'));
});

// Styles Task
// Precompile, Compress
gulp.task('styles', function() {
	return sass('scss/**/*.scss', {
			style: 'expanded'
		})
		.on('error', errorLog)
		.pipe(prefix('last 2 versions'))
		.pipe(gulp.dest('styles/'))
		.pipe(livereload());
});

// Image Task
// Compress
gulp.task('images', function() {
	return gulp.src('img/*')
			.pipe(imagemin())
			.pipe(gulp.dest('dist/img'));
});

// Watch Task
// Watches JS, SCSS
gulp.task('watch', function() {

	livereload.listen();

	gulp.watch('app/modules/profile/domain/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch('img/*', ['images']);
});

// Default Task
// Kepp Clean
gulp.task('default', ['scripts', 'styles', 'images', 'watch']);