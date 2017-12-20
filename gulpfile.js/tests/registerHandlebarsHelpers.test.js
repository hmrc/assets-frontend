var path = require('path')
var test = require('tape')
var sinon = require('sinon')
var Handlebars = require('handlebars')
var registerHandlebarsHelpers = require('../util/pattern-library/lib/registerHandlebarsHelpers')

test('registerHandlebarsHelpers - accepts an optional hendlebars helpers directory', function (t) {
  t.plan(6)

  var nonExistentHelpersDirectory = path.join(__dirname, 'path', 'to', 'non-existent', 'helpers')
  var existentHelpersDirectory = path.join(__dirname, 'fixtures', 'handlebarsHelpers')
  var handlebarsSpy = sinon.spy(Handlebars, 'registerHelper')

  t.notEqual(
    registerHandlebarsHelpers(),
    undefined,
    'doesn\'t throw if not given helpers config'
  )

  t.equal(handlebarsSpy.callCount, 0, 'and doesn\'t call handlebars')

  t.throws(
    () => registerHandlebarsHelpers(nonExistentHelpersDirectory),
    /Can't find handlebars helpers directory/,
    'throws an error when given a non-existent directory'
  )

  t.throws(
    () => registerHandlebarsHelpers({}),
    /Handlebars helpers directory must be a string or an array/,
    'throws an error when given an object'
  )

  registerHandlebarsHelpers(existentHelpersDirectory)
  t.equal(handlebarsSpy.callCount, 1, 'accepts helpers path as a string')

  handlebarsSpy.reset()

  registerHandlebarsHelpers([existentHelpersDirectory])
  t.equal(handlebarsSpy.callCount, 1, 'accepts helpers paths as an array')
  handlebarsSpy.restore()
})
