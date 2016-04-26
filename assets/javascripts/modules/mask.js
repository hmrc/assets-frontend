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
  <a href="#" class="js-visible js-mask-control" 
     data-text-show="Show" 
     data-text-hide="Hide"
     data-accessible-text="accessible text">
    <span data-toggle-text>Show</span> <span>accessible text</span></a>
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
    var text = $control.find('[data-toggle-text]').text();

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
  var newText  = text === showText ? hideText : showText;
  var accessibleText = $control.data('accessible-text');
  var anchorText = '<span data-toggle-text>' + newText + '</span> <span class="visuallyhidden">' + accessibleText + '</span>';

  $publicContent.toggleClass('js-visible').toggleClass('js-hidden');
  $secretContent.toggleClass('js-visible').toggleClass('js-hidden');
  $control.html(anchorText);

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
