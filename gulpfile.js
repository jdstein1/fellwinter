/* gulpfile.js */

// Include gulp
var gulp = require('gulp'),
  config = require('./gulp.config');

// Include Our Plugins
var wiredep = require('wiredep').stream,
  browser = require('browser-sync').create(),
  copy = require('copy'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  jshint = require('gulp-jshint'),
  pump = require('pump'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev');

var paths = {
  'src': {
    'index': config.dirs.src + config.files.index,
    'css': config.dirs.src + config.files.css,
    'js': config.dirs.src + config.files.js,
  }, 
  'dest': {
    'index': config.dirs.dest + config.files.index,
    'css': config.dirs.dest + config.files.css,
    'js': config.dirs.dest + config.files.js,
  }
};

// browser:src for dev task
gulp.task('browser:src', function() {
    console.log('START browser:src');
    browser.init({
        server: {
            baseDir: config.dirs.src,
            index: config.files.index
        }
    });
    gulp.watch(config.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(config.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(config.files.html).on('change', browser.reload);
    gulp.watch(config.files.html, function () {
      console.log('change to html');
    }).on('change', browser.reload);
});

// browser:dest for default task
gulp.task('browser:dest', function() {
    console.log('START browser:dest');
    browser.init({
        server: {
            baseDir: config.dirs.dest,
            index: config.files.index
        }
    });
    gulp.watch(config.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(config.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(config.files.html).on('change', browser.reload);
    gulp.watch(config.files.html, function () {
      console.log('change to html');
    }).on('change', browser.reload);
});

gulp.task('clean', function() {
  return del([
    config.dirs.dest+'*',config.dirs.src+'**/*.min.*'
  ])
});

gulp.task('jshint', function() {
  return gulp.src([
    config.dirs.src+config.files.js,
    '!'+config.dirs.src+'js/*.min.js',
    '!'+config.dirs.src+'js/clientlibs.*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

function callback (error) {
 console.log('error', error);
}

gulp.task('min-js', function(callback) {
  // return gulp.src(paths.src.js)
  //   .pipe(concat('app.concat.js'))
  //   // .pipe(gulp.dest(config.dirs.dest+config.dirs.js))
  //   .pipe(rename('app.concat.min.js'))
  //   .pipe(uglify({
  //     preserveComments: 'license'
  //   }))
  //   .pipe(gulp.dest(config.dirs.dest+config.dirs.js));
  // Use 'pump' to allow errors to flow through 'piped' sub-tasks
  pump([
    gulp.src(paths.src.js),
    concat('app.concat.js', {newLine:'\r\n'}),
    // gulp.dest(config.dirs.dest+config.dirs.js),
    rename('app.concat.min.js'),
    uglify({
      preserveComments: 'license'
    }),
    gulp.dest(config.dirs.dest+config.dirs.js)
  ], callback);
});

gulp.task('min-css', function(callback) {
  // return gulp.src(paths.src.css)
  //   .pipe(concat('app.concat.css', {newLine:'\r\n'}))
  //   // .pipe(gulp.dest(config.dirs.dest+config.dirs.css))
  //   .pipe(cleanCSS({debug: true}, function(details) {
  //     console.log(details.name + ': ' + details.stats.originalSize);
  //     console.log(details.name + ': ' + details.stats.minifiedSize);
  //   }))
  //   .pipe(rename('app.concat.min.css'))
  //   .pipe(gulp.dest(config.dirs.dest+config.dirs.css));
  pump([
    gulp.src(paths.src.css),
    concat('app.concat.css', {newLine:'\r\n'}),
    // gulp.dest(config.dirs.dest+config.dirs.css),
    cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }),
    rename('app.concat.min.css'),
    gulp.dest(config.dirs.dest+config.dirs.css)
  ], callback);
});

gulp.task('copy', function() {
  copy([paths.src.index],'dest',function(err, files) {
    if (err) {
      console.log('error', err);
    }
  })
});

gulp.task('wiredeps', function() {
  gulp.src(paths.src.index)
    .pipe(wiredep({
    }))
    .pipe(gulp.dest(config.dirs.dest));
});

// Dev Mega Task 
gulp.task('dev', [ 'clean','jshint','wiredeps','browser:src' ]);

// Prod Mega Task
gulp.task('min', [ 'clean','jshint','min-css','min-js' ]);

// Default Mega Task
gulp.task('default', [ 'clean','jshint','min-css','min-js','wiredeps','browser:dest' ]);
