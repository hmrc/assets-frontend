require('jquery');

module.exports = function() {
  var $selectableInputs = $('label[class*=block-label]');

  $selectableInputs
    .find('input[type=radio], input[type=checkbox]')
    .on('focus click', function() {

      var current = $(this).closest('label')[0];
      $(current).addClass('add-focus');
      $selectableInputs.not(current).removeClass('add-focus');
    })
    .on('change', function() {
      if ($(this).attr('type') === 'radio') {
        $(this).closest('label').siblings().removeClass('selected');
      }

      $(this).closest('label').toggleClass('selected', $(this).prop('checked'));
    })
    .on('focusout', function() {
      var current = $(this).closest('label')[0];
      $(current).removeClass('add-focus');
    });
};
