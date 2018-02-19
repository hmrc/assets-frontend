var fs = require('fs')
var path = require('path')
var Handlebars = require('handlebars')

var registerHandlebarsHelpers = function (helpersDirectoryPaths) {
  if (!helpersDirectoryPaths) {
    return false
  }

  var isString = typeof helpersDirectoryPaths === 'string'
  var isArray = Array.isArray(helpersDirectoryPaths)

  if (!isString && !isArray) {
    throw new Error('Handlebars helpers directory must be a string or an array.')
  }

  if (isString) {
    helpersDirectoryPaths = new Array(helpersDirectoryPaths)
  }

  helpersDirectoryPaths.forEach(function (directoryPath) {
    directoryPath = path.resolve(directoryPath)

    try {
      var helpers = fs.readdirSync(directoryPath)
    } catch (error) {
      throw new Error(`Can't find handlebars helpers directory: ${directoryPath}`)
    }

    helpers.forEach(function (helper) {
      var helperPath = path.join(directoryPath, helper)
      var helperName = path.parse(helper).name

      Handlebars.registerHelper(helperName, require(helperPath))
    })
  })
}

module.exports = registerHandlebarsHelpers
