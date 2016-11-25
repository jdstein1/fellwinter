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

// gt_bs:src for dev task
gulp.task('gt_bs:src', function() {
    console.log('START gt_bs:src');
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

// gt_bs:dest for default task
gulp.task('gt_bs:dest', function() {
    console.log('START gt_bs:dest');
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

gulp.task('gt_clean', function() {
  return del([
    conf.dirs.dest+'*',conf.dirs.src+'**/*.min.*'
  ])
});

gulp.task('gt_hint', function() {
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

gulp.task('gt_minjs', function(errors) {
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

gulp.task('gt_mincss', function(errors) {
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

gulp.task('gt_copy', function() {
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

gulp.task('gt_deps', function() {
  return gulp
    .src(paths.src.index)
    .pipe(wiredep())
    .pipe(gulp.dest(conf.dirs.dest));
});

gulp.task('gt_show', function() {
  console.log('plugins: ', plugins);
  // for (var i = 0; i < plugins.length; i++) {
  //   console.log('plugins['+i+']: ', plugins[i]);
  // }
});

// Minification Task
gulp.task('min', [ 'gt_mincss', 'gt_minjs' ]);

// DEV Task 
gulp.task('dev', [ 'gt_clean', 'gt_hint', 'gt_deps', 'gt_bs:src' ]);

// Default PROD Task
gulp.task('default', [ 'gt_clean', 'gt_hint', 'min', 'gt_deps', 'gt_copy', 'gt_bs:dest' ]);
