require('jquery');

/*
Helper to enable elements to toggle other elements on the page specified by one or two data attributes.
Attach event to parent as delegate, open close dependant on triggers id.
Two usages:
 1. Toggle visibility of one element
 2. Alternate visibility of two elements

Example #1 - Toggle visibility of one element:

<fieldset class="form-field-group visible-javascript-on js-aria-show js-toggle"
          data-target="target-element"
          data-trigger="js-toggle-trigger"
          data-open="radio-button-to-open"
          data-close="radio-button-to-close">

    <label class="block-label block-label--inline">Yes
        <input type="radio"
               id="radio-button-to-open"
               class="js-toggle-trigger"
               value="yes"
               name="uk-number"
               required />
    </label>
    <label class="block-label block-label--inline">No
        <input type="radio"
               id="radio-button-to-close"
               class="js-toggle-trigger"
               value="no"
               name="uk-number"
               required
               aria-controls="target-element"/>
    </label>
</fieldset>

Target markup:

<div id="target-element" class="hidden">
......
</div>

Example #2 - Alternate visibility of two elements:

<fieldset class="form-field-group visible-javascript-on js-aria-show js-toggle"
          data-target="target-element-1"
          data-target-closed="target-element-2"
          data-trigger="js-toggle-trigger"
          data-open="radio-button-to-open"
          data-close="radio-button-to-close">

    <label class="block-label block-label--inline">Yes
        <input type="radio"
               id="radio-button-to-open"
               class="js-toggle-trigger"
               value="yes"
               name="uk-number"
               required 
               aria-controls="target-element-1"/>
    </label>
    <label class="block-label block-label--inline">No
        <input type="radio"
               id="radio-button-to-close"
               class="js-toggle-trigger"
               value="no"
               name="uk-number"
               required
               aria-controls="target-element-2"/>
    </label>
</fieldset>

Target markup:

<div id="target-element-1">
......
</div>
<div id="target-element-2" class="hidden">
......
</div>
 */
var $toggleElems;

/**
 * Controls for triggering toggle
 * 1 (left mouse click)
 * 32 (space bar)
 * @param $elem
 */
var toggleEvent = function ($elem) {
  var $triggerElemSelector = $($elem.data('trigger'));  
  var $targetElem = $('#' + $elem.data('target'));
  var $targetWhenClosed = $('#' + $elem.data('target-closed'));
  var openId = $elem.data('open');
  var closeId = $elem.data('close');
  var target;

  $elem.on('click', $triggerElemSelector, function (event) {

    if (event.which === 1 || 32) { //limit to left mouse click and space bar
      target = event.target;

      if (target.id === openId) {
        $targetElem.removeClass('hidden').attr('aria-expanded', 'true').attr('aria-visible', 'true');
        $targetWhenClosed.addClass('hidden').attr('aria-expanded', 'false').attr('aria-visible', 'false');
      } else if (target.id === closeId) {
        $targetElem.addClass('hidden').attr('aria-expanded', 'false').attr('aria-visible', 'false');
        $targetWhenClosed.removeClass('hidden').attr('aria-expanded', 'true').attr('aria-visible', 'true');
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

module.exports = function () {
  setup();

  if ($toggleElems.length) {
    addListeners();
  }
};
