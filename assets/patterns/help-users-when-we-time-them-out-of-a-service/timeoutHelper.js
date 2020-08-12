module.exports = {
  setTimeout: function (fn, time) {
    // This exists to make redirects more testable
    return window.setTimeout(fn, time)
  },
  clearTimeout: function (identifier) {
    // This exists to make redirects more testable
    return window.clearTimeout(identifier)
  }
}
