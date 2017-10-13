var getFiles = require('./lib/getFiles')
var copyAssets = require('./lib/copyAssets')
var writeFiles = require('./lib/writeFiles')
var addHomepage = require('./lib/addHomepage')
var parseDocumentation = require('./lib/parseDocumentation')
var renderLibraryPages = require('./lib/renderLibraryPages')

var patternLibrary = function (config) {
  return getFiles(config.src)
    .then((files) => {
      return addHomepage(config, files)
    })
    .then(parseDocumentation)
    .then((files) => {
      return renderLibraryPages(config, files)
    })
    .then((files) => {
      return writeFiles(config, files)
    })
    .then(() => {
      return copyAssets(config)
    })
}

module.exports = patternLibrary
