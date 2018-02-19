var path = require('path')
var test = require('tape')
var getFiles = require('../util/design-system/lib/getFiles')

test('getFiles - throws if given bad config', function (t) {
  t.plan(3)

  t.throws(
    () => getFiles(),
    /You must provide a path to source files/,
    'throws an error when given nothing'
  )

  t.throws(
    () => getFiles({}),
    /You must provide a path to source files/,
    'throws an error when given an empty object'
  )

  t.throws(
    () => getFiles({ src: '' }),
    /You must provide a path to source files/,
    'throws an error when given an empty src property'
  )
})

test('getFiles - rejects if given bad source paths', function (t) {
  t.plan(2)

  var badString = {
    src: path.join(__dirname, 'not-a-directory')
  }

  var badArray = {
    src: [path.join(__dirname, 'not-a-directory')]
  }

  getFiles(badString)
    .catch((error) => {
      t.ok(
        error.message.includes('Could not read directory'),
        'which is empty when given a non-existent path as a string'
      )
    })

  getFiles(badArray)
    .catch((error) => {
      t.ok(
        error.message.includes('Could not read directory'),
        'which is empty when given a non-existent path as a string'
      )
    })
})

test('getFiles - returns an array of file objects', function (t) {
  t.plan(4)

  var baseDir = path.join(__dirname, 'fixtures')
  var existingPath = path.join(baseDir, 'components')

  var stringConfig = {
    src: existingPath
  }

  var arrayConfig = {
    src: [existingPath]
  }

  getFiles(stringConfig)
    .then((files) => {
      t.equal(
        files.length, 1,
        'which totals the number of READMEs when given an existing path as a string'
      )

      t.ok(
        files[0].contents.toString().includes('# Test component'),
        'and have the content of the README on a contents property'
      )

      t.equal(
        files[0].path,
        path.join(existingPath, 'component', 'index.html'),
        'and has its expected output path as a path property'
      )
    })

  getFiles(arrayConfig)
    .then(function (files) {
      t.equal(
        files.length, 1,
        'which totals the number of existing READMEs when given paths as an array'
      )
    })
})
