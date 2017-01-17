/* eslint-env jquery */

require('jquery')

/*
Password reveal helper to show password <data-target> on click.

Password input:

 <label class="form-element-bold" for="password">
    Create your password
    <input type="password" id="password"/>
 </label>

Password reveal markup example:

 <div class="form-field js-visible">
    <label class="block-label" for="password-reveal">
      Show password
      <input type="checkbox" class="js-password-reveal" id="password-reveal" data-target="password"/>
    </label>
 </div>

 */
var $passwordRevealInputs

var $passwordRevealEvent = function ($passwordRevealInput) {
  $passwordRevealInput.on('click', function () {
    var $passwordInput = $('#' + $passwordRevealInput.attr('data-target'))
    var isChecked = $passwordRevealInput.is(':checked')

    $passwordInput.attr('type', isChecked ? 'text' : 'password')
  })
}

var addListeners = function () {
  $passwordRevealInputs.each(function (index, passwordRevealInput) {
    $passwordRevealEvent($(passwordRevealInput))
  })
}

var setup = function () {
  $passwordRevealInputs = $('.js-password-reveal')
}

module.exports = function () {
  setup()

  if ($passwordRevealInputs.length) {
    addListeners()
  }
}
