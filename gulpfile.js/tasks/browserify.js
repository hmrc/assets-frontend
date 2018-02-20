'use strict'

const path = require('path')
const browserify = require('browserify')
const collapse = require('bundle-collapser/plugin')
const gulp = require('gulp')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const config = require('../config')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const glob = require('globby')

const promisifyStream = (browserifyInstance, bundleConfig) => {
  if (bundleConfig.add) {
    browserifyInstance.add(glob.sync(bundleConfig.add))
  }

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

const getBundleConfig = (bundleConfig, v) => {
  return Object.assign(bundleConfig, {
    plugin: collapse,
    dest: path.join(config.snapshotDir[v], bundleConfig.destDirName)
  })
}

gulp.task('browserify:v3', () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(bundleConfig => getBundleConfig(bundleConfig, 'v3'))
      .map(bundleConfig => promisifyStream(
        browserify(bundleConfig),
        bundleConfig
      ))
  )
})

gulp.task('browserify:v4', () => {
  return Promise.all(
    config.browserify.bundleConfigs
      .map(bundleConfig => getBundleConfig(bundleConfig, 'v4'))
      .map(bundleConfig => promisifyStream(
        browserify(bundleConfig).ignore('javascripts'),
        bundleConfig
      ))
  )
})
