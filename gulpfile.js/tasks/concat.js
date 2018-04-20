'use strict'

const path = require('path')
const gulp = require('gulp')
const config = require('../config')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

const concatEncryption = (v) => {
  const dest = path.join(config.snapshotDir[v], config.scripts.destDirName)

  return gulp.src(config.scripts.encryptionSrc)
    .pipe(concat('encryption.js'))
    .pipe(uglify({ ie8: true }))
    .pipe(rename((path) => {
      path.extname = '.min.js'
    }))
    .pipe(gulp.dest(dest))
}

const concatAudit = (v) => {
  const dest = path.join(config.snapshotDir[v], config.scripts.destDirName)

  return gulp.src(config.scripts.auditSrc)
    .pipe(concat('audit.js'))
    .pipe(uglify({ ie8: true }))
    .pipe(rename((path) => {
      path.extname = '.min.js'
    }))
    .pipe(gulp.dest(dest))
}

gulp.task('concat:encryption:v3', () => {
  return concatEncryption('v3')
})

gulp.task('concat:encryption:v4', () => {
  return concatEncryption('v4')
})

gulp.task('concat:audit:v3', () => {
  return concatAudit('v3')
})

gulp.task('concat:audit:v4', () => {
  return concatAudit('v4')
})
