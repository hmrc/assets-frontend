var fs = require('fs')
var path = require('path')
var globby = require('globby')
var copyImageAssets = function (config, files) {
  if (!config || !config.sourceBaseDir) {
    throw new Error('You must provide the source base directory for the design pattern library')
  }
  config.imgFileSizeLimitInMegaBytes = config.imgFileSizeLimitInMegaBytes ? config.imgFileSizeLimitInMegaBytes : 1

  var srcBaseDir = path.resolve(config.sourceBaseDir)
  var srcBaseDirSize = srcBaseDir.split(path.sep).length
  files.map((file) => {
    var srcImagesPath = path.dirname(file.path)
    var relativePath = srcImagesPath.split(path.sep).slice(srcBaseDirSize).join(path.sep)
    var imagePaths = globby.sync(srcImagesPath + path.sep + '*.{png,gif,jpg}')
    imagePaths.forEach((imagePath) => {
      var fileSizeInBytes = fs.statSync(imagePath).size
      var fileSizeInMegabytes = fileSizeInBytes / 1000000.0
      if (fileSizeInMegabytes >= config.imgFileSizeLimitInMegaBytes) {
        throw new Error(`You are trying to use an image with a larger file size than ${config.imgFileSizeLimitInMegaBytes}MB.`)
      }
      var data = fs.readFileSync(imagePath)
      try {
        fs.writeFileSync(path.resolve(config.dest + path.sep + relativePath + path.sep + path.basename(imagePath)), data)
      } catch (e) {
        throw e
      }
    })
  })
  return files
}

module.exports = copyImageAssets
