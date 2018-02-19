var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')

var addHomepage = function (config, files) {
  if (!config) {
    throw new Error('You must provide a config object')
  }

  if (!config.homepage) {
    return files
  }

  var filePath = (config.sourceBaseDir)
    ? path.join(config.sourceBaseDir, 'index.html')
    : path.resolve('index.html')

  var homepageFile = new gutil.File({
    path: filePath,
    contents: fs.readFileSync(config.homepage)
  })

  homepageFile.type = 'section'

  files.unshift(homepageFile)

  return files
}

module.exports = addHomepage
