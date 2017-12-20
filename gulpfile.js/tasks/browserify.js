'use strict'

/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources
   See browserify.bundleConfigs in gulp/config.js
*/
var browserify = require('browserify')
var collapse = require('bundle-collapser/plugin')
var bundleLogger = require('../util/bundleLogger')
var gulp = require('gulp')
var handleErrors = require('../util/handleErrors')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var config = require('../config').browserify
var _ = require('lodash')
var gutil = require('gulp-util')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')
var glob = require('globby')

var browserifyTask = function (callback, devMode) {
  var env = global.runmode
  var isDev = (env === 'dev')
  var bundleQueue = config.bundleConfigs.length

  var browserifyThis = function (bundleConfig) {
    if (devMode) {
      _.extend(bundleConfig, { debug: true })
    }

    // stop absolute urls appearing in prod browserify'd bundles
    _.extend(bundleConfig, {plugin: collapse})

    var b = browserify(bundleConfig)

    var bundle = function () {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName)

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
        // .pipe(gulpIf(isDev, sourcemaps.write('./')))

        // Specify the output destination
        .pipe(gulp.dest(bundleConfig[env].dest))
        .on('end', reportFinished)
    }

    var reportFinished = function () {
      gutil.log('Bundling complete')

      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName)

      if (bundleQueue) {
        bundleQueue--

        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback()
        }
      }
    }

    // Add extra entry files
    if (bundleConfig.add) b.add(glob.sync(bundleConfig.add))

    // Sort out shared dependencies.
    // b.require exposes modules externally
    if (bundleConfig.require) b.require(bundleConfig.require)

    // b.external excludes modules from the bundle, and expects
    // they'll be available externally
    if (bundleConfig.external) b.external(bundleConfig.external)

    return bundle()
  }

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis)
}

gulp.task('browserify', ['lint:scripts'], browserifyTask)

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask
