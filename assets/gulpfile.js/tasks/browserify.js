'use strict';

/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/

var browserify     = require('browserify'),
    watchify       = require('watchify'),
    bundleLogger   = require('../util/bundleLogger'),
    gulp           = require('gulp'),
    handleErrors   = require('../util/handleErrors'),
    source         = require('vinyl-source-stream'),
    sourcemaps     = require('gulp-sourcemaps'),
    buffer         = require('vinyl-buffer'),
    config         = require('../config').browserify,
    _              = require('lodash'),
    gutil          = require('gulp-util'),
    rename         = require('gulp-rename'),
    uglify         = require('gulp-uglify'),
    gulpIf         = require('gulp-if'),
    browserifyTask = function(callback, devMode) {
      var env            = global.runmode,
          isDev          = (env === 'dev'),
          bundleQueue    = config.bundleConfigs.length,
          browserifyThis = function(bundleConfig) {

            if (devMode) {

              // Add watchify args and debug (sourcemaps) option
              _.extend(bundleConfig, watchify.args, { debug: true });

              // A watchify require/external bug that prevents proper recompiling,
              // so (for now) we'll ignore these options during development. Running
              // `gulp browserify` directly will properly require and externalize.
              bundleConfig = _.omit(bundleConfig, ['external', 'require']);
            }

            var b = browserify(bundleConfig),
                bundle = function() {
                  // Log when bundling starts
                  bundleLogger.start(bundleConfig.outputName);

                  return b
                    .bundle()
                    // Use vinyl-source-stream to make the
                    // stream gulp compatible. Specify the
                    // desired output filename here.
                    .pipe(source(bundleConfig.outputName))

                    .pipe(gulpIf(!isDev, buffer()))
                    // uglify on  production build
                    .pipe(gulpIf(!isDev, uglify()))
                    .pipe(rename({suffix: '.min'}))
                    // Report compile errors
                    .on('error', handleErrors)
                    //.pipe(gulpIf(isDev, sourcemaps.write('./')))

                    // Specify the output destination
                    .pipe(gulp.dest(bundleConfig[env].dest))
                    .on('end', reportFinished);
                },

                reportFinished = function() {
                  gutil.log('ending');

                  // Log when bundling completes
                  bundleLogger.end(bundleConfig.outputName);

                  if (bundleQueue) {
                    bundleQueue--;
                    if (bundleQueue === 0) {
                      // If queue is empty, tell gulp the task is complete.
                      // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
                      callback();
                    }
                  }
                };

            if (devMode) {
              // Wrap with watchify and rebundle on changes
              b = watchify(b);

              // Rebundle on update
              b.on('update', bundle);
              bundleLogger.watch(bundleConfig.outputName);
            } else {
              // Sort out shared dependencies.
              // b.require exposes modules externally
              if (bundleConfig.require) b.require(bundleConfig.require);

              // b.external excludes modules from the bundle, and expects
              // they'll be available externally
              if (bundleConfig.external) b.external(bundleConfig.external);
            }

            return bundle();
          };

      // Start bundling with Browserify for each bundleConfig specified
      config.bundleConfigs.forEach(browserifyThis);
    };

gulp.task('browserify', browserifyTask);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;

