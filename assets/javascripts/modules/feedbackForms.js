require('jquery');

module.exports = function() {
      var setup = function() {
        
        var $feedbackForms = $('.form--feedback');

        //we have javascript enabled so change hidden input to reflect this
        $feedbackForms.find('input[name=isJavascript]').attr('value', true);

      };

  return {
    setup: setup
  };
};
