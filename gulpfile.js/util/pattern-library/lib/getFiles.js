var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')

var statAsync = function (fileOrDirectory) {
  return new Promise(function (resolve, reject) {
    fs.stat(fileOrDirectory, function (error, stats) {
      if (error) {
        resolve([])
      } else {
        resolve(stats)
      }
    })
  })
}

var readdirAsync = function (directory) {
  return new Promise(function (resolve, reject) {
    fs.readdir(directory, function (err, list) {
      if (err) {
        resolve([])
      } else {
        resolve(list)
      }
    })
  })
}

var readFileAsync = function (file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function (err, contents) {
      if (err) {
        resolve([])
      } else {
        resolve(contents)
      }
    })
  })
}

var getFiles = function (directoryPaths) {
  var isString = typeof directoryPaths === 'string'
  var isArray = Array.isArray(directoryPaths)

  if (!isString && !isArray) {
    throw new Error('The design pattern library source must be a string or an array.')
  }

  if (isString) {
    directoryPaths = new Array(directoryPaths)
  }

  return Promise.all(directoryPaths.map(function (directoryPath) {
    return readdirAsync(directoryPath).then(function (list) {
      return Promise.all(list.map(function (fileOrDirectory) {
        fileOrDirectory = path.resolve(directoryPath, fileOrDirectory)

        return statAsync(fileOrDirectory).then(function (stat) {
          if (stat.isDirectory()) {
            return getFiles(fileOrDirectory)
          } else if (fileOrDirectory.includes('README.md')) {
            return readFileAsync(fileOrDirectory).then(function (contents) {
              directoryPath = path.parse(fileOrDirectory).dir

              return new gutil.File({
                path: path.join(directoryPath, 'index.html'),
                contents: contents
              })
            })
          } else {
            return []
          }
        })
      }))
    }).then(function (files) {
      return Array.prototype.concat.apply([], files)
    })
  })).then(function (files) {
    return Array.prototype.concat.apply([], files)
  })
}

module.exports = getFiles
