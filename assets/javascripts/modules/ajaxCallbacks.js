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

      error: function (response, data, helpers, container, type) {
        helpers.insertResponseHtml(helpers, type, data, $(container), response);
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
        isError = !!response.status || response.status === 500,
        isValidType = function () {
          return $.isFunction($.fn[type]);
        };

      if (!isError) {
        $target.addClass('js-hidden');
      } else if (!isValidType()) {
        type = 'prepend';
      }

      $target.parent().find('.alert--success, .alert--failure').remove();

      var heading = helpers.utilities.getElementInnerHtml(htmlText, 'h1');

      if (helpers.utilities.isFullPageError(heading)) {
        var $head = helpers.utilities.getElementInnerHtml(htmlText, 'head'),
          $body = helpers.utilities.getElementInnerHtml(htmlText, 'body');
        $('head').html($head);
        $('body').html($body);
      }
      else if (!isValidType()) {
        // just 'insert' html in target container element
        $target.html(htmlText);
      }
      else {
        $.fn[type].apply($target, [htmlText]);
      }

      if (data.indexOf('missingclient=true') > -1) {
        helpers.bindEvents($target, data);
      }
      else {
        $target.removeClass('js-hidden');
      }
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
        emailMatch = !!data ? data.match(reEmail) : [''],
        emailValue = $(container).find('input[name="email"]').val();
      return emailValue || decodeURIComponent(emailMatch[0]).replace(reEmail, '$1') || "";
    },

    bindEvents: function ($container) {
      $('#another-missing-client').one("click keydown", function (event) {
        event.preventDefault();

        var $this = $(event.target);

        $this.parent().find('.alert--success, .alert--failure').remove();
        $this.remove();

        $('input[name="payeref"]').prop('value', null); // -webkit-autofill background-color mask: $('input[name="payeref"]').css({'-webkit-box-shadow':'0 0 0 500px white inset' });

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

      isFullPageError: function(heading) {
        return !!heading && heading.text() === 'Sorry, we’re experiencing technical difficulties';
      }
    }
  }
};

module.exports = ajaxCallbacks;
