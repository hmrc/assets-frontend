'use strict'

const test = require('tape')
const changelog = require('../tasks/changelog')

test('changelog - runCommand', (t) => {
  t.plan(3)

  changelog
    .runCommand()
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('No command specified'), 'returns exec\'s error message')
    })

  changelog
    .runCommand('echo "test"')
    .then(function (stdout) {
      t.equal(stdout, 'test\n', 'should return a Promise if given a command to run')
    })
})

test('changelog - getCurrentBranch', (t) => {
  t.plan(1)
  t.ok(changelog.getCurrentBranch().then(), 'returns a promise')
})

test('changelog - getGitDiffs', (t) => {
  t.plan(1)
  t.ok(changelog.getGitDiffs().then(), 'returns a promise')
})

test('changelog - isWhitelistBranch', (t) => {
  t.plan(3)
  t.notOk(changelog.isWhitelistBranch(''))
  t.ok(changelog.isWhitelistBranch('  master   \n'))
  t.ok(changelog.isWhitelistBranch('master'))
})

test('changelog - verifyGitDiffs', (t) => {
  t.plan(6)

  changelog
    .verifyGitDiffs()
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('CHANGELOG.md was not updated'), 'returns an error message')
    })

  changelog
    .verifyGitDiffs('file1\nfile2\nfile')
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('CHANGELOG.md was not updated'), 'returns an error message')
    })

  t.ok(changelog.verifyGitDiffs('string').then(), 'returns a promise')

  changelog
    .verifyGitDiffs('file1\nCHANGELOG.md\nfile')
    .then((res) => {
      t.ok(res, 'returns true as CHANGELOG.md is in the list')
    })
})
