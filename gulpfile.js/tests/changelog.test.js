var test = require('tape')
var sinon = require('sinon')
var proc = require('child_process')
var changelog = require('../tasks/changelog')

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
  t.plan(3)

  var files = 'file-one.html\n' +
    'file-two.js\n' +
    'file-three'

  sinon.stub(proc, 'exec').callsArgWith(1, null, files, null)

  // var noCommit = changelog.getChangedFiles()
  var changedFiles = changelog.getChangedFiles('test')

  t.throws(function () {
    changelog.getChangedFiles()
  }, /No commit given/, 'throws an error when not given a branch')

  t.ok(changedFiles.then(), 'returns a Promise when given a branch')

  changedFiles.then(function (value) {
    t.equal(value, files, 'returns the Promise value exactly')
  })

  proc.exec.restore()
})

test('changelog - checkForChangelog', function (t) {
  t.plan(3)

  var files1 = 'file-one.html\n' +
    'CHANGELOG.md\n' +
    'file-two.js'

  var files2 = 'file-one.html\n' +
    'file-two.js\n' +
    'file-three.css'

  t.true(
    changelog.checkForChangelog(''),
    'returns true when CHANGELOG.md is empty'
  )

  t.true(
    changelog.checkForChangelog(files1),
    'returns true when CHANGELOG.md is found'
  )

  t.throws(function () {
    changelog.checkForChangelog(files2)
  }, /No CHANGELOG\.md update/, 'returns an Error when CHANGELOG.md cannot be found')
})
