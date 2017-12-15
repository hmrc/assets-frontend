'use strict'

const endOfLine = require('os').EOL
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
    .runCommand('echo test')
    .then(function (stdout) {
      t.equal(stdout, 'test' + endOfLine, 'should return a Promise if given a command to run')
    })
})

test('changelog - getCurrentBranchRevision', (t) => {
  t.plan(1)
  t.ok(changelog.getCurrentBranchRevision().then(), 'returns a promise')
})

test('changelog - getMasterRevision', (t) => {
  t.plan(1)
  t.ok(changelog.getMasterRevision().then(), 'returns a promise')
})

test('changelog - getGitDiffs', (t) => {
  t.plan(1)
  t.ok(changelog.getGitDiffs().then(), 'returns a promise')
})

test('changelog - filterFiles', (t) => {
  t.plan(3)

  t.equal(changelog.filterFiles(['README.md', 'another.md']).length, 1, 'returns 1 as only README has filtered')
  t.equal(changelog.filterFiles(['README.md', 'README.md', 'README.md', 'README.md', 'another.md']).length, 1, 'returns 1 as only README has filtered')
  t.equal(changelog.filterFiles(['README.md', 'another.md'])[0], 'another.md', 'returns a string representing the only item')
})

test('changelog - verifyGitDiffs', (t) => {
  t.plan(9)

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

  changelog
    .verifyGitDiffs('file1\nREADME.md\nfolder1/README.md')
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

  changelog
    .verifyGitDiffs('README.md\nfolder1/README.md\nfolder2/README.md')
    .then((res) => {
      t.ok(res, 'returns true as CHANGELOG.md should not be changed')
    })
})
