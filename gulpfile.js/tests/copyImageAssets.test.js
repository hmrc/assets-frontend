var fs = require('fs')
var path = require('path')
var del = require('del')
var test = require('tape')
var gutil = require('gulp-util')
var mkdirp = require('../util/mkdir')
var globby = require('globby')
var copyAssetsImages = require('../util/design-system/lib/copyImageAssets')

var sourceBaseDirectory = path.join(__dirname, 'fixtures')
var destinationPath = path.join(__dirname, 'design-system/')
var patternWithImageFixture = path.join(sourceBaseDirectory, 'patterns', 'pattern-with-image', 'index.html')
var patternWithoutImageFixture = path.join(sourceBaseDirectory, 'patterns', 'pattern-without-image', 'index.html')
var patternWithLargeImageFixture = path.join(sourceBaseDirectory, 'patterns', 'pattern-with-large-image', 'index.html')
var patternWithImageOutputPath = path.join(destinationPath, 'patterns', 'pattern-with-image')
var patternWithoutImageOutputPath = path.join(destinationPath, 'patterns', 'pattern-without-image')

function cleanUp () {
  del.sync(destinationPath)
}

function getConfig (destinationPath, sourceBase) {
  var config = {
    dest: destinationPath,
    imgFileSizeLimitInMegaBytes: 1
  }
  if (sourceBase) {
    config.sourceBaseDir = sourceBase
  }
  return config
}

test('copyImageAssets - throws an error is not given a source', function (t) {
  t.plan(1)
  t.throws(() => copyAssetsImages(null, null),
    /You must provide the source base directory for the design pattern library/,
    'throws an error if not given a config')
})

test('copyImageAssets - throws an error when file cannot be written', function (t) {
  t.plan(1)

  var files = [
    new gutil.File({
      path: patternWithImageFixture,
      contents: Buffer.from('')
    })
  ]

  var config = getConfig(destinationPath, sourceBaseDirectory)

  t.throws(() => copyAssetsImages(config, files),
    /no such file or directory/,
    'throws an error if the destination location does not exist')
})

test('copyImageAssets - throws an error when the image is larger than the file size specified in the config.', function (t) {
  t.plan(1)

  var files = [
    new gutil.File({
      path: patternWithLargeImageFixture,
      contents: Buffer.from('')
    })
  ]

  var config = getConfig(destinationPath, sourceBaseDirectory)

  t.throws(() => copyAssetsImages(config, files),
    /You are trying to use an image with a larger file size than/,
    'throws an error if image is too large')
})

test('copyImageAssets - copies image files to destination locations', function (t) {
  t.plan(2)

  mkdirp.sync(patternWithImageOutputPath)
  mkdirp.sync(patternWithoutImageOutputPath)

  var files = [
    new gutil.File({
      path: patternWithImageFixture,
      contents: Buffer.from('')
    }),
    new gutil.File({
      path: patternWithoutImageFixture,
      contents: Buffer.from('')
    })
  ]

  var config = getConfig(destinationPath, sourceBaseDirectory)
  copyAssetsImages(config, files)
  var fileExists = fs.existsSync(path.join(patternWithImageOutputPath, 'image.gif'))
  var imageFilesInDestinationLocation = globby.sync(patternWithoutImageOutputPath + '*.{png,gif,jpg}')
  t.ok(fileExists,
    'image has been created into the destination directory'
  )

  t.equals(imageFilesInDestinationLocation.length, 0,
    'No images exist in destination where there are none in the source')

  cleanUp()
})

test('copyImageAssets - returns the original files array', function (t) {
  t.plan(1)
  var files = [
    new gutil.File({
      path: patternWithoutImageFixture,
      contents: Buffer.from('')
    })
  ]

  var config = getConfig(destinationPath, sourceBaseDirectory)
  var returnedFiles = copyAssetsImages(config, files)
  t.deepEqual(files, returnedFiles, 'files array is unchanged')
})
