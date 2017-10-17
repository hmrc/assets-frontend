var path = require('path')

var addFileType = function (config, files) {
  if (!config || !config.src) {
    throw new Error('You must provide the design pattern library src path')
  }

  if (!Array.isArray(config.src)) {
    config.src = [config.src]
  }

  var sectionPaths = config.src
    .map((sectionPath) => path.resolve(sectionPath, 'index.html'))

  files.forEach((file) => {
    file.type = (sectionPaths.indexOf(file.path) !== -1) ? 'section' : 'page'
  })

  return files
}

module.exports = addFileType
