var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var globby = require('globby')
var mkdirp = require('mkdirp')

var copyAssets = function (config) {
  if (!config) {
    throw new Error('You must provide a config object')
  }

  var templateDirectory = path.parse(config.template).dir
  var sourceDirectory = path.join(templateDirectory, 'public')
  var destinationDirectory = path.join(config.dest, 'public')

  return globby(path.join(sourceDirectory, '**'))
    .then((files) => {
      return files
        .filter((file) => {
          return fs.statSync(file).isFile()
        })
        .map((file) => {
          var relativeFilePath = path.relative(sourceDirectory, file)

          return new gutil.File({
            path: path.join(destinationDirectory, relativeFilePath),
            contents: fs.readFileSync(file)
          })
        })
        .map((file) => {
          var fileDirectory = path.parse(file.path).dir

          return new Promise((resolve, reject) => {
            mkdirp(fileDirectory, function (error) {
              if (error) {
                reject(new Error(`Cannot create directory ${fileDirectory}`))
              }

              fs.writeFile(file.path, file.contents, function (error) {
                if (error) {
                  reject(new Error(`Cannot write file ${file.path}`))
                }

                resolve('Done!')
              })
            })
          })
        })
    })
    .then((stuff) => {
      return Promise.all(stuff)
    })
}

module.exports = copyAssets
