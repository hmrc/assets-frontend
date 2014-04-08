GOVUK.toggleDynamicFormFields = function () {
  var $dynamicForm = $('form[data-dynamic-form]');

  $dynamicForm.find("*[data-dynamic-fields-hide]").each( function() {
    if($(this).prop("checked")) {
      var $toggledField = $(".data-" + $(this).data('dynamic-fields'));
      $toggledField.addClass('js-hidden');
    }
  });
  
  $dynamicForm.on('click', '*[data-dynamic-fields]', function () {
    var $toggledField = $(".data-" + $(this).data('dynamic-fields'));
    if ($(this).data('dynamic-fields-hide')) {
      $toggledField.addClass('js-hidden');
      $toggledField.find(':text').val('');
      $toggledField.find(':checked').prop('checked', false);
    } else {
      $toggledField.removeClass('js-hidden');
      $toggledField.find(':checked').prop('checked', false);
    }
  });
};
