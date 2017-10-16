var compileTemplate = require('./compileTemplate')
var renderPagesFromTemplate = require('./renderPagesFromTemplate')
var registerHandlebarsHelpers = require('./registerHandlebarsHelpers')

var renderLibraryPages = function (config, files) {
  registerHandlebarsHelpers(config.helpers)

  return compileTemplate(config.template)
    .then(function (compiledTemplate) {
      return renderPagesFromTemplate(files, compiledTemplate)
    })
    .catch(function (error) {
      return error
    })
}

module.exports = renderLibraryPages
