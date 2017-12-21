var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var Handlebars = require('handlebars')
var compileTemplate = require('../util/pattern-library/lib/compileTemplate')

test('compileTemplate - compiles a template at a given path', (t) => {
  t.plan(4)

  var handlebarsSpy = sinon.spy(Handlebars, 'compile')

  var nonExistentTemplate = path.join('path', 'to', 'non-existent', 'template')
  var existingTemplate = path.join(__dirname, 'fixtures', 'pattern-library', 'design-pattern-library-template.html')

  t.throws(
    () => compileTemplate(),
    /No template provided/,
    'throws an error when given an empty object'
  )

  t.throws(
    () => compileTemplate({}),
    /Template path must be a string/,
    'throws an error when given an empty object'
  )

  compileTemplate(nonExistentTemplate)
    .catch((error) => {
      t.equal(
        error.message,
        'Failed to read template ' + path.join('path', 'to', 'non-existent', 'template'),
        'throws an error when given a bad template path'
      )
    })

  compileTemplate(existingTemplate)
    .then((compiledTemplate) => {
      t.ok(
        handlebarsSpy.calledOnce,
        'returns the compiled template as a Promisified function'
      )
      handlebarsSpy.restore()
    })
})
