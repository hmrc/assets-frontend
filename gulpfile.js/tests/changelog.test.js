var test = require('tape')
var sinon = require('sinon')
var gutil = require('gulp-util')
var proc = require('child_process')
var changelog = require('../tasks/changelog')

test('changelog - runCommand', function (t) {
  t.plan(3)

  changelog.runCommand()
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error if the command fails')
      t.ok(err.message.includes('Command failed'), 'returns exec\'s error message')
    })

  changelog.runCommand('echo "test"')
    .then(function (stdout) {
      t.equal(stdout, 'test\n', 'should return a Promise if given a command to run')
    })
})

test('changelog - getCurrentCommit', function (t) {
  t.plan(5)

  var sha = 'abcd123'
  var execStub = sinon.stub(proc, 'exec').callsArgWith(1, null, sha, null)

  var givenCommit = changelog.getCurrentCommit(sha)
  var currentCommit = changelog.getCurrentCommit()

  t.ok(givenCommit.then(), 'returns a Promise when given a commit sha')
  t.ok(currentCommit.then(), 'returns a Promise when not given a commit sha')
  t.ok(execStub.calledOnce, 'only calls git when not given a commit sha')

  givenCommit.then(function (branch) {
    t.equal(branch, sha, 'returns the result of git exactly when given a sha')
  })

  currentCommit.then(function (branch) {
    t.equal(branch, sha, 'returns the result of git exactly when not given a sha')
  })

  proc.exec.restore()
})

test('changelog - getChangedFiles', function (t) {
  t.plan(4)

  var files = 'file-one.html\n' +
    'file-two.js\n' +
    'file-three'

  sinon.stub(proc, 'exec').callsArgWith(1, null, files, null)

  var noBranch = changelog.getChangedFiles()
  var changedFiles = changelog.getChangedFiles('test')

  noBranch.catch(function (err) {
    t.ok(err instanceof Error, 'returns an error when not given a branch')
    t.ok(err.message.includes('No commit given'), 'returns an approptiate error message')
  })

  t.ok(changedFiles.then(), 'returns a Promise when given a branch')

  changedFiles.then(function (value) {
    t.equal(value, files, 'returns the Promise value exactly')
  })

  proc.exec.restore()
})

test('changelog - checkForChangelog', function (t) {
  t.plan(3)

  var files = 'file-one.html\n' +
    'CHANGELOG.md\n' +
    'file-three'

  t.true(
    changelog.checkForChangelog(files),
    'returns true when CHANGELOG.md is found'
  )

  changelog.checkForChangelog('CHANGELOG')
    .catch(function (err) {
      t.ok(err instanceof Error, 'returns an Error when CHANGELOG.md cannot be found')
      t.equal(err.message, 'No CHANGELOG.md update', 'returns an approptiate error message')
    })
})
