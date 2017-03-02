var test = require('tape')
var sinon = require('sinon')
var gutil = require('gulp-util')
var proc = require('child_process')
var changelog = require('../tasks/changelog')

test('changelog - runCommand', function (t) {
  t.plan(2)

  changelog.runCommand()
    .catch(function (data) {
      t.ok(data instanceof Error, 'returns an Error if the command fails')
    })

  changelog.runCommand('echo "test"')
    .then(function (command) {
      t.equal(command, 'test\n', 'should return a Promise if given a command to run')
    })
})

test('changelog - getCurrentBranch', function (t) {
  t.plan(4)

  var execStub = sinon.stub(proc, 'exec').callsArgWith(1, null, 'test', null)

  var givenBranch = changelog.getCurrentBranch('master')
  var currentBranch = changelog.getCurrentBranch()

  t.throws(function () {
    givenBranch.then()
  }, TypeError, 'does not return a Promise when given a branch name')

  t.equal(givenBranch, 'master', 'returns the branch when given one')

  t.ok(currentBranch.then(), 'returns a Promise when not given a branch name')

  currentBranch.then(function (branch) {
    t.equal(branch, 'test', 'returns the Promise value exactly')
  })

  proc.exec.restore()
})

test('changelog - getChangedFiles', function (t) {
  t.plan(3)

  sinon.stub(gutil, 'log')

  var files = 'file-one.html\n' +
    'file-two.js\n' +
    'file-three'

  var execStub = sinon.stub(proc, 'exec').callsArgWith(1, null, files, null)

  var noBranch = changelog.getChangedFiles(null)
  var changedFiles = changelog.getChangedFiles('branch')

  t.throws(function () {
    noBranch.then()
  }, TypeError, 'throws an error when not given a branch')

  t.ok(changedFiles.then(), 'returns a Promise when given a branch')

  changedFiles.then(function (value) {
    t.equal(value, files, 'returns the Promise value exactly')
  })

  gutil.log.restore()
  proc.exec.restore()
})

test('changelog - checkForChangelog', function (t) {
  t.plan(2)

  sinon.stub(gutil, 'log')

  t.true(
    changelog.checkForChangelog('CHANGELOG.md'),
    'returns true when CHANGELOG.md is found'
  )

  t.throws(function () {
    changelog.checkForChangelog('CHANGELOG')
  }, Error, 'throws an Error when CHANGELOG.md cannot be found')

  gutil.log.restore()
})
