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

function promisifyStream (browserifyInstance, conf) {
  const dest = path.join(config.dest[gutil.env.version], conf.destDirName)

  return new Promise((resolve, reject) => {
    browserifyInstance
      .bundle()
      .pipe(source(conf.outputName))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .on('error', reject)
      .on('end', resolve)
  })
}

gulp.task('browserify', ['lint:scripts'], () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(config => Object.assign(config, {plugin: collapse}))
      .map(config => promisifyStream(browserify(config), config))
  )
})

gulp.task('browserify:v4', ['v4', 'lint:scripts'], () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(config => Object.assign(config, {plugin: collapse}))
      .map(config => {
        promisifyStream(
          browserify(config).ignore('./javascripts'),
          config
        )
      })
  )
})
