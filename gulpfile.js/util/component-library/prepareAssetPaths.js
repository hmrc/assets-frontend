'use strict'

var path = require('path')

module.exports = function (assetPaths, prefix) {
  prefix = prefix || ''

  return assetPaths.map(function (assetPath) {
    var markup = ''
    var ext = path.parse(assetPath).ext

    switch (ext) {
      case '.css':
        markup = '<link rel="stylesheet" href="' + prefix + assetPath + '">'
        break

      case '.js':
        markup = '<script src="' + prefix + assetPath + '"></script>'
        break

      default:
        markup = ''
    }

    return markup
  }).join('\n')
}
