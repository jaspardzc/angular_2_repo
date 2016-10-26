var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var es = require('event-stream');

gulp.task('htmls', function() {
	return gulp.src('src/*.html')
		.pipe()
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {

	var jsFromRoot = gulp.src('src/*.js');

	var jsFromModule_Member = gulp.src('src/member/*.js');

	var jsFromModule_Admin = gulp.src('src/admin/*.js');

	return es.merge(jsFromRoot, jsFromModule_Member, jsFromModule_Admin)
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/{*.js, member/*.js, admin/*.js}', ['scripts']);
});