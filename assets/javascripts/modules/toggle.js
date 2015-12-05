require('jquery');

/*
Helper to enable elements to toggle other elements on the page specified by data attribute
Attach event to parent as delegate, open close dependant on triggers id.

Toggle markup example:

<fieldset class="form-field-group visible-javascript-on js-aria-show js-toggle"
          id="uk-number"
          data-target="uk-phone-number-toggle-target"
          data-trigger="js-toggle-trigger"
          data-open="uk-phone-number-toggle-open"
          data-close="uk-phone-number-toggle-close"
          aria-hidden="true">

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
    <label class="block-label block-label--inline" for="uk-phone-number-toggle-open">No
        <input type="radio"
               id="uk-phone-number-toggle-open"
               class="js-toggle-trigger js-control"
               value="no"
               name="uk-number"
               required
               data-control-target="countryCode"
               data-control-value="0"
               aria-controls="uk-phone-number-toggle-target"/>
    </label>
</fieldset>

Target markup example:

<div id="uk-phone-number-toggle-target"
     class="toggle-target"
     aria-expanded="false"
     aria-visible="false"
     aria-labelledby="country-code-legend"
     aria-describedby="country-code-hint">
......
</div>
 */
var $toggleElems;

var flushErrors = function ($targetElem) {
  var $inputs = $targetElem.find('input');
  if ($inputs.length) {
    $($inputs[0].form).validate().showErrors();
  }
};

/**
 * Controls for triggering toggle
 * 1 (left mouse click)
 * 32 (space bar)
 * @param $elem
 */
var toggleEvent = function ($elem) {
  var $triggerElemSelector = $($elem.data('trigger'));
  var $targetElem = $('#' + $elem.data('target'));
  var openId = $elem.data('open');
  var closeId = $elem.data('close');
  var target;

  $elem.on('click', $triggerElemSelector, function (event) {

    if (event.which === 1 || 32) { //limit to left mouse click and space bar
      target = event.target;

      if (target.id === openId) {
        $targetElem.show().attr('aria-expanded', 'true').attr('aria-visible', 'true');
        flushErrors($targetElem);
      } else if (target.id === closeId) {
        $targetElem.hide().attr('aria-expanded', 'false').attr('aria-visible', 'false');
        flushErrors($targetElem);
      }
    }
  });
};

var addListeners = function () {
  $toggleElems.each(function (index, elem) {
    toggleEvent($(elem));
  });
};

var setup = function () {
  $toggleElems = $('.js-toggle');
};

var init = function () {
  setup();

  if ($toggleElems.length) {
    addListeners();
  }
};

module.exports = function () {
  return {
    init: init
  };
};
