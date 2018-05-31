var fs = require('fs')
var path = require('path')
var globby = require('globby')
var copyImageAssets = function (config, files) {
  if (!config || !config.sourceBaseDir) {
    throw new Error('You must provide the source base directory for the design pattern library')
  }
  config.imgFileSizeLimitInMegaBytes = config.imgFileSizeLimitInMegaBytes ? config.imgFileSizeLimitInMegaBytes : 1

  files.map((file) => {
    var srcBaseDir = path.resolve(config.sourceBaseDir)
    var srcBaseDirSize = srcBaseDir.split(path.sep).length
    var srcImagesPath = path.dirname(file.path)
    var relativePath = srcImagesPath.split(path.sep).slice(srcBaseDirSize).join(path.sep)
    var imagePaths = globby.sync(srcImagesPath + path.sep + '*.{png,gif,jpg}')
    imagePaths.forEach((imagePath) => {
      var fileSizeInBytes = fs.statSync(imagePath).size
      var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
      if (fileSizeInMegabytes >= config.imgFileSizeLimitInMegaBytes) {
        throw new Error(`You are trying to use an image with a larger file size than ${config.imgFileSizeLimitInMegaBytes}MB.`)
      }
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          throw err
        }
        fs.writeFile(path.resolve(config.dest + path.sep + relativePath + path.sep + path.basename(imagePath)), data)
      })
    })
    return files
  })
}

module.exports = copyImageAssets
