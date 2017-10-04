var fs = require('fs')
var path = require('path')
var test = require('tape')
var parseDocumentation = require('../util/pattern-library/lib/parseDocumentation')

test('parseDocumentation - returns rendered markdown', function (t) {
  t.plan(1)

  var markdown = '# Test component'
  var files = [{
    contents: Buffer.from(markdown)
  }]

  files = parseDocumentation(files)

  t.equal(
    files[0].contents.toString(),
    '<h1 id="test-component">Test component</h1>\n',
    'markdown is parsed to html and added to the data object'
  )
})

test('parseDocumentation - parses an include before returning markdown', function (t) {
  t.plan(2)

  var readmeFilePath = path.join(__dirname, 'fixtures', 'components', 'component', 'README.md')
  var files = [{
    base: path.parse(readmeFilePath).dir,
    contents: fs.readFileSync(readmeFilePath)
  }]

  files = parseDocumentation(files)

  t.ok(files[0].contents instanceof Buffer, 'contents must be a buffer')
  t.ok(
    files[0].contents.toString().includes('<div>Example</div>'),
    'with the contents of the include'
  )
})
