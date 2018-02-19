var path = require('path')
var test = require('tape')
var renderLibraryPages = require('../util/design-system/lib/renderLibraryPages')

var templatePath = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')
var helpersPath = path.join(__dirname, 'fixtures', 'handlebarsHelpers')

test('renderLibraryPages - takes config and an array of file objects', function (t) {
  t.plan(4)

  var files = [{
    path: path.resolve('category/thing.html'),
    relative: 'category/thing.html',
    contents: Buffer.from('<h1>Test content</h1>')
  }]

  t.throws(
    () => renderLibraryPages({}, files),
    /No template provided/,
    'throws if given an empty config object'
  )

  t.throws(
    () => renderLibraryPages(getConfig(undefined, helpersPath), files),
    /No template provided/,
    'throws if not given a path to a template'
  )

  renderLibraryPages(getConfig(templatePath, undefined), files)
    .then((files) => {
      t.equal(files.length, 1, 'optionally takes a path to handlebars helpers - undefined')
    })

  renderLibraryPages(getConfig(templatePath, helpersPath), files)
    .then((files) => {
      t.equal(files.length, 1, 'optionally takes a path to handlebars helpers - path')
    })
})

function getConfig (template, helpers) {
  var config = {}
  if (template) { config.template = template }
  if (helpers) { config.helpers = helpers }
  return config
}
