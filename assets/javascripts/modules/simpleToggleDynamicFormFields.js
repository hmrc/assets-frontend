require('jquery');
modules.exports = function($) {
  var fields,
      $toggledField,
      $fieldToHide,
      $fieldToShow,
      $dynamicForm = $('form[data-dynamic-form]');

  $dynamicForm.find('*[data-dynamic-fields-hide]').each(function() {
    if ($(this).prop("checked")) {
      $toggledField = $(".data-" + $(this).data('dynamic-fields-hide'));
      $toggledField.addClass('js-hidden');
    }
  });

  $dynamicForm.find('*[data-dynamic-fields-show]').each(function() {
    if ($(this).prop("checked")) {
      $toggledField = $(".data-" + $(this).data('dynamic-fields-show'));
      $toggledField.removeClass('js-hidden');
    }
  });

  $dynamicForm.on('click', '[data-dynamic-field-toggle]', function(e) {
    var $input = $(e.target),
      fieldsToHide = $input.data('dynamic-fields-hide'),
      fieldsToShow = $input.data('dynamic-fields-show');

    if (fieldsToHide) {
      fields = fieldsToHide.split(',');
      $.each(fields, function(index, field) {
        hide($.trim(field), $input);
      });
    }
    if (fieldsToShow) {
      fields = fieldsToShow.split(',');
      $.each(fields, function(index, field) {
        show($.trim(field), $input);
      });
    }
  });

  function hide(field, $toggle) {
    $fieldToHide = $('.data-' + field);
    if ($toggle.attr('type') === 'checkbox') {
      $toggle.data('dynamic-fields-hide', null);
      $toggle.data('dynamic-fields-show', field);
    }
    $fieldToHide.addClass('js-hidden');
    $fieldToHide.find(':text').val('');
    $fieldToHide.find(':checked').prop('checked', false);
    $fieldToHide.find('*[data-default]').prop('checked', true);
  }

  function show(field, $toggle) {
    $fieldToShow = $('.data-' + field);
    if ($toggle.attr('type') === 'checkbox') {
      $toggle.data('dynamic-fields-hide', field);
      $toggle.data('dynamic-fields-show', null);
    }
    $fieldToShow.removeClass('js-hidden');
    $fieldToShow.find(':checked').prop('checked', false);
  }
};
