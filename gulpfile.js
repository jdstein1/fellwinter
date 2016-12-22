/* gulpfile.js */

// Include gulp
var gulp = require('gulp'),
  conf = require('./gulp.config');

// Load "gulp-*" plugins automatically...
var plugins = require('gulp-load-plugins')();

// Load plugins manually...
var wiredep = require('wiredep').stream,
  browserSync = require('browser-sync').create(),
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

// g_bs:src for dev task
gulp.task('g_bs:src', function() {
    console.log('START g_bs:src');
    browserSync.init({
        server: {
            baseDir: conf.dirs.src,
            index: conf.files.index
        },
        ui: {
          port:4001
        },
        port:4000
    });
    gulp.watch(conf.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(conf.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(conf.files.html).on('change', browserSync.reload);
    gulp.watch(conf.files.html, function () {
      console.log('change to html');
    }).on('change', browserSync.reload);
});

// g_bs:dest for default task
gulp.task('g_bs:dest', function() {
    console.log('START g_bs:dest');
    browserSync.init({
        server: {
            baseDir: conf.dirs.dest,
            index: conf.files.index
        },
        ui: {
          port:4001
        },
        port:4000
    });
    gulp.watch(conf.files.js, function () {
      console.log('change to js');
    });
    gulp.watch(conf.files.css, function () {
      console.log('change to css');
    });
    // gulp.watch(conf.files.html).on('change', browserSync.reload);
    gulp.watch(conf.files.html, function () {
      console.log('change to html');
    }).on('change', browserSync.reload);
});

gulp.task('g_clean', function() {
  return del([
    conf.dirs.dest+'*',conf.dirs.src+'**/*.min.*'
  ])
});

gulp.task('g_hint', function() {
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

gulp.task('g_minjs', function(errors) {
  console.log('paths.src.js: ', paths.src.js);
  pump([
    gulp.src(paths.src.js),
    // gulp.src('./src/js/*.js'),
    plugins.concat('app.concat.js', {newLine:'\r\n'}),
    // gulp.dest(conf.dirs.dest + conf.dirs.js),
    plugins.rename('app.concat.min.js'),
    plugins.uglify({
      // preserveComments: 'license'
    }),
    gulp.dest(conf.dirs.dest + conf.dirs.js)
    // gulp.dest('./dest/js/')
  ], errors);
});

gulp.task('g_mincss', function(errors) {
  pump([
    gulp.src(paths.src.css),
    plugins.concat('app.concat.css', {newLine:'\r\n'}),
    // gulp.dest(conf.dirs.dest + conf.dirs.css),
    plugins.cleanCss({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }),
    plugins.rename('app.concat.min.css'),
    gulp.dest(conf.dirs.dest + conf.dirs.css)
  ], errors);
});

gulp.task('g_copy:html', function() {
  copy(
    './src/*.html',
    conf.dirs.dest,
    function(err, files) {
      if (err) {
        console.log('error', err);
      }
    }
  )
});

gulp.task('g_copy:lib', function() {
  copy(
    [
      './bower_components/**/dist/*.min.js',
      './bower_components/**/dist/*.min.css'
    ],
    conf.dirs.dest+'lib/',
    function(err, files) {
      if (err) {
        console.log('error', err);
      }
    }
  )
});

gulp.task('g_inject', function() {
  var sources = gulp.src(['./dest/js/*.js', './dest/css/*.css'], {read: false});
  return gulp
    .src('./dest/**/*.html')
    .pipe(plugins.inject(sources))
    .pipe(gulp.dest('./dest'));
});

gulp.task('g_deps', function() {
  return gulp
    .src(paths.src.index)
    .pipe(wiredep())
    .pipe(gulp.dest(conf.dirs.dest));
});

gulp.task('g_show', function() {
  console.log('plugins: ', plugins);
});

// Minification Task
gulp.task('min', [ 'g_mincss', 'g_minjs' ]);

// DEST Task
gulp.task('dest', [ 'g_clean', 'g_hint', 'min', 'g_copy:html', 'g_copy:lib', 'g_deps', 'g_inject', 'g_bs:dest' ]);

// SRC Task 
gulp.task('default', [ 'g_clean', 'g_hint', 'g_deps', 'g_bs:src' ]);
