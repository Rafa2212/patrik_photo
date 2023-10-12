'use strict';

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('delete', function () {
    return del(['images/*.*']);
});

gulp.task('resize-fulls', function () {
    return gulp.src(['images/*.*'])
        .pipe(imageResize({
            quality: 0.2
        }))
        .pipe(gulp.dest('images/fulls'))
});

gulp.task('resize-thumbs', function () {
    return gulp.src(['images/*10000*.*'])
        .pipe(imageResize({
            quality: 0.1
        }))
        .pipe(gulp.dest('images/thumbs'));
});

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./assets/sass/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'main.min'}))
        .pipe(gulp.dest('./assets/css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./assets/js/main.js')
        .pipe(uglify())
        .pipe(rename({basename: 'main.min'}))
        .pipe(gulp.dest('./assets/js'));
});

// build task
gulp.task('build', gulp.series('sass', 'minify-js'));

// resize images
gulp.task('resize', gulp.series('resize-thumbs', 'resize-fulls', 'delete'));


// default task
gulp.task('default', gulp.series('build', 'resize'));
