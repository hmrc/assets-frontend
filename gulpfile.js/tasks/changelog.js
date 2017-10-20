'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec

function runCommand (cmd) {
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

function getFileChanges (path) {
  if (!path) {
    throw new Error('No path given')
  }

  const ref = process.env.GIT_PREVIOUS_SUCCESSFUL_COMMIT || 'master'
  let cmd = `git diff ${ref} -- ${path}`

  return runCommand(cmd)
}

function verifyChangelogChanges (lines) {
  return new Promise((resolve, reject) => {
    if (!lines) {
      reject(new Error('No CHANGELOG.md update'))
    } else {
      resolve(lines)
    }
  })
}

gulp.task('changelog', (done) => {
  getFileChanges('CHANGELOG.md')
    .then(verifyChangelogChanges)
    .then(() => {
      done()
    })
})

module.exports = {
  runCommand: runCommand,
  getFileChanges: getFileChanges,
  verifyChangelogChanges: verifyChangelogChanges
}
