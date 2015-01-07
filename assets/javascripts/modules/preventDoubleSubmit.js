require('jquery');

module.exports = function () {
  $('form').on('submit', function() {
      if (typeof $.data(this, "disabledOnSubmit") === 'undefined') {
        $.data(this, "disabledOnSubmit", {
          submited: true
        });
        $('input[type=submit], button[type=submit]', this).each(function() {
          $(this).prop("disabled", true);
        });
        return true;
      } else {
        return false;
      }
    });
};
