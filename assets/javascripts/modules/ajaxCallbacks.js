/**
 * Callbacks to be passed to ajaxFormSubmit.js 'init' method
 **/
require('jquery');

var ajaxCallbacks = {
  emailFormResponse: {
    callbacks: {
      success: function(response, $element, data, helpers) {
        $('input[type="text"][type!="email"][name!="email"]').val('');
        helpers.base.success.apply(null, arguments);
      }
    }
  },
  dataTableSubmitResponse: {
    callbacks: {
      beforeSend: function($element, data, helpers) {
        $('.js-datatable-submit').prop('disabled', true); // disable all data-table submit elements

        helpers.base.beforeSend.apply(null, arguments);
      },

      success: function(response, $element, data, helpers, targets, container, type) {
        var $container = $(container);

        $container
          .empty()
          .closest('tbody').find('tr.status--confirm-success').each(function (index, element) {
          $(element).removeClass('status--confirm-success');
        });

        $container.closest('tr').removeClass('status--unconfirmed').addClass('status--confirm-success confirmed');

        helpers.base.success.apply(null, arguments);
      },

      error: function(response, $element, data, helpers, targets, container, type) {
        $('button.js-datatable-submit').prop('disabled', false);

        if (response.status === 500) { // a service-error, disable all submit buttons
          $element.find('button.js-datatable-submit').each(function (index, element) {
            $(element).prop('disabled', true);
          });
        }

        $(container).closest('tr').addClass('form--field--error');

        helpers.base.error.apply(null, arguments);
      },

      always: function(response, $element, data, helpers) {
        if (response.status !== 500) { // not a service-error
          $('.js-datatable-submit').prop('disabled', false);  // re-enable all data-table submit elements
        }

        helpers.base.always.apply(null, arguments);
      }
    }
  },
  helpers: {
    base: {
      beforeSend: function($element, data, helpers, targets, container, type, actions) {
        // add waiting state component
        var showWaiting = $element.data('ajax-waiting');
        if (showWaiting) {
          $element.prepend($('<span class="waiting"></span>'));
        }

        helpers.utilities.setFormState($element, true);
      },

      success: function(response, $element, data, helpers, targets, container, type, actions) {
        helpers.insertResponseHtml(helpers, type, data, $(container + targets.success), response);
      },

      error: function(response, $element, data, helpers, targets, container, type, actions) {
        if (helpers.utilities.hasSessionLapsed(response)) {
          helpers.utilities.redirect(response);
        }
        else {
          helpers.insertResponseHtml(helpers, type, data, $(container + targets.error), response);
        }
      },

      always: function(response, $element, data, helpers, targets, container, type, actions) {
        // clean waiting state
        var showWaiting = $element.data('ajax-waiting');
        if (showWaiting) {
          $element.find('.waiting').remove();
        }

        if (helpers.hasErrorType !== 'service') {
          helpers.resetForms(helpers, type, data, container);
        }

        helpers.hasErrorType = undefined;
      }
    },

    hasErrorType: undefined,

    setDomHtml: function(type, $target, $node) {
      if (!type.indexOf('prependTo') || !type.indexOf('appendTo') || !type.indexOf('insert')) {
        var $swapNode = $target;
        $target = $node;
        $node = $swapNode;
      }

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
        helpers.insertServiceErrorHtml($target.closest('form'), helpers, htmlText);
      }
      else { // handle 'validation error' or 'success' message & state

        for (; i < nodeCount; i++) {
          $node = $(htmlNodes[i]);

          if (isError) {
            $errorTarget = $target.find('>input[name="' + $node.data('input-for') +  '"]');
            $errorTarget.addClass('error-field');
            $errorTarget.closest('.form-field').addClass('form-field--error');
            $errorTarget.blur();
          }

          helpers.setDomHtml(type, !!$errorTarget && $errorTarget.length ? $errorTarget : $target, $node);
        }
      }
    },

    insertFullPageErrorHtml: function($target, helpers, htmlText) {
      var $heading = helpers.utilities.getElementInnerHtml(htmlText, 'h1'),
          $button = $target.closest('*:has([data-ajax-submit="true"])').find('button[type="submit"], input[type="submit"]');

      helpers.resetErrorMessages($target.parent(), $target);

      $button.parent('.form-field').addClass('form-field--error');

      helpers.setDomHtml('insertBefore', $button,
        $('<div class="alert alert--borderless alert--failure soft--ends soft--sides" data-input-for="email" id="service--error">' +
          '<span class="alert__message"><strong>' + $heading.text() + '</strong></span>' +
        '</div>'));
    },

    insertServiceErrorHtml: function($form, helpers, htmlText) {
      // replace form with Service Error message
      $form.empty();
      helpers.setDomHtml('prepend', $form, htmlText);
    },

    resetErrorMessages: function($target, $error) {
      $target.find('.form-field--error').andSelf().removeClass('form-field--error');
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

    utilities: {
      hasSessionLapsed: function(response) {
        // if session has timed out
        return response.status && response.status === 401 && response.responseJSON && response.responseJSON.redirectUri;
      },

      redirect: function(response) {
        // go to login page with specified redirect URI
        if (response && response.responseJSON && response.responseJSON.redirectUri) {
          document.location.href = response.responseJSON.redirectUri;
        }
      },

      setFormState: function($element, isDisabled) {
        if ($element.prop('tagName') === 'FORM') {
          $element.find('input, button, textarea').each(function(index, formElement) {
            $(formElement).prop('disabled', isDisabled);
            $(formElement).attr('aria-disabled', isDisabled);
          });
        } else {
          $element.prop('disabled', isDisabled);
          $element.attr('aria-disabled', isDisabled);
        }
      },

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
