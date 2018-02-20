'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

runSequence.options.showErrorStackTrace = false

gulp.task('default', () => {
  console.log('\nBuilding assets-frontend v4.'.green)
  console.log('If you also need v3, run: '.green, 'npm run dev:all\n'.yellow)

  runSequence(
    'design-system',
    'server',
    'watch',
    () => { console.log('\nYour files are now watched for changes...\n'.green) }
  )
})
