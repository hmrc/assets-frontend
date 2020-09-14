/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulpfile.js/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/
const gulp = require('gulp')
const gutil = require('gulp-util')
const requireDir = require('require-dir')

const message = (msg, color) => {
  return (gutil.colors[color](msg))
}

// Require all tasks in gulpfile.js/tasks
requireDir('./tasks', { recurse: false })

gulp.task('build:v3', gulp.series('clean:v3', /* 'lint', */'test:gulpTasks',
  'style:v3', 'images:v3', 'svg:v3',
  'test:v3',
  'error-pages:v3', 'concat:encryption:v3', 'modernizr:v3', 'browserify:v3'
))

gulp.task('build:v4', gulp.series('clean:v4', /* 'lint', */'test:gulpTasks',
  'style:v4', 'images:v4', 'svg:v4',
  'test:v4',
  'error-pages:v4', 'concat:encryption:v4', 'modernizr:v4', 'browserify:v4'
  )
)

gulp.task('build', gulp.series('build:v3', 'build:v4'))

gulp.task('design-system', gulp.series('build:v4',
  'design-system:generate',
  'copy:design-system',
  'copy:mdtp-repository-metadata'
))

gulp.task('component-library', gulp.series(
  'build:v3',
  'kss',
  'copy:component-library'
  )
)

gulp.task('release:v3', gulp.series('changelog', 'clean:dist', 'build:v3', 'version:v3'))

gulp.task('release:v4', gulp.series('changelog', 'clean:dist', 'build:v4', 'version:v4'))

gulp.task('release', gulp.series('release:v3', 'release:v4'))

gulp.task('default', gulp.series(
  (done) => {
    console.log(message('\nBuilding assets-frontend v4.', 'green'))
    console.log(message('If you also need v3 run:', 'green'), message('npm run dev:all\n', 'yellow'))
    done()
  },
  'design-system',
  'server:v4',
  'watch',
  (done) => {
    console.log(message('\nYour files are now being watched for changes...\n', 'green'))
    done()
  }
  )
)

gulp.task('default:all', gulp.series(
  (done) => {
    console.log(message('\nBuilding assets-frontend v3 and v4.', 'green'))
    console.log(message('If you only need v4 run:', 'green'), message('npm start\n', 'yellow'))
    done()
  },
  'design-system',
  'component-library',
  'server:all',
  'watch',
  (done) => {
    console.log(message('\nYour files are now being watched for changes...\n', 'green'))
    done()
  }
  )
)
