'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec

const MASTER_BRANCH = 'master'

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

function getCurrentBranch () {
  return runCommand('git rev-parse --abbrev-ref HEAD')
}

function getGitDiffs () {
  return runCommand(`git diff --name-only ${MASTER_BRANCH}`)
}

function isWhitelistBranch (branch) {
  return (branch.trim() === MASTER_BRANCH)
}

function verifyGitDiffs (diffs) {
  return new Promise((resolve, reject) => {
    if (!diffs || !diffs.includes('CHANGELOG.md')) {
      reject(new Error('CHANGELOG.md was not updated'))
    } else {
      resolve(true)
    }
  })
}

gulp.task('changelog', () => {
  return getCurrentBranch()
    .then(branch => {
      return isWhitelistBranch(branch)
        ? true
        : getGitDiffs().then(verifyGitDiffs)
    })
})

module.exports = {
  runCommand: runCommand,
  getCurrentBranch: getCurrentBranch,
  getGitDiffs: getGitDiffs,
  isWhitelistBranch: isWhitelistBranch,
  verifyGitDiffs: verifyGitDiffs
}
