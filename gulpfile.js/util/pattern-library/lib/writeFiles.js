var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

var writeFiles = function (config, files) {
  if (!config.dest) {
    throw new Error('You must provide a destination path for the design pattern library')
  }

  files = files.map(function (file) {
    var fileDirectory = path.parse(file.relative).dir
    var outputDirectory = path.join(config.dest, fileDirectory)
    var outputFile = path.join(outputDirectory, file.basename)

    if (config.sourceBaseDir) {
      var relativePathToFile = path.relative(config.sourceBaseDir, file.path)
      var relativePathToDirectory = path.parse(relativePathToFile).dir

      outputDirectory = path.join(config.dest, relativePathToDirectory)
      outputFile = path.join(config.dest, relativePathToFile)
    }

    return new Promise(function (resolve, reject) {
      mkdirp(outputDirectory, function (error) {
        if (error) {
          reject(new Error(`Could not create directory ${outputDirectory}.`))
        }

        var contents = file.contents.toString()

        fs.writeFile(outputFile, contents, function (error) {
          if (error) {
            reject(new Error(`Unable to write file ${outputFile}`))
          }

          resolve('File written')
        })
      })
    })
  })

  return Promise.all(files)
    .then(function () {
      return 'Design pattern library created'
    })
    .catch(function (error) {
      return error
    })
}

module.exports = writeFiles
