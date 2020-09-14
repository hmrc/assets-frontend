'use strict'

const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const config = require('../config')
const compLibConfig = require('../../component-lib.json')

gulp.task('copy:component-library', () => {
  return gulp
    .src([`${config.snapshotDir.v3}/**/*`, './template/**/*', './gulpfile.js/util/component-library/public/**/*'])
    .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))
})

gulp.task('copy:design-system', () => {
  return gulp
    .src([`${config.snapshotDir.v4}/**/*`, './template/**/*', './gulpfile.js/util/design-system/public/**/*'])
    .pipe(gulp.dest(path.join(config.designSystem.dest, 'public')))
})

gulp.task('copy:mdtp-repository-metadata', () => {
  return gulp
    .src(config.designSystemRepositoryMetadata)
    .pipe(rename('repository.yaml'))
    .pipe(gulp.dest(config.designSystem.dest))
})
