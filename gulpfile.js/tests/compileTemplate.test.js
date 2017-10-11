var path = require('path')
var test = require('tape')
var compileTemplate = require('../util/pattern-library/lib/compileTemplate')

test('compileTemplate - compiles a template at a given path', function (t) {
  t.plan(4)

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
    .catch(function (error) {
      t.equal(
        error.message,
        'Failed to read template path/to/non-existent/template',
        'throws an error when given a bad template path'
      )
    })

  compileTemplate(existingTemplate)
    .then(function (compiledTemplate) {
      t.equal(
        {}.toString.call(compiledTemplate),
        '[object Function]',
        'returns the compiled template as a Promisified function'
      )
    })
})
