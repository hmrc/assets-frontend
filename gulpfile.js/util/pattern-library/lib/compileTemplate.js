var fs = require('fs')
var Handlebars = require('handlebars')

var compileTemplate = function (templatePath) {
  if (!templatePath) {
    throw new Error('No template provided.')
  }

  if (typeof templatePath !== 'string') {
    throw new Error('Template path must be a string.')
  }

  return new Promise(function (resolve, reject) {
    return fs.readFile(templatePath, function (error, templateSource) {
      if (error) {
        reject(new Error(`Failed to read template ${templatePath}`))
      } else {
        resolve(Handlebars.compile(templateSource.toString()))
      }
    })
  })
}

module.exports = compileTemplate
