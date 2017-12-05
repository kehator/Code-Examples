var gulp = require('gulp'),
	util = require('gulp-util'),
	gulpif = require('gulp-if'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	concatcss = require('gulp-concat-css'),
	cssnano = require('gulp-cssnano'),
	browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    proxy: {
	    target: "3difs.headred1.co.uk",
	},
	files: ["style.css","app.js","*.php","template-parts/*.php"]
  })
});

gulp.task('default', function () {
	gulp.src(['node_modules/tether/dist/css/tether.css','node_modules/bootstrap/dist/css/bootstrap.css','sass/style.scss','node_modules/font-awesome/css/font-awesome.css'])
				.pipe(sass())			
				.pipe(concatcss('style.css'))
				.pipe(gulpif(util.env.production, cssnano()))
				.pipe(gulp.dest(''));
	gulp.src(['node_modules/tether/dist/js/tether.js','node_modules/bootstrap/dist/js/bootstrap.js','js/app.js'])
				.pipe(concat('app.js'))
				.pipe(gulpif(util.env.production, uglify()))				
				.pipe(gulp.dest(''));
	return;
});

gulp.task('watch',['browserSync','default'], function () {
	gulp.watch(['sass/style.scss','js/app.js'],
				['default']);
});

gulp.task('awesome-copy', function() {
	gulp.src('node_modules/font-awesome/fonts/*.*')
    	.pipe(gulp.dest('../../../font-awesome/fonts/'));
	return;
});