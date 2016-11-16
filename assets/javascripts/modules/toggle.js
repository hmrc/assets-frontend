require('jquery');

/*
Helper to enable elements to toggle other elements on the page specified by data attribute
Attach event to parent as delegate, open close dependant on triggers id.

Toggle markup example:

<fieldset class="form-field-group js-visible js-aria-show js-toggle"
          id="uk-number"
          data-target="uk-phone-number-toggle-target"
          data-trigger="js-toggle-trigger"
          data-open="uk-phone-number-toggle-open"
          data-close="uk-phone-number-toggle-close">

    <label class="block-label block-label--inline" for="uk-phone-number-toggle-open">Yes
        <input type="radio"
               id="uk-phone-number-toggle-open"
               class="js-toggle-trigger"
               value="yes"
               name="uk-number"
               required />
    </label>
    <label class="block-label block-label--inline" for="uk-phone-number-toggle-close">No
        <input type="radio"
               id="uk-phone-number-toggle-close"
               class="js-toggle-trigger"
               value="no"
               name="uk-number"
               required
               aria-controls="uk-phone-number-toggle-target"/>
    </label>
</fieldset>

Target markup example:

<div id="uk-phone-number-toggle-target" class="hidden">
 ......
</div>

Toggle markup example:

<fieldset class="form-field-group js-visible js-aria-show js-toggle"
          id="us-number"
          data-trigger="js-toggle-trigger">
    <label class="block-label" for="us-phone-number-toggle-open">Yes
        <input type="radio"
                id="us-phone-number-toggle-open"
                class="js-toggle-trigger"
                data-target="us-phone-number-open-target"
                value="yes"
                name="us-number"
                required />
    </label>
    <div id="us-phone-number-open-target" class="panel-indent hidden">
      <h2>Open</h2>
      <p>Example paragraph text</p>
    </div>
    <label class="block-label" for="us-phone-number-toggle-close">No
        <input type="radio"
                id="us-phone-number-toggle-close"
                class="js-toggle-trigger"
                data-target="us-phone-number-close-target"
                value="no"
                name="us-number"
                required/>
    </label>
    <div id="us-phone-number-close-target" class="panel-indent hidden">
      <h2>Close</h2>
      <p>Example paragraph text</p>
    </div>
</fieldset>

 */

var $toggleElems;

/**
 * Controls for triggering toggle
 * 1 (left mouse click)
 * 32 (space bar)
 * @param $elem
 */
var toggleEvent = function ($elem) {
  var triggerSelector = $elem.data('trigger');
  var $triggerElemSelector = $(triggerSelector[0] === '.' ? triggerSelector : '.' + triggerSelector);
  var targetSelector = $elem.data('target');

  // toggle single target
  if (targetSelector) {
    var openId = $elem.data('open');
    var closeId = $elem.data('close');
    var $target = $('#' + targetSelector);
    $elem.on('click', $triggerElemSelector, function (event) {
      //limit to left mouse click and space bar
      if (event.which === 1 || 32) {
        if (event.target.id === openId) {
          show($target);
        } else if (event.target.id === closeId) {
          hide($target);
        }
      }
    });

  // toggle multiple targets
  } else {
    var $inputs = $elem.find('[data-target]');
    $elem.on('click', $triggerElemSelector, function (event) {
      //limit to left mouse click and space bar
      if (event.which === 1 || 32) {
        var $input = $(event.target);
        if ($input.prop('tagName') === 'LABEL') $input = $input.find('input').first();
        if ($input.prop('tagName') === 'INPUT') {
          show($('#' + $input.data('target')));
          $inputs.not($input).each(function (i, input) {
            hide($('#' + $(input).data('target')));
          });
        }
      }
    });
  }
};

var show = function ($element) {
  $element.removeClass('hidden').attr('aria-expanded', 'true').attr('aria-visible', 'true');
};

var hide = function ($element) {
  $element.addClass('hidden').attr('aria-expanded', 'false').attr('aria-visible', 'false');
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
