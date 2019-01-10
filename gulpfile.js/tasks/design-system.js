'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')
const config = require('../config')
const designSystem = require('../util/design-system')

gulp.task('design-system:generate', () => {
  return designSystem(config.designSystem)
})

gulp.task('design-system', ['build:v4'], (done) => {
  runSequence(
    'design-system:generate',
    'copy:design-system',
    'copy:mdtp-repository-metadata',
    done
  )
})
