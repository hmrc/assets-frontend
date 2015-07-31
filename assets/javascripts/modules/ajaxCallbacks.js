/**
 * Callbacks to be passed to ajaxFormSubmit.js 'init' method
 **/
require('jquery');

var ajaxCallbacks = {
  clientAccessResponse: {
    callbacks: {
      success: function (response, data, helpers, container, type) {
        helpers.insertResponseHtml(helpers, type, data, $(container), response);
      },

      error: function (response, data, helpers, container) {
        helpers.insertResponseHtml(helpers, 'before', data, $(container + ' .form-field:has(>input[name][type="text"])'), response);
      },

      always: function (response, data, helpers, container, type) {
        helpers.resetForms(helpers, type, data, container);
      }
    }
  },
  helpers: {
    insertResponseHtml: function (helpers, type, data, $target, response) {
      var html = !!response.responseText ? response.responseText : response,
        htmlText = helpers.utilities.cleanHtml(html),
        htmlNodes = $.parseHTML(htmlText),
        nodeCount = htmlNodes.length || 0,
        i = 0,
        $node, $errorTarget,
        isError = !!response.status || response.status === 500;
        
      if(!$.isFunction($.fn[type])) { 
        $target.html('');
        type  = 'append'; 
      }
      
      if (helpers.utilities.isFullPageError(helpers, htmlText)) {
        helpers.insertFullPageErrorHtml($target, helpers, htmlText);
      }
      else if (helpers.utilities.isSessionTimeout(helpers, htmlText)) {
        document.location.href = "/account/sign-in?continue=" + encodeURIComponent(document.location.href);
      }
      else {
        if (!isError) {
          $target.addClass('js-hidden');
        }

        $target.removeClass('error');
        $target.parent().find('.alert--success, .alert--failure').remove();

        for (; i < nodeCount; i++) {
          $node = $(htmlNodes[i]);

          if (isError) {
            $errorTarget = $target.find('>input[name="' + $node.attr('data-input-for') +  '"]');
            $errorTarget.closest('.form-field').addClass('error');
            $errorTarget.blur();
          }

          $.fn[type].apply($errorTarget || $target, [$node]);
        }

        if (data.indexOf('missingclient=true') > -1) {
          helpers.bindEvents($target, data);
        }
        else {
          $target.removeClass('js-hidden');
        }
      }
    },
    
    insertFullPageErrorHtml: function ($target, helpers, htmlText) {
      var $heading = helpers.utilities.getElementInnerHtml(htmlText, 'h1'),
          $button = $target.closest('*:has([data-ajax-submit="true"])').find('button[type="submit"], input[type="submit"]');
          
      $button.parent('.form-field').addClass('error');

      $('<div class="alert alert--failure" data-input-for="email" id="service--error">' +
        '<span class="error-message">' + $heading.text() + '</span>' +
      '</div>').insertBefore($button);
    },
    
    resetForms: function (helpers, type, data, target) {
      var emailValue = helpers.getEmailValue(target, data);

      $("input[type=submit]:disabled, button[type=submit]:disabled").prop('disabled', false);

      $('input[name="email"]').each(function (index, element) {
        $(element).val(emailValue);
      });
    },

    getEmailValue: function(container, data) {
      var reEmail = /&?email=([^&]+)/gi,
        emailMatch = (function(d, re) {
            var m = !!d ? d.match(re) : null;
            return (!!d && !!m) ? m[0] : [''];
          })(data, reEmail),
            emailValue = $(container).find('input[name="email"]').val();
      return emailValue || decodeURIComponent(emailMatch).replace(reEmail, '$1') || "";
    },

    bindEvents: function ($container) {
      $('#another-missing-client').one("click keydown", function (event) {
        event.preventDefault();

        var $this = $(event.target);
        
        $this.parent().find('.error').removeClass('error');
        $this.parent().find('.alert--success, .alert--failure').remove();
        $this.parent().find('input[name="payeref"]').prop('value', null);

        $this.remove();

        $container.removeClass('js-hidden');
      });
    },

    utilities: {
      getElementInnerHtml: function(html, nodeName) {
        var re = new RegExp("^(.*)<" + nodeName + "[^>]*>(.+?)<\/" + nodeName + ">(.*)$", "gi");
        return re.test(html) ? $($.parseHTML(html.replace(re, "$2"))) : '';
      },

      cleanHtml: function(htmlString) {
        return $.trim(htmlString).replace(/[\r\n\f\t]/g, '').replace(/>\s+</g, '><');
      },

      isFullPageError: function(helpers, html) {
        return helpers.utilities.hasFullPageHeading(helpers, html, 'Sorry, we’re experiencing technical difficulties');
      },
      
      isSessionTimeout: function(helpers, html) {
        return helpers.utilities.hasFullPageHeading(helpers, html, 'Sign in with your Government Gateway account');
      },
      
      hasFullPageHeading: function(helpers, html, text) {
        var heading;
        if (!!html && !!html.length) {
          heading = helpers.utilities.getElementInnerHtml(html, 'h1');
          return !!heading && heading.text() === text;
        }
        return false;
      }
    }
  }
};

module.exports = ajaxCallbacks;
