const fs = require('fs')

module.exports = mkdirP

function mkdirP (path, callback) {
  fs.promises.mkdir(path, { recursive: true }).then(function () {
    callback()
  }).catch(function (err) {
    callback(err)
  })
}

mkdirP.sync = function (path, callback) {
  fs.mkdirSync(path, { recursive: true })
}
