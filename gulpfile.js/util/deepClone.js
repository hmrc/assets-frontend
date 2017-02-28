var deepClone = function (obj) {
  var copy = {}

  Object.keys(obj).forEach(function (key) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = obj[key]

      if (Boolean(obj[key]) && Object.prototype.toString.call(obj[key]) === '[object Object]') {
        copy[key] = deepClone(obj[key])
      }
    }
  })

  return copy
}

module.exports = deepClone
