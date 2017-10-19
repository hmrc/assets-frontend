'use strict';

const gulp = require('gulp')
const gutil = require('gulp-util')
const exec = require('child_process').exec

let runCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    if (!cmd) {
      reject(new Error('No command specified.'))
    }

    exec(cmd, function (err, stdout, stderr) {
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}

let getFileChanges = (path) => {
  if (!path) {
    throw new Error('No path given')
  }

  let cmd = `git diff origin/master -- ${path}`

  return runCommand(cmd)
}

let verifyChangelogChanges = (lines) => {
  return new Promise((resolve, reject) => {
    if (lines.length === 0) {
      reject(new Error('No CHANGELOG.md update'))
    } else {
      resolve();
    }
  })
}

gulp.task('changelog', (done) => {
  getFileChanges('CHANGELOG.md')
    .then(verifyChangelogChanges)
    .then(() => {
      done()
    })
    .catch((err) => {
      gutil.log(gutil.colors.red(err))
      done(err)
    })
})

module.exports = {
  runCommand: runCommand,
  getFileChanges: getFileChanges,
  verifyChangelogChanges: verifyChangelogChanges
}
