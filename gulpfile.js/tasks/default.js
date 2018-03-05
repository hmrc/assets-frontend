'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')
const gutil = require('gulp-util')

runSequence.options.showErrorStackTrace = false

const message = (msg, color) => {
  return (gutil.colors[color](msg))
}

gulp.task('default', () => {
  console.log(message('\nBuilding assets-frontend v4.', 'green'))
  console.log(message('If you also need v3 run:', 'green'), message('npm run dev:all\n', 'yellow'))
  runSequence(
    'design-system',
    'server:v4',
    'watch',
    () => {
      console.log(message('\nYour files are now being watched for changes...\n', 'green'))
    }
  )
})

gulp.task('default:all', () => {
  console.log(message('\nBuilding assets-frontend v3 and v4.', 'green'))
  console.log(message('If you only need v4 run:', 'green'), message('npm start\n', 'yellow'))
  runSequence(
    ['design-system', 'component-library'],
    'server:all',
    'watch',
    () => {
      console.log(message('\nYour files are now being watched for changes...\n', 'green'))
    }
  )
})
