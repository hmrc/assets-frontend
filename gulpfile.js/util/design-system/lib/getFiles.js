var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')

var statAsync = function (fileOrDirectory) {
  return new Promise(function (resolve, reject) {
    fs.stat(fileOrDirectory, function (error, stats) {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(stats)
      }
    })
  })
}

var readdirAsync = function (directory) {
  return new Promise(function (resolve, reject) {
    fs.readdir(directory, function (error, list) {
      if (error) {
        reject(new Error(`Could not read directory ${directory}`))
      } else {
        resolve(list)
      }
    })
  })
}

var readFileAsync = function (file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function (error, contents) {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(contents)
      }
    })
  })
}

var getFiles = function (config) {
  if (!config || !config.src) {
    throw new Error('You must provide a path to source files.')
  }

  var directoryPaths = config.src

  if (!Array.isArray(directoryPaths)) {
    directoryPaths = new Array(directoryPaths)
  }

  return Promise.all(directoryPaths.map(function (directoryPath) {
    return readdirAsync(directoryPath)
      .then(function (list) {
        return Promise.all(list.map(function (fileOrDirectory) {
          fileOrDirectory = path.resolve(directoryPath, fileOrDirectory)

          return statAsync(fileOrDirectory)
            .then(function (stat) {
              if (stat.isDirectory()) {
                return getFiles(Object.assign({}, config, { src: fileOrDirectory }))
              } else if (fileOrDirectory.includes('README.md')) {
                return readFileAsync(fileOrDirectory)
                  .then(function (contents) {
                    directoryPath = path.parse(fileOrDirectory).dir

                    var file = new gutil.File({
                      path: path.join(directoryPath, 'index.html'),
                      contents: contents
                    })

                    return file
                  })
              } else {
                return []
              }
            })
        }))
      })
      .then(function (files) {
        return Array.prototype.concat.apply([], files)
      })
  }))
  .then(function (files) {
    return Array.prototype.concat.apply([], files)
  })
}

module.exports = getFiles
