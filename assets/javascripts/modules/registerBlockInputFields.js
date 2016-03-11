require('jquery');

module.exports = function() {
  var $selectableInputs = $('label[class*=block-label]');

  $selectableInputs
    .find('input[type=radio], input[type=checkbox]')
    .map(function (index, input) {

      var $input = $(input);

      if ($input.is(':checked')) {
        $input.closest('label').addClass('selected');
      }
      return input;
    })
    .on('focus click', function(event) {

      var $label = $(event.target).closest('label');

      $label.addClass('add-focus');
      $selectableInputs.not($label).removeClass('add-focus');
    })
    .on('change', function(event) {

      var $input = $(event.target);

      if ($input.attr('type') === 'radio') {
        $("input[name='" + $input.prop('name') + "']").map(function (index, inputWithSameName) {
            $(inputWithSameName).closest('label').removeClass('selected');
        });
      }

      $input.closest('label').toggleClass('selected', $input.prop('checked'));
    })
    .on('blur', function(event) {
      $(event.target).closest('label').removeClass('add-focus');
    });
};
