require('jquery');

/*
Helper to enable elements to control the value of an input else where on the page specified by a data attribute

Control html markup:

<label class="block-label block-label--inline" for="uk-phone-number-toggle-close">Yes
    <input type="radio"
           id="uk-phone-number-toggle-close"
           class="js-toggle-trigger js-control"
           value="yes"
           name="uk-number"
           required
           data-control-target="countryCode"
           data-control-value="44"/>
</label>

Target markup example:

<select class="flush--left" id="countryCode" name="countryCode">
    <option value="0">@Messages("otpfe.enter_mobile.country.default")</option>
    @for(countryCode <- countryCodes) {
        <option value="@countryCode.code"@isSelected(countryCode.code)>@countryCode.country</option>
    }
</select>
 */
var $controlElems;

var setup = function () {
  $controlElems = $('.js-control');
};

var controlEvent = function ($controlElem) {
  var $controlTarget = $('#' + $controlElem.data('controlTarget'));
  var $controlValue = $controlElem.data('controlValue');

  $controlElem.on('click', function () {
    $controlTarget.val($controlValue);
  });
};

var addListeners = function () {
  $controlElems.each(function (index, elem) {
    controlEvent($(elem));
  });
};

module.exports = function () {
  setup();
  if ($controlElems.length) {
    addListeners();
  }
};
