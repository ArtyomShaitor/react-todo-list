'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');


gulp.task('build', function () {
    return gulp.src('src/resources/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers : ['last 20 versions', 'Firefox < 20']
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', function () {
    gulp.watch('src/resources/css/**/*.scss', function(){
        return gulp.src('src/resources/css/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('test.css'))
            .pipe(autoprefixer({
                browsers : ['last 20 versions', 'Firefox < 20']
            }))
            .pipe(gulp.dest('public/'));
    });
});
