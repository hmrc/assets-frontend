'use strict'

const gulp = require('gulp')
const config = require('../config')
const designSystem = require('../util/design-system')

gulp.task('design-system', ['clean:v4', 'build:v4'], () => {
  gulp.start('design-system:generate')
})

gulp.task('design-system:generate', () => {
  return designSystem(config.designSystem)
    .then(gulp.start('copy:design-system'))
})
