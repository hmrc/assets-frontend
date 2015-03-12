require('jquery');

module.exports = function() {

  var $checkboxToggle = $('[data-toggle-button]'),
      buttonName = $checkboxToggle.data('toggle-button'),
      $toggleButton = $('[name=' + buttonName + ']');

  if (!$checkboxToggle.length) { return false; };

  $toggleButton.prop('disabled', true);

  $checkboxToggle.on('click', function() {
    if ($(this).is(':checked')) {
      $toggleButton.prop('disabled', false);
    }
    else {
      $toggleButton.prop('disabled', true);
    }
  });

};
