'use strict'

const path = require('path')
const gulp = require('gulp')
const config = require('../config')
const compLibConfig = require('../../component-lib.json')

gulp.task('copy:component-library', () => {
  return gulp
    .src([`${config.snapshotDir.v3}/**/*`])
    .pipe(gulp.dest(path.join(compLibConfig.destination, 'public')))
})

gulp.task('copy:design-system', () => {
  return gulp
    .src([`${config.snapshotDir.v4}/**/*`])
    .pipe(gulp.dest(path.join(config.designSystem.dest, 'public')))
})

gulp.task('copy:mdtp-repository-metadata', () => {
  return gulp
    .src(config.designSystem.mdtpRepositoryMetadata)
    .pipe(gulp.dest(config.designSystem.dest))
})
