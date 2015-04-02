require('jquery');

module.exports = function() {
  var $dynamicForm = $('form[data-dynamic-form]');

  $dynamicForm.find('*[data-dynamic-fields-hide="true"]').each(function() {
    if ($(this).prop('checked')) {
      var $toggledField = $('.data-' + $(this).data('dynamic-fields'));
      $toggledField.addClass('js-hidden');
    }
  });

  $dynamicForm.on('click', '*[data-dynamic-fields]', function() {
    var $toggledField = $('.data-' + $(this).data('dynamic-fields'));
    if ($(this).data('dynamic-fields-hide')) {
      if ($(this).attr('type') === 'checkbox') {
        $(this).data('dynamic-fields-hide', false);
      }

      $toggledField.addClass('js-hidden');
      $toggledField.find(':text').val('');
      $toggledField.find(':checked').prop('checked', false);
      $toggledField.find('*[data-default]').prop('checked', true);
    } else {
      if ($(this).attr('type') === 'checkbox') {
        $(this).data('dynamic-fields-hide', true);
      }

      $toggledField.removeClass('js-hidden');
      $toggledField.find(':checked').prop('checked', false);
    }
  });
};
