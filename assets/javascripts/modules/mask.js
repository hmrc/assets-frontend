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
     data-mask-toggle-target="js-mask-form"
     data-accessible-text="accessible text">
    <span data-toggle-text>Show</span> <span>accessible text</span></a>
  <form method="GET" class="js-mask-form js-hidden">
    <div class="form-field soft--right soft--bottom soft--top">
      <label class="label--full-length bold">Enter your password</label>
      <p class="error-notification hard--bottom" data-error-message-placeholder></p>
      <input class="form-input input--medium" name="password" type="password" />
      <button type="submit" class="button button--padded float--right flush--right">Submit</button>
    </div>
  </form>
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
  var targetSelector = $control.data('mask-toggle-target');

  // listen for success event for secure form
  $control.on('unmask', function(event, data) {
    var text = $control.find('[data-toggle-text]').text();

    // add client secret key
    $publicContent.text(data);

    // toggle to reveal client secret
    toggleValue($publicContent, $secretContent);

    // start timer if it's configured
    if(secondsToTimeout) {
      startTimer(text, $control, $publicContent, $secretContent, secondsToTimeout);
    }
  });

  $control.on('click', function(event) {
    var text = $control.find('[data-toggle-text]').text();

    event.preventDefault();

    // if toggle target selector is provided
    if (targetSelector && targetSelector.length > 0) {
      var $target = $containerElem.find('.' + targetSelector).first();

      // hide is already visible
      if($publicContent.hasClass('js-visible')) {

        toggleState("Hide", $control, $publicContent, $secretContent);

      } else {
        $target.toggleClass('js-visible').toggleClass('js-hidden');

        // update button label
        toggleLabel(text, $control);
      }

    } else {
      toggleState(text, $control, $publicContent, $secretContent);

      // start timer if it's configured
      if(secondsToTimeout) {
        startTimer(text, $control, $publicContent, $secretContent, secondsToTimeout);
      }
    }
  });

};

var addListeners = function () {
  $maskContainerElems.each(function(index, containerElem) {
    maskControlEvent($(containerElem));
  });
};

var toggleLabel = function(text, $control) {

  var showText = $control.data('textShow');
  var hideText = $control.data('textHide');
  var newText  = text === showText ? hideText : showText;
  var accessibleText = $control.data('accessible-text');
  var anchorText = '<span data-toggle-text>' + newText + '</span> <span class="visuallyhidden">' + accessibleText + '</span>';

  $control.html(anchorText);
};

var toggleValue = function($publicContent, $secretContent) {

  $publicContent.toggleClass('js-visible').toggleClass('js-hidden');
  $secretContent.toggleClass('js-visible').toggleClass('js-hidden');

};

var toggleState = function(text, $control, $publicContent, $secretContent) {

  toggleValue($publicContent, $secretContent);
  toggleLabel(text, $control);
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
