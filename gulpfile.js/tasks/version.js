'use strict'

const fs = require('fs')
const gulp = require('gulp')
const zip = require('gulp-zip')
const NodeGitVersion = require('node-git-versioning')

const config = require('../config')

gulp.task('version', () => {
  const snapshots = fs.readdirSync(config.dest)

  return Promise.all(snapshots.map((snapshot) => {
    const snapshotVersion = snapshot.match(/v(\d)-/)[1]
    const releaseCandidate = NodeGitVersion(`*${snapshotVersion}.*`)

    return Promise.resolve(
      gulp
        .src([
          `${config.dest}${snapshot}/**/*`,
          `!${config.dest}**/*.map`
        ])
        .pipe(zip(`${releaseCandidate}.zip`))
        .pipe(gulp.dest(config.distDir))
    )
  }))
})
