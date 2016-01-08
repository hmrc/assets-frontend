require('jquery');

/*
Mask
Mask content and show or hide it.

Example:

<div class="js-mask-container">
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
  var showText = $control.data('textShow');
  var hideText = $control.data('textHide');

  $control.on('click', function (event) {
    event.preventDefault();

    var text = $control.text();

    $publicContent.toggleClass('js-visible').toggleClass('js-hidden');
    $secretContent.toggleClass('js-visible').toggleClass('js-hidden');
    $control.text(text === showText ? hideText : showText);
  });
};

var addListeners = function () {
  $maskContainerElems.each(function (index, containerElem) {
    maskControlEvent($(containerElem));
  });
};

module.exports = function () {
  setup();
  if ($maskContainerElems.length) {
    addListeners();
  }
};
