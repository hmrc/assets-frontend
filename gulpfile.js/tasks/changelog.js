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
  if (!commit) {
    throw new Error('No commit given')
  }

  var ref = process.env.GIT_PREVIOUS_SUCCESSFUL_COMMIT || 'master'

  var cmd = 'git diff --name-only ' + ref + ' ' + commit
  return runCommand(cmd)
}

var checkForChangelog = function (files) {
  if (files.length && !files.includes('CHANGELOG.md')) {
    throw new Error('No CHANGELOG.md update')
  }

  return true
}

gulp.task('changelog', function (done) {
  var commit = process.env.TRAVIS
    ? process.env.TRAVIS_COMMIT
    : process.env.GIT_COMMIT

  getCurrentCommit(commit)
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
