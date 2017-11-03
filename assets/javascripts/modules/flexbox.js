/* eslint-env jquery */

module.exports = function () {
  if ($('.flex-container').length > 0) {
    $('.flex-container').attr('data-style', 'display: flex;')
    if (navigator.userAgent.match(/MSIE (8\.|9\.|10\.)/)) {
      var flexibility = require('../utils/flexibility.js')
      $(function () {
        flexibility(document.documentElement)
      })
    }
  }
}
