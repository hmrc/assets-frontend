'use strict'

const test = require('tape')
const changelog = require('../tasks/changelog')

test('changelog - runCommand', function (t) {
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

test('changelog - getFileChanges', function (t) {
  t.plan(2)

  t.throws(() => {
    changelog.getFileChanges()
  }, /No path given/, 'throws an error when not given a path')

  t.ok(changelog.getFileChanges('string').then(), 'returns a promise')
})

test('changelog - verifyChangelogChanges', function (t) {
  t.plan(5)

  changelog.verifyChangelogChanges()
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('No CHANGELOG.md update'), 'returns exec\'s error message')
    })

  changelog.verifyChangelogChanges('')
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('No CHANGELOG.md update'), 'returns exec\'s error message')
    })

  changelog.verifyChangelogChanges('change')
    .then(function (res) {
      t.ok(res, 'change', 'returns the input text')
    })
})
