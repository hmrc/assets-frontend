var fs = require('fs')
var path = require('path')
var test = require('tape')
var gutil = require('gulp-util')
var parseDocumentation = require('../util/pattern-library/lib/parseDocumentation')

test('parseDocumentation - returns rendered markdown', function (t) {
  t.plan(1)

  var markdown = '# Test component'

  var files = [
    new gutil.File({
      path: '/',
      contents: Buffer.from(markdown)
    })
  ]

  files = parseDocumentation(files)
  console.log('files[0].contents.toString()', files[0].contents.toString())

  t.ok(
    files[0].contents.toString().includes('<h1 id="test-component">Test component</h1>'),
    'markdown is parsed to html and added to the data object'
  )
})

test('parseDocumentation - parses an include before returning markdown', function (t) {
  t.plan(1)

  var readmeFilePath = path.join(__dirname, 'fixtures', 'components', 'component', 'README.md')
  var files = [
    new gutil.File({
      path: readmeFilePath,
      contents: fs.readFileSync(readmeFilePath)
    })
  ]

  files = parseDocumentation(files)
  console.log('files[0].contents.toString()', files[0].contents.toString())

  t.ok(
    files[0].contents.toString().includes('<div>Example</div>'),
    'with the contents of the include'
  )
})
