require('jquery');

/*
Mask
Mask content and show or hide it.

Example:

<div class="js-mask-container" data-mask-timer="20">
  <span>
    <span class="js-visible js-mask-secret">mask</span>
    <span class="js-hidden js-mask-revealed">secret</span>
  </span>
  <a href="#" class="js-visible js-mask-control" data-text-show="Show" data-text-hide="Hide">Show</a>
</div>
 */


var $maskContainerElems;

var setup = function () {
  $maskContainerElems = $('.js-mask-container');
};

var maskControlEvent = function ($containerElem) {
  var $control = $containerElem.find('.js-mask-control').first();
  var $publicContent = $containerElem.find('.js-mask-revealed').first();
  var $secretContent = $containerElem.find('.js-mask-secret').first();
  var secondsToTimeout = $containerElem.data('mask-timer');

  $control.on('click', function(event) {
    var text = $control.text();

    event.preventDefault();

    toggleState(text, $control, $publicContent, $secretContent);

    // start timer if it's configured
    if(secondsToTimeout) {
      startTimer(text, $control, $publicContent, $secretContent, secondsToTimeout);
    }

  });

};

var addListeners = function () {
  $maskContainerElems.each(function(index, containerElem) {
    maskControlEvent($(containerElem));
  });
};

var toggleState = function(text, $control, $publicContent, $secretContent) {

  var showText = $control.data('textShow');
  var hideText = $control.data('textHide');

  $publicContent.toggleClass('js-visible').toggleClass('js-hidden');
  $secretContent.toggleClass('js-visible').toggleClass('js-hidden');
  $control.text(text === showText ? hideText : showText);

};

var startTimer = function(text, $control, $publicContent, $secretContent, secondsToTimeout) {

  setTimeout(function() {

    if($publicContent.is(':visible')) {
      toggleState("Hide", $control, $publicContent, $secretContent);
    }

  }, parseFloat(secondsToTimeout, 10) * 1000);

};

module.exports = function () {
  setup();
  if ($maskContainerElems.length) {
    addListeners();
  }
};
