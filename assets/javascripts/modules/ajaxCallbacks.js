/**
 * Callbacks to be passed to ajaxFormSubmit.js 'init' method
 **/
require('jquery');

var ajaxCallbacks = {
  clientAccessResponse: {
    callbacks: {
      beforeSend: function($element) {
        $element.prop('disabled', true);
      },

      success: function(response, $element, data, helpers, container, type) {
        $('input[name="payeref"]').val('');
        helpers.insertResponseHtml(helpers, type, data, $(container + ' .form-field:has(>input[name][type="text"])').first(), response);
      },

      error: function(response, $element, data, helpers, container) {

        // if session has timed out
        if (response.status === 401 &&
           response.responseJSON &&
           response.responseJSON.redirectUri) {

          // go to login page with specified redirect URI
          document.location.href = response.responseJSON.redirectUri;
        }
        else {
          helpers.insertResponseHtml(helpers, 'before', data, $(container + ' .form-field:has(>input[name][type="text"])'), response);
        }

      },

      always: function(response, $element, data, helpers, container, type) {
        if (helpers.hasErrorType !== 'service') {
          helpers.resetForms(helpers, type, data, container);
        }
      }
    }
  },
  helpers: {
    hasErrorType: undefined,

    setDomHtml: function(type, $target, $node) {
      if ($.isFunction($.fn[type]) && !!$target && !!$node) {
        $.fn[type].apply($target, [$node]);
      }
    },

    insertResponseHtml: function(helpers, type, data, $target, response) {
      var html = !!response.responseText ? response.responseText : response,
        htmlText = helpers.utilities.cleanHtml(html),
        htmlNodes = $.parseHTML(htmlText),
        nodeCount = htmlNodes.length || 0,
        i = 0,
        $node, $errorTarget,
        isMissingClient = data.indexOf('missingclient=true') > -1,
        isError = !!response.status || response.status === 500;

      if (!$.isFunction($.fn[type])) {
        $target.empty();
        type  = 'append';
      }
      
      helpers.resetErrorMessages($target.parent(), $target);
      
      if (helpers.utilities.isFullPageError(helpers, htmlText)) {
        helpers.insertFullPageErrorHtml($target, helpers, htmlText);
      }
      else if (helpers.utilities.isServiceError(helpers, htmlNodes)) {
        helpers.insertServiceErrorHtml(helpers, htmlText);
      }
      else { // handle 'validation error' or 'success' message & state

        if (!isError) {
          $target.addClass('js-hidden');
        }

        for (; i < nodeCount; i++) {
          $node = $(htmlNodes[i]);

          if (isError) {
            //helpers.hasErrorType = 'validation';
            $errorTarget = $target.find('>input[name="' + $node.attr('data-input-for') +  '"]');
            $errorTarget.closest('.form-field').addClass('error');
            $errorTarget.blur();
          }

          helpers.setDomHtml(type, $errorTarget || $target, $node);
        }

        if (isMissingClient && !isError) {
          helpers.bindEvents($target, data);
        }
        else {
          $target.removeClass('js-hidden');
        }
      }
    },

    insertFullPageErrorHtml: function($target, helpers, htmlText) {
      var $heading = helpers.utilities.getElementInnerHtml(htmlText, 'h1'),
          $button = $target.closest('*:has([data-ajax-submit="true"])').find('button[type="submit"], input[type="submit"]');

      helpers.resetErrorMessages($target.parent(), $target);

      $button.parent('.form-field').addClass('error');

      helpers.setDomHtml('insertBefore',
        $('<div class="alert alert--failure" data-input-for="email" id="service--error">' +
          '<span class="error-message">' + $heading.text() + '</span>' +
        '</div>'),
        $button);
    },

    insertServiceErrorHtml: function(helpers, htmlText) {
      var $missingClientForm = $('#missing-client-form'),
          $clientAccessForms = $('.client-access-details');

      // replace missing client form
      $missingClientForm.empty();
      helpers.setDomHtml('prepend', $missingClientForm, htmlText);

      // insert into client access request forms & disable elements
      $clientAccessForms.each(function(i, e) {
        var $form = $(e);
        $form.find('input, button[type=submit]').prop('disabled', true);
        helpers.resetErrorMessages($form, $form.find('.form-field.error'));
        helpers.setDomHtml('before', $form.find('.form-field:first'), htmlText);
      });
    },

    resetErrorMessages: function($target, $error) {
      $target.find('.error').andSelf().removeClass('error');
      $target.find('.form-field:has(*[data-id="service--error"]), .alert--success, .alert--failure').remove();
    },

    resetForms: function(helpers, type, data, target) {
      var emailValue = helpers.getEmailValue(target, data);

      $('input[type=submit]:disabled, button[type=submit]:disabled').prop('disabled', false);

      $('input[name="email"]').each(function(index, element) {
        $(element).val(emailValue);
      });
    },

    getEmailValue: function(container, data) {
      var reEmail = /&?email=([^&]+)/gi,
        emailMatch = (
          function(d, re) {
            var m = !!d ? d.match(re) : null;
            return (!!d && !!m) ? m[0] : [''];
          }

        )(data, reEmail),
            emailValue = $(container).find('input[name="email"]').val();
      return emailValue || decodeURIComponent(emailMatch).replace(reEmail, '$1') || '';
    },

    bindEvents: function($container) {
      $('#another-missing-client').one('click keydown', function(event) {
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
        var re = new RegExp('^(.*)<' + nodeName + '[^>]*>(.+?)<\/' + nodeName + '>(.*)$', 'gi');
        return re.test(html) ? $($.parseHTML(html.replace(re, '$2'))) : '';
      },

      cleanHtml: function(htmlString) {
        return $.trim(htmlString).replace(/[\r\n\f\t]/g, '').replace(/>\s+</g, '><');
      },

      isFullPageError: function(helpers, html) {
        var heading,
            isError = false;
        if (!!html && !!html.length) {
          heading = helpers.utilities.getElementInnerHtml(html, 'h1');
          isError = !!heading && heading.text() === 'Sorry, we’re experiencing technical difficulties';
        }

        if (isError) {
          helpers.hasErrorType = 'full-page';
        }

        return isError;
      },

      isServiceError: function(helpers, nodes) {
        var $htmlNodes = $(nodes),
            serviceError = false;

        $htmlNodes.each(function(i, e) {
          serviceError = !!$(e).find('*').andSelf().filter('[data-id="service--error"]').length;
          return !serviceError;
        });

        if (serviceError) {
          helpers.hasErrorType = 'service';
        }

        return serviceError;
      }
    }
  }
};

module.exports = ajaxCallbacks;
