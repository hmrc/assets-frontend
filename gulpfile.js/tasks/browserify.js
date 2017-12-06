'use strict'

const path = require('path')
const browserify = require('browserify')
const collapse = require('bundle-collapser/plugin')
const gulp = require('gulp')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const config = require('../config')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

/**
 * @FIXME: it's here to point out an issue with ignore() fn.
 *
 * We need a workaround for it.
 *
 * @param file
 * @returns {browserify}
 */
browserify.prototype.ignore = function (file) {
  this._ignore.push(file)
  return this
}

function promisifyStream (browserifyInstance, bundleConfig) {
  return new Promise((resolve, reject) => {
    browserifyInstance
      .bundle()
      .pipe(source(bundleConfig.outputName))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(bundleConfig.dest))
      .on('error', reject)
      .on('end', resolve)
  })
}

gulp.task('browserify', [
  'browserify:v3',
  'browserify:v4'
])

gulp.task('browserify:v3', ['v3', 'lint:scripts'], () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(bundleConfig => Object.assign(bundleConfig, {
        plugin: collapse,
        dest: path.join(config.dest[gutil.env.version], bundleConfig.destDirName)
      }))
      .map(bundleConfig => promisifyStream(browserify(bundleConfig), bundleConfig))
  )
})

gulp.task('browserify:v4', ['v4', 'lint:scripts'], () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(bundleConfig => Object.assign(bundleConfig, {
        plugin: collapse,
        dest: path.join(config.dest[gutil.env.version], bundleConfig.destDirName)
      }))
      .map(bundleConfig => {
        promisifyStream(
          browserify(bundleConfig).ignore('./javascripts'),
          bundleConfig
        )
      })
  )
})
