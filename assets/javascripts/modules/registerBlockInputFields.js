define(['jquery'], function($) {
  return function() {
    var $selectableInputs = $("label[class*=block-label]");

    $selectableInputs
      .find('input[type=radio], input[type=checkbox]')
      .on('focus click', function(e) {
        e.stopPropagation();

        var current = $(this).closest('label')[0];
        $(current).addClass('add-focus');
        $selectableInputs.not(current).removeClass('add-focus');
      })
      .on('change', function(e) {
        if ($(this).attr('type') === 'radio') {
          $(this).closest('label').siblings().removeClass('selected');
        }

        $(this).closest('label').toggleClass('selected', $(this).prop("checked"));
      });
  };
});
