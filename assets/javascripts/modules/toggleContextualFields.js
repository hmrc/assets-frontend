require('jquery');

module.exports =  function () {
    var $DOM = $("#content"),
      setup = function() {
        //select 'yes' option when user selects a contextual input
        $DOM.on('focus', '.js-includes-contextual .js-input--contextual input, .js-includes-contextual .js-input--contextual select', function(e) {
          preselect($(e.currentTarget));
        });
        // if we select 'no' the contextual input values should be cleared
        $DOM.on('focus', '*[data-contextual-helper]', function() {
          toggle($(this));
        });
      },
      //useful if form validation had previously failed.
      preselect = function($el) {
        $el.parents('.js-includes-contextual').find('*[data-contextual-helper="enable"]').trigger('click');
      },
      toggle = function($el) {
        if ($el.data('contextual-helper') === "disable") {
          //clear value inputs
          $el.parents('.js-includes-contextual').find('.js-input--contextual').find(':input').each(function(i, el) {
            el.value = '';
            if ($el.data('isenabled') === "undefined") {
              $(el).attr('data-isenabled', "disabled");
            } else {
              $(el).data('isenabled', "disabled");
            }
          });
        } else {
          var $inputs = $el.parents('.js-includes-contextual').find('.js-input--contextual').find(':input');
          //set focus on first input if its a text box
          $.each($inputs, function(index, element) {
            if (index === 0 && element.type === "text") {
              if ($(element).data('isenabled') !== "enabled") {
                $(element).focus();
                $(element).data('isenabled', "enabled");
              }
            }
          });
        }
      };
    return {
      setup: setup
    };
};
