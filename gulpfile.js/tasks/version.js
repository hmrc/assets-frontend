'use strict'

const path = require('path')
const gulp = require('gulp')
const tar = require('gulp-tar')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const NodeGitVersion = require('node-git-versioning')

const config = require('../config')
const packageFile = `${config.src}/package-build.json`

const getVersion = (snapshotPath) => {
  const snapshot = path.parse(snapshotPath).name
  const snapshotVersion = snapshot.match(/v(\d)-/)[1]
  return NodeGitVersion(`*${snapshotVersion}.*`)
}

const writePackageFile = (snapshotVersion) => {
  const version = getVersion(config.snapshotDir[snapshotVersion])

  return gulp
    .src(packageFile)
    .pipe(replace('<%= version %>', version))
    .pipe(rename('package.json'))
    .pipe(gulp.dest(config.snapshotDir[snapshotVersion]))
}

const createTar = (snapshotVersion) => {
  const version = getVersion(config.snapshotDir[snapshotVersion])

  return gulp
    .src([
      `${config.snapshotDir[snapshotVersion]}/**/*`,
      `!${config.snapshotDir[snapshotVersion]}**/*.map`
    ])
    .pipe(tar(`${version}.tar`))
    .pipe(gulp.dest(config.distDir))
}

gulp.task('writePackageFile:v3', () => writePackageFile('v3'))
gulp.task('writePackageFile:v4', () => writePackageFile('v4'))
gulp.task('version:v3', ['writePackageFile:v3'], () => createTar('v3'))
gulp.task('version:v4', ['writePackageFile:v4'], () => createTar('v4'))
