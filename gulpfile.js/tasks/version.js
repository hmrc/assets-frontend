'use strict'

const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const NodeGitVersion = require('./node-git-versioning')

const config = require('../config')
const packageFile = `${config.src}/package-build.json`

const getVersion = (snapshotPath) => {
  const snapshot = path.parse(snapshotPath).name
  const snapshotVersion = snapshot.match(/v(\d)-/)[1]
  return NodeGitVersion(`*${snapshotVersion}.*`)
}

const version = (snapshotVersion) => {
  const version = getVersion(config.snapshotDir[snapshotVersion])

  return gulp
    .src(packageFile)
    .pipe(replace('<%= version %>', version))
    .pipe(rename('package.json'))
    .pipe(gulp.dest(config.snapshotDir[snapshotVersion]))
}

gulp.task('version:v3', () => version('v3'))
gulp.task('version:v4', () => version('v4'))
