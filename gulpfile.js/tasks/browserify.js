'use strict'

const path = require('path')
const browserify = require('browserify')
const collapse = require('bundle-collapser/plugin')
const gulp = require('gulp')
const handleErrors = require('../util/handleErrors')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const config = require('../config')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

function jsToBundle (stream, bundleConfig) {
  return stream
    .bundle()
    .pipe(source(bundleConfig.outputName))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .on('error', handleErrors)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(config.dest[gutil.env.version], bundleConfig.destDirName)))
}

gulp.task('browserify', ['lint:scripts'], () => {
  const bundleConfigs = config.browserify.bundleConfigs

  bundleConfigs.forEach((bundleConfig) => {
    bundleConfig = Object.assign(bundleConfig, {plugin: collapse})

    return jsToBundle(browserify(bundleConfig), bundleConfig)
  })
})

gulp.task('browserify:v4', ['v4', 'lint:scripts'], () => {
  const bundleConfigs = config.browserify.bundleConfigs

  bundleConfigs.forEach((bundleConfig) => {
    bundleConfig = Object.assign(bundleConfig, {plugin: collapse})

    return jsToBundle(
      browserify(bundleConfig).exclude('./javascripts'),
      bundleConfig
    )
  })
})
