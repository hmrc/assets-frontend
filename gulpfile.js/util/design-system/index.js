var getFiles = require('./lib/getFiles')
var copyImageAssets = require('./lib/copyImageAssets')
var writeFiles = require('./lib/writeFiles')
var addHomepage = require('./lib/addHomepage')
var addFileType = require('./lib/addFileType')
var parseDocumentation = require('./lib/parseDocumentation')
var renderLibraryPages = require('./lib/renderLibraryPages')

var designSystem = function (config) {
  return getFiles(config)
    .then((files) => addFileType(config, files))
    .then((files) => addHomepage(config, files))
    .then(parseDocumentation)
    .then((files) => renderLibraryPages(config, files))
    .then((files) => writeFiles(config, files))
    .then((files) => copyImageAssets(config, files))
}

module.exports = designSystem
