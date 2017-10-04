var path = require('path')
var test = require('tape')
var getFiles = require('./../util/pattern-library/lib/getFiles')

test('getFiles - only accepts an array or a string', function (t) {
  t.plan(4)

  t.throws(
    () => getFiles(),
    /The design pattern library source must be a string or an array./,
    'throws an error when given nothing'
  )

  t.throws(
    () => getFiles({}),
    /The design pattern library source must be a string or an array./,
    'throws an error when given an object'
  )

  t.ok(getFiles('').then(), 'returns a Promise when given a string')
  t.ok(getFiles([]).then(), 'returns a Promise when given an array')
})

test('getFiles - returns an array of file objects', function (t) {
  t.plan(4)

  var existingPath = path.join(__dirname, 'fixtures', 'components')
  var nonExistentPath = path.join(__dirname, 'fixtures', 'not-a-directory')

  getFiles(nonExistentPath).then((files) => {
    t.equal(
      files.length, 0,
      'which is empty when given a non-existent path as a string'
    )
  })

  getFiles(existingPath).then((files) => {
    t.equal(
      files.length, 1,
      'which totals the number of READMEs when given an existing path as a string'
    )

    t.ok(
      files[0].contents.toString().includes('# Test component'),
      'and have the content of the README on a contents property'
    )
  })

  getFiles([existingPath, nonExistentPath]).then(function (files) {
    t.equal(
      files.length, 1,
      'which totals the number of existing READMEs when given paths as an array'
    )
  })
})
