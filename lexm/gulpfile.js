'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

var eslintRules = {
  'rules': {
    'no-console': 0,
    'indent': [
      2,
      2
    ],
    'quotes': [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': [
      2,
      'always'
    ]
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'globals': {
    'describe': false,
    'it': false,
    'beforeEach': false,
    'afterEach': false,
    'before': false,
    'after': false
  },
  'ecmaFeatures': {
    'modules': true,
    'experimentalObjectRestSpread': true
  },
  'extends': 'eslint:recommended'
};

var paths = {
  styles:  ['app/sass/*.sass'],
  html: ['app/*.html', 'app/html/*.html', 'app/html/template/*.html'],
  js:   ['app/js/*.js', 'test/*.js'],
  test: ['test/*_spec.js']
};

gulp.task('lint', function(){
  return gulp.src(paths.js)
    .pipe(eslint(eslintRules))
    .pipe(eslint.format());
});

var testPath = ['test/*.js'];

gulp.task('mocha', function(){
  return gulp.src(testPath, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('build:html', function() {
  gulp.src('app/*.html')
  .pipe(gulp.dest('public/'));
  gulp.src('app/html/*.html')
  .pipe(gulp.dest('public/html'));
  gulp.src('app/html/template/*.html')
  .pipe(gulp.dest('public/html/template'));
});

gulp.task('build:styles', function() {
  gulp.src('app/sass/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public'));
});

gulp.task('build:js', function() {
  return gulp.src('./app/js/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build:test', () => {
  return gulp.src('test/*_spec.js')
    .pipe(webpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('./test'));
});

gulp.task('watch:styles', function() {
  gulp.watch(paths.styles, ['build:styles']);
});

gulp.task('watch:html', function() {
  gulp.watch(paths.html, ['build:html']);
});

gulp.task('watch:js', function() {
  gulp.watch(paths.js, ['build:js']);
});

gulp.task('clean', function() {
  return gulp.src('public', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('build:all', ['build:styles', 'build:html', 'build:js']);

gulp.task('watch:all', ['watch:styles', 'watch:html', 'watch:js']);

gulp.task('default', ['build:all', 'watch:all']);

gulp.task('all', ['lint', 'default']);
