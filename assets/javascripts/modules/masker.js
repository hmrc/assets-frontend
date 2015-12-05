require('jquery');

/**

Masker

Mask characters that have been entered into an input by removing. Masking is enabled using the .js-masker className
and the masker pattern is specified by the data-masker-rule attribute
---------------------------


Example:

<input type="text"
       name="phoneNumber"
       id="phoneNumber"
       value="@registrationForm("phoneNumber").value"
       class="form-control js-masker"
       data-masker-rule="[^\d]"
       required
       aria-required="true"
 />
 */
var $maskedElems;

var maskerEvent = function ($input) {
  $input.on('keyup', function (event) {
    var $elem = $(event.target);
    var rulePattern = $elem.data('maskerRule');
    var regEx = new RegExp(rulePattern, 'g');

    $elem.val($elem.val().replace(regEx, ''));
  });
};

var addListeners = function () {
  $maskedElems.each(function (index, input) {
    maskerEvent($(input));
  });
};

var setup = function () {
  $maskedElems = $('.js-masker');
};

var init = function () {
  setup();

  if ($maskedElems.length) {
    addListeners();
  }
};

module.exports = function () {
  return {
    init: init
  };
};
