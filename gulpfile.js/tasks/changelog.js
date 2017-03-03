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

var getCurrentBranch = function (travisBranch) {
  if (travisBranch) {
    return Promise.resolve(travisBranch)
  }

  var cmd = 'git symbolic-ref HEAD | sed \'s!refs/heads/!!\''
  return runCommand(cmd)
}

var getChangedFiles = function (branch) {
  if (!branch) {
    return new Error(gutil.log(gutil.colors.red('ERROR: No branch given')))
  }

  var cmd = 'git diff --name-only master ' + branch
  return runCommand(cmd)
}

var checkForChangelog = function (files) {
  console.log('files', files)

  if (!files.includes('CHANGELOG.md')) {
    throw new Error(gutil.log(gutil.colors.red('ERROR: No CHANGELOG.md update')))
  }

  return Promise.resolve(true)
}

gulp.task('changelog', function (done) {
  getCurrentBranch(process.env.TRAVIS_BRANCH)
    .then(getChangedFiles)
    .then(checkForChangelog)
    .then(function () {
      done()
    })
    .catch(function (err) {
      console.log('err', err)
      done(err)
    })
})

module.exports = {
  runCommand: runCommand,
  getCurrentBranch: getCurrentBranch,
  getChangedFiles: getChangedFiles,
  checkForChangelog: checkForChangelog
}
