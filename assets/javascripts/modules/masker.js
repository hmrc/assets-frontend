require('jquery');
var caretPosition = require('../utils/caretPosition.js');

/**
 Input Masker

 Only allow specified characters to be entered into an input. Masking is enabled using the .js-masker className
 and the masker pattern is specified by the data-masker-rule attribute. Only characters that match the data-masker-rule
 will be accepted by the specified input.
 ---------------------------

 Example:

 <input type="text"
        name="phoneNumber"
        id="phoneNumber"
        value="@registrationForm("phoneNumber").value"
        class="form-control js-masker"
        data-masker-rule="\d"
        required
        aria-required="true"
        />
 */
var $maskedElems;

var masker = function () {
  var cursorPosition;
  return function () {
    var rule = this.getAttribute('data-masker-rule');
    var regEx = new RegExp(rule, 'g');
    var matches = this.value.match(regEx);
    var returnValue = matches && matches.join('') || '';

    cursorPosition = caretPosition.get(this);
    this.value = returnValue;
    caretPosition.set(this, cursorPosition);
  };
};

var maskerEvent = function ($input) {
  $input.on('keyup', masker());
};

var addListeners = function () {
  $maskedElems.each(function (index, input) {
    maskerEvent($(input));
  });
};

var setup = function () {
  $maskedElems = $('.js-masker');
};

module.exports = function () {
  setup();

  if ($maskedElems.length) {
    addListeners();
  }
};
