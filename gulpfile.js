'use strict';

// including plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    inject = require('gulp-inject'),
    useref = require('gulp-useref'),
    htmlmin = require('gulp-htmlmin'),
    clean = require('gulp-rimraf'),
    $ = require('gulp-load-plugins')();
var util = require("gulp-util");
var open = require('gulp-open');

var serve = require('gulp-serve');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');


var jsAngularFiles = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-ui-router/angular-ui-router.js',
];

var jsFrontEnd = [
    'src/frontend/app/app.js',
];

/*setup destination folders*/
var jsDest      =   'assets/js',
    cssDest     =   'assets/css',
    imageDest   =   'assets/images';


/*
    *make angular scripts output file
*/
gulp.task('angularScripts', function() {
    return gulp.src(jsAngularFiles)
        .pipe(concat('scripts-angular.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(gulp.dest('./assets/js/'));
});

/*
    *make frontend scripts output file
*/
gulp.task('frontendScripts', function() {
    return gulp.src(jsFrontEnd)
        .pipe(concat('scripts-frontend.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(gulp.dest('./assets/js/'));
});

/*
    *clean all assets old files
    *includes js and css
*/
gulp.task('clean', [], function() {
    console.log("Clean all old files in assets folder");
    return gulp.src(["./assets/js/", "./assets/css/"], {
        read: false
    }).pipe(clean());
});

/*
    *build assets files
*/
gulp.task('build', ['clean'], function() {
    // build angular scripts
    gulp.start('angularScripts');

    // build frontend scripts
    gulp.start('frontendScripts');
});

var frontendSources = gulp.src([
    // 'node_modules/moment/min/moment.min.js',
    // 'node_modules/angular-moment/angular-moment.min.js',
    /*app*/
    'src/frontend/app/app.js',
    'src/frontend/controller/MainCtrl.js',
], {
    read: false
});

gulp.task('frontendBuild', function() {

    var frontendPage = gulp.src('./src/frontend/index.html');
    frontendPage.pipe(inject(frontendSources))
        .pipe(htmlmin({
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('./build/frontend/'));
});

// gulp.task('inject', ['frontendBuild'], function() {
//     var options = {
//         uri: '127.0.0.1:3000',
//         app: 'chrome'
//     };
//     gulp.src('./')
//         .pipe(open(options));
// });

