'use strict'

const gulp = require('gulp')
const exec = require('child_process').exec

const CHANGELOG_MD = 'CHANGELOG.md'
const README_MD = 'README.md'

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

function getGitDiffs () {
  return runCommand(`git diff --name-only main...`)
}

function isMerged () {
  return runCommand('git branch -a --contains HEAD')
    .then((results) => results.includes('remotes/origin/main'))
}

function filterFiles (files) {
  return files.filter(file => !file.includes(README_MD))
}

function verifyGitDiffs (diffs) {
  diffs = diffs || ''

  let files = diffs.trim().split('\n')
  let filteredFiles = filterFiles(files)

  return new Promise((resolve, reject) => {
    if (filteredFiles.length === 0) {
      resolve(true)
    } else if (filteredFiles.indexOf(CHANGELOG_MD) !== -1) {
      resolve(true)
    } else {
      reject(new Error('CHANGELOG.md was not updated'))
    }
  })
}

gulp.task('changelog', () => {
  return isMerged()
    .then(isit => {
      return isit
        ? true
        : getGitDiffs().then(verifyGitDiffs)
    })
})

module.exports = {
  runCommand: runCommand,
  getGitDiffs: getGitDiffs,
  filterFiles: filterFiles,
  isMerged: isMerged,
  verifyGitDiffs: verifyGitDiffs
}
