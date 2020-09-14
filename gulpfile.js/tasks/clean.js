'use strict'

const del = require('del')
const gulp = require('gulp')
const config = require('../config')

gulp.task('clean:v4', () => del([config.designSystem.dest, config.snapshotDir.v4]))

gulp.task('clean:v3', () => del([config.componentLibrary.dest, config.snapshotDir.v3]))

gulp.task('clean:dist', () => del([config.distDir]))

gulp.task('clean', gulp.series('clean:v3', 'clean:v4'))
