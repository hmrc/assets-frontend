/*
 Helper to enable elements to toggle other elements on the page specified by data attribute
 Attach event to parent as delegate, open close dependant on triggers id.

 Toggle markup example:

 <input class="js-toggle-on-value id="uk-number" value="0" name="uk-number" required />

 Target markup example:
 <div data-toggle-on-value-id="uk-phone-number" data-toggle-on-value="1" class="hidden">
 A......
 </div>
 <div data-toggle-on-value-id="uk-phone-number" data-toggle-on-value="2" class="hidden">
 .B.....
 </div>
 <div data-toggle-on-value-id="uk-phone-number" data-toggle-on-value="3" class="hidden">
 ..C....
 </div>
 */
var $toggleOnValueElems;
/**
 * Controls for triggering toggle
 * @param $elem
 */
var toggleOnValueEvent = function ($elem) {
  $elem.on('change', $elem, function () {
    var $targetElems = $("[data-toggle-on-value-id='" + $elem.attr("id") + "']");
    $targetElems.each(function (index, targetElem) {
      var $targetElem = $(targetElem);
      if ($targetElem.data("toggle-on-value") == $elem.val()) {
        show($targetElem);
      } else {
        hide($targetElem);
      }
    });
  });
};

var show = function ($element) {
  $element.removeClass('hidden').attr('aria-expanded', 'true').attr('aria-visible', 'true');
};

var hide = function ($element) {
  $element.addClass('hidden').attr('aria-expanded', 'false').attr('aria-visible', 'false');
};

var addListeners = function () {
  $toggleOnValueElems.each(function (index, elem) {
    toggleOnValueEvent($(elem));
    $(elem).change(); //Trigger a change event to update display for initial value
  });
};

var setup = function () {
  $toggleOnValueElems = $('.js-toggle-on-value');
};

module.exports = function () {
  setup();

  if ($toggleOnValueElems.length) {
    addListeners();
  }
};

