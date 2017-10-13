var path = require('path')
var test = require('tape')
var addHomepage = require('../util/pattern-library/lib/addHomepage')

test('addHomepage - throws if not given config', function (t) {
  t.plan(1)

  t.throws(
    () => addHomepage(),
    /You must provide a config object/
  )
})

test('addHomepage - does nothing if not given a homepage', function (t) {
  t.plan(1)

  var noHomepageFile = {}
  var files = []

  files = addHomepage(noHomepageFile, files)

  t.equal(files.length, 0, `returns the same object it's given`)
})

test('addHomepage - adds an index file', function (t) {
  t.plan(3)

  var files = []
  var homepage = path.join(__dirname, 'fixtures', 'components', 'component', 'README.md')
  var config = {
    homepage: homepage
  }

  files = addHomepage(config, files)

  t.equal(files.length, 1, 'to the files array given to it')

  t.ok(files[0].path.includes('index.html'), 'with the correct filename')

  t.ok(
    files[0].contents.toString().includes('# Test component'),
    'with the contents of the given file'
  )
})

test('addHomepage - optionally takes a base directory', function (t) {
  t.plan(3)

  var files = []
  var baseDir = path.join(__dirname, 'fixtures', 'components')
  var homepage = path.join(__dirname, 'fixtures', 'README.md')
  var config = {
    sourceBaseDir: baseDir,
    homepage: homepage
  }

  files = addHomepage(config, files)

  t.equal(files.length, 1, 'adds the homepage to the files array')

  t.equal(
    files[0].path,
    path.join(baseDir, 'index.html'),
    'with a path relative to the base directory'
  )

  t.ok(
    files[0].contents.toString().includes('# Test Readme'),
    'with the contents of the given file'
  )
})
