/* eslint-env jquery */

require('jquery')

module.exports = function (el) {
  el.on('click', function () {
    // needs to trigger click as some links rely on single sign-on functionality to work
    $(this).find('a')[0].click()
  })
}
