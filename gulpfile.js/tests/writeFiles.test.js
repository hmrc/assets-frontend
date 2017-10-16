var fs = require('fs')
var del = require('del')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var writeFiles = require('../util/pattern-library/lib/writeFiles')

var destination = path.join(__dirname, 'pattern-library')
var baseDirectory = path.join(__dirname, 'fixtures', 'components')

test('writeFiles - throws an error if not given a destination', function (t) {
  t.plan(1)

  var files = []
  var config = getConfig('')

  t.throws(
    () => writeFiles(config, files),
    /You must provide a destination path for the design pattern library/,
    'throws an error if not given a destination'
  )
})

test('writeFiles - writes a file to a given destination', function (t) {
  t.plan(3)

  var destination = path.join(__dirname, 'pattern-library')
  var filePath = path.join('category', 'thing.html')
  var contents = '<h1>Test</h1>'

  var files = [
    new gutil.File({
      path: filePath,
      contents: Buffer.from(contents)
    })
  ]

  del.sync([destination])

  var config = getConfig(destination)

  writeFiles(config, files)
    .then(function (message) {
      var outputFile = fs.readFileSync(path.join(destination, filePath))

      t.ok(
        outputFile,
        'creates an HTML file'
      )

      t.equal(
        outputFile.toString(),
        contents,
        'with the file contents as the HTML file\'s contents'
      )

      t.equal(
        message,
        'Design pattern library created',
        'and returns a sucess message'
      )
    })
    .then(function () {
      del.sync([destination])
    })
})

test('writeFiles - writes multiple files to a directory structure', function (t) {
  t.plan(2)

  var destination = path.join(__dirname, 'pattern-library')

  var files = [
    new gutil.File({
      path: path.join('category', 'thing.html'),
      contents: Buffer.from('Thing')
    }),
    new gutil.File({
      path: path.join('index.html'),
      contents: Buffer.from('Index')
    })
  ]

  var config = getConfig(destination)

  del.sync([destination])

  writeFiles(config, files)
    .then((message) => {
      var expectedRootDirectory = fs.readdirSync(destination)
      var expectedCategoryDirectory = fs.readdirSync(path.join(destination, 'category'))

      t.deepEqual(
        expectedRootDirectory,
        ['category', 'index.html'],
        'with an index.html page and a category directory'
      )

      t.deepEqual(
        expectedCategoryDirectory,
        ['thing.html'],
        'and a thing.html page in the category directory'
      )
    })
    .then(() => {
      del.sync([destination])
    })
})

test('writeFiles - takes an optional base directory', function (t) {
  t.plan(3)

  var files = [
    new gutil.File({
      path: path.join(baseDirectory, 'category', 'thing.html'),
      contents: Buffer.from('Thing')
    }),
    new gutil.File({
      path: path.join(baseDirectory, 'index.html'),
      contents: Buffer.from('Index')
    })
  ]

  var config = getConfig(destination, baseDirectory)

  del.sync([destination])

  writeFiles(config, files)
    .then((message) => {
      t.deepEqual(
        fs.readdirSync(destination),
        ['category', 'index.html'],
        `and writes files to a relative destination`
      )

      t.deepEqual(
        fs.readdirSync(path.join(destination, 'category')),
        ['thing.html'],
        `with the correct directory structure`
      )

      t.equal(
        message,
        'Design pattern library created',
        'and returns a sucess message'
      )
    })
    .then(() => {
      del.sync([destination])
    })
})

function getConfig (destinationPath, sourceBase) {
  var config = {
    dest: destinationPath
  }

  if (sourceBase) {
    config.sourceBaseDir = sourceBase
  }

  return config
}
