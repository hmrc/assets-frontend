/* eslint-env jquery */

require('jquery')

module.exports = function () {
  $('form').on('submit', function () {
    $('input[type=submit], button[type=submit]', this).each(function () {
      var $button = $(this)

      // only disable buttons if they don't contain 'ignore-double-submit' data attribute
      if (!$button.data('ignore-double-submit')) {
        $button.prop('disabled', true)
      }
    })
  })
}
