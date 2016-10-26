/* gulpfile.js */

// Include gulp
var gulp = require('gulp'),
  conf = require('./gulp.config');

// Load "gulp-*" plugins automatically...
var plugins = require('gulp-load-plugins')();

// Load plugins manually...
var wiredep = require('wiredep').stream,
  browser = require('browser-sync').create(),
  copy = require('copy'),
  del = require('del'),
  pump = require('pump');

var paths = {
  'src': {
    'index': conf.dirs.src + conf.files.index,
    'html': conf.dirs.src + conf.files.any.html,
    'css': conf.dirs.src + conf.files.any.css,
    'js': conf.dirs.src + conf.files.any.js,
  }, 
  'dest': {
    'index': conf.dirs.dest + conf.files.index,
    'html': conf.dirs.dest + conf.files.any.html,
    'css': conf.dirs.dest + conf.files.any.css,
    'js': conf.dirs.dest + conf.files.any.js,
  }
};

// browser:src for dev task
gulp.task('browser:src', function() {
    console.log('START browser:src');
    browser.init({
        server: {
            baseDir: conf.dirs.src,
            index: conf.files.index
        }
    });
    gulp.watch(conf.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(conf.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(conf.files.html).on('change', browser.reload);
    gulp.watch(conf.files.html, function () {
      console.log('change to html');
    }).on('change', browser.reload);
});

// browser:dest for default task
gulp.task('browser:dest', function() {
    console.log('START browser:dest');
    browser.init({
        server: {
            baseDir: conf.dirs.dest,
            index: conf.files.index
        }
    });
    gulp.watch(conf.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(conf.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(conf.files.html).on('change', browser.reload);
    gulp.watch(conf.files.html, function () {
      console.log('change to html');
    }).on('change', browser.reload);
});

gulp.task('clean', function() {
  return del([
    conf.dirs.dest+'*',conf.dirs.src+'**/*.min.*'
  ])
});

gulp.task('jshint', function() {
  return gulp
    .src([
      conf.dirs.src + conf.files.js,
      '!' + conf.dirs.src + 'js/*.min.js',
      '!' + conf.dirs.src + 'js/clientlibs.*.js'
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// function errors (error) {
//   console.log('error', error);
// }

gulp.task('min-js', function(errors) {
  console.log('paths.src.js: ', paths.src.js);
  pump([
    gulp.src(paths.src.js),
    // gulp.src('./src/js/*.js'),
    plugins.concat('app.concat.js', {newLine:'\r\n'}),
    gulp.dest(conf.dirs.dest + conf.dirs.js),
    plugins.rename('app.concat.min.js'),
    plugins.uglify({
      // preserveComments: 'license'
    }),
    gulp.dest(conf.dirs.dest + conf.dirs.js)
    // gulp.dest('./dest/js/')
  ], errors);
});

gulp.task('min-css', function(errors) {
  pump([
    gulp.src(paths.src.css),
    plugins.concat('app.concat.css', {newLine:'\r\n'}),
    gulp.dest(conf.dirs.dest + conf.dirs.css),
    plugins.cleanCss({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }),
    plugins.rename('app.concat.min.css'),
    gulp.dest(conf.dirs.dest + conf.dirs.css)
  ], errors);
});

gulp.task('copy', function() {
  copy(
    [
      './src/*.html',
      '../bower_components/**/*.js',
      '../bower_components/**/*.css'
    ],
    // [
    //   conf.files.index,
    //   // conf.dirs.src + conf.dirs.lib
    // ],
    conf.dirs.dest,
    function(err, files) {
      if (err) {
        console.log('error', err);
      }
    }
  )
});

gulp.task('wiredeps', function() {
  return gulp
    .src(paths.src.index)
    .pipe(wiredep())
    .pipe(gulp.dest(conf.dirs.dest));
});

gulp.task('show', function() {
  console.log('plugins: ', plugins);
});

// Minification Task
gulp.task('min', [ 'min-css', 'min-js' ]);

// DEV Task 
gulp.task('dev', [ 'clean', 'jshint', 'wiredeps', 'browser:src' ]);

// Default PROD Task
gulp.task('default', [ 'clean', 'jshint', 'min', 'wiredeps', 'browser:dest' ]);
