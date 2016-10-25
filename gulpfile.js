/* gulpfile.js */

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var wiredep = require('wiredep').stream,
  copy = require('copy'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev');

// file & folder aliases
var dirs = {
  'src': './src/',
  'dest': './dest/',
  'css': 'css/',
  'js': 'js/',
},
  index = 'index.html',
  css = 'css/*.css',
  js = 'js/*.js',
  paths = {
  'src': {
    'index': dirs.src+index,
    'css': dirs.src+css,
    'js': dirs.src+js,
  }, 
  'dest': {
    'index': dirs.dest+index,
    'css': dirs.dest+css,
    'js': dirs.dest+js,
  }
};

gulp.task('clean', function() {
  return del([
    dirs.dest+'*',dirs.src+'**/*.min.*'
  ])
});

// JS Hint Task
gulp.task('jshint', function() {
  return gulp.src([
    dirs.src+js,
    '!'+dirs.src+'js/*.min.js',
    '!'+dirs.src+'js/clientlibs.*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.src.css)
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest(dirs.dest+dirs.css));
});

gulp.task('copy', function() {
  copy([paths.src.index],'dest',function(err, files) {
    if (err) {
      console.log('error', err);
    }
  })
});

gulp.task('wiredeps', function() {
  // place code for your default task here
  gulp.src(paths.src.index)
    .pipe(wiredep({
    }))
    .pipe(gulp.dest(destDir));
});

// Default Task
gulp.task('default', [ 'clean','minify-css','wiredeps' ]);
