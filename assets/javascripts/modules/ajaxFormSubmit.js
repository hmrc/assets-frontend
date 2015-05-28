/**
 * Submit a form via AJAX
 *
 * Hijack's a forms submit event and POSTs its data via AJAX to avoid page reloads.
 *
 * Usage:
 *
 *  Place the attribute 'data-ajax-submit="true"' on either a form tag or a button
 *  that has:
 *    - a formaction attribute for non-javascript enabled form post (full page reload)
 *    - a 'data-container' attribute with a selector for the element which contains 'scoped' form values
 *    - a 'data-callback-name' attribute with name-spaced object property name with contains 'success' and 'error' property functions
 *    - a 'data-callback-args' attribute containing comma separated list of argument parameters to pass to callback:
 *      + 1. the selector where the partial view content will be added
 *      + 2. the method to use when adding new content to the container - options are 'insert' or 'replace' (insert is the default)
 *
 *
 *
 *  <form action="#"
 *   data-ajax-submit="true"
 *   data-container="#selector" data-callback-name="window.GOVUK.callbacks.[libraryname].[pagename].[functionname]"
 *   data-callback-args="#selector,insert|replace">
 *      <input type="submit" value="Submit"/>
 *  </form>
 *
 *  or
 *
 *  <button class="button" type="submit" id="missing-client-submit" formaction="#"
 *   data-ajax-submit="true"
 *   data-container="#selector" data-callback-name="window.GOVUK.callbacks.[libraryname].[pagename].[functionname]"
 *   data-callback-args="#selector,insert|replace">Submit</button>
 *
 **/
require('jquery');

var ajaxFormSubmit = {

  init: function() {
    var _this = this,
        $ajaxForm = $('form:has([data-ajax-submit])'),
        ajaxFormCount = $ajaxForm.length,
        a = 0,
        $ajaxItem = null;

    for (; a < ajaxFormCount; a++) {
      $ajaxItem = $($ajaxForm[a]);

      $ajaxItem.on('submit', function(event) {
        event.preventDefault();

        var $this = $(this),
            $form = $this.attr('data-ajax-submit') ? $this : $this.find('[data-ajax-submit]'),
            path = $form.attr('formaction') || $form.attr('action'),
            $scope = $form.attr('data-container') || $this,
            serializedData = _this.serializeForAjax($scope),
            callback = {
              config: {
                name: $form.attr('data-callback-name'),
                args: $form.attr('data-callback-args')
              },
              fn: null
            };

        callback.fn = _this.getCalllback(callback.config, serializedData);

        if (!!callback) {
          _this.doSubmit(path, serializedData, callback.fn);
        }
      });
    }
  },

  doSubmit: function(path, data, callback) {
    $.ajax({
      url: path,
      type: 'POST',
      data: data
    })
    .done(function(result) {
      if (!!callback) {
        callback('success', result);
      }
    })
    .fail(function(result) {
      if (!!callback) {
        callback('error', result);
      }
    })
    .always(function(result) {
    });
  },

  serializeForAjax: function(formScope) {
    var ret = ['isajax=true'];
    $.each($(formScope).find(':input'), function() {
      ret.push(encodeURIComponent(this.name) + '=' + encodeURIComponent($(this).val()));
    });

    return ret.join('&').replace(/%20/g, '+').replace(/=$/, '').replace(/&$/, '');
  },

  getCalllback: function(config, data) {
    var parts = config.name.split('.'),
        method = window;

    if (!!config.name) {
      if (!!config.args) {
        config.parameters = [].concat(config.args.split(','));
      }

      if (!!data) {
        config.parameters.unshift(data);
      }

      jQuery.each(parts, function(index, value) {
        method = method[value];
      });

      return function(type, response) {
        if (!!response) {
          config.parameters.unshift(response);
        }

        method[type].apply(null, config.parameters);
      };
    }
    else {
      return null;
    }
  }
};

module.exports = ajaxFormSubmit;
