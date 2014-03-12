GOVUK.toggleNonElectricFields = function ($form, electricChecked) {
    var $fieldsets = $form.find('.non-electric');

    if (electricChecked) {
        $fieldsets.addClass('js-hidden');
        $fieldsets.find(':text').val('');
        $fieldsets.find(':checked').prop('checked', false);

    } else {
        $fieldsets.removeClass('js-hidden');
        $fieldsets.find(':checked').prop('checked', false);
    }

};