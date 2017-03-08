'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var proc = require('child_process')

var runCommand = function (cmd) {
  return new Promise(function (resolve, reject) {
    proc.exec(cmd, function (err, stdout, stderr) {
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

var getCurrentCommit = function (commit) {
  return new Promise(function (resolve, reject) {
    if (commit) {
      resolve(commit)
    } else {
      var cmd = 'git rev-parse HEAD'
      runCommand(cmd).then(resolve)
    }
  })
}

var getChangedFiles = function (commit) {
  if (commit) {
    var cmd = 'git diff --name-only master ' + commit
    return runCommand(cmd)
  }

  return Promise.reject(new Error('No commit given'))
}

var checkForChangelog = function (files) {
  if (!files.includes('CHANGELOG.md')) {
    return Promise.reject(new Error('No CHANGELOG.md update'))
  }

  return true
}

gulp.task('changelog', function (done) {
  getCurrentCommit(process.env.TRAVIS_COMMIT)
    .then(getChangedFiles)
    .then(checkForChangelog)
    .then(function () {
      done()
    })
    .catch(function (err) {
      gutil.log(gutil.colors.red(err))
      done(err)
    })
})

module.exports = {
  runCommand: runCommand,
  getCurrentCommit: getCurrentCommit,
  getChangedFiles: getChangedFiles,
  checkForChangelog: checkForChangelog
}
