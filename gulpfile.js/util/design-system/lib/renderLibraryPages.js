var compileTemplate = require('./compileTemplate')
var renderPagesFromTemplate = require('./renderPagesFromTemplate')
var registerHandlebarsHelpers = require('./registerHandlebarsHelpers')

var renderLibraryPages = function (config, files) {
  registerHandlebarsHelpers(config.helpers)

  return compileTemplate(config.template)
    .then((compiledTemplate) =>
      renderPagesFromTemplate(files, compiledTemplate, config.sourceBaseDir)
    )
    .catch((error) => error)
}

module.exports = renderLibraryPages
