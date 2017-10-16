var test = require('tape')
var prepareAssetPaths = require('../util/component-library/prepareAssetPaths')

test('prepareAssetPaths - Creates links from an array of css paths', function (t) {
  t.plan(2)

  var prefix = '../'

  var css = [
    'path/to/styles.css',
    'path/to/more/styles.css'
  ]

  var linksWithPrefix = prepareAssetPaths(css, prefix)
  var expectedWithPrefix = '<link rel="stylesheet" href="' + prefix + css[0] + '">\n' +
    '<link rel="stylesheet" href="' + prefix + css[1] + '">'

  var linksWithoutPrefix = prepareAssetPaths(css)
  var expectedWithoutPrefix = '<link rel="stylesheet" href="' + css[0] + '">\n' +
    '<link rel="stylesheet" href="' + css[1] + '">'

  t.equal(linksWithPrefix, expectedWithPrefix, 'with a prefix')
  t.equal(linksWithoutPrefix, expectedWithoutPrefix, 'without a prefix')
})

test('prepareAssetPaths - Creates links from an array of js paths', function (t) {
  t.plan(2)

  var prefix = '../'

  var js = [
    'path/to/scripts.js',
    'path/to/more/scripts.js'
  ]

  var scriptsWithPrefix = prepareAssetPaths(js, prefix)
  var expectedWithPrefix = '<script src="' + prefix + js[0] + '"></script>\n' +
    '<script src="' + prefix + js[1] + '"></script>'

  var scriptsWithoutPrefix = prepareAssetPaths(js)
  var expectedWithoutPrefix = '<script src="' + js[0] + '"></script>\n' +
    '<script src="' + js[1] + '"></script>'

  t.equal(scriptsWithPrefix, expectedWithPrefix, 'with a prefix')
  t.equal(scriptsWithoutPrefix, expectedWithoutPrefix, 'without a prefix')
})
