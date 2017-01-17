/* eslint-env jquery */
/* global jQuery */
/* eslint-disable no-extra-boolean-cast */

/**
 * Submit a form via AJAX
 *
 * Hijack's a forms submit event and POSTs its data via AJAX to avoid page reloads.
 *
 * Usage:
 *
 *  Place the attribute 'data-ajax-submit="true"' on either a form tag or a button
 *  that has:
 *    - a data-formaction attribute for javascript enabled form post (ajax)
 *    - a formaction attribute for non-javascript enabled form post (full page reload)
 *    - a 'data-container' attribute with a selector for the element which contains 'scoped' form values
 *    - a 'data-callback-name' attribute with name-spaced object property name with contains 'success' and 'error' property functions
 *    - a 'data-callback-args' attribute containing comma separated list of argument parameters to pass to callback:
 *      + 1. the selector where the partial view content will be added
 *      + 2. the method to use when adding new content to the container - options are 'insert' or 'replace' (insert is the default)
 *    - a data-targets-success attribute with a selector for element(s) found within the data-container to be used by the success callback
 *    - a data-targets-error attribute with a selector for element(s) found within the data-container to be used by the success callback
 *
 *  <form action="#"
 *   data-ajax-submit="true"
 *   data-container="#selector" data-callback-name="[libraryname].callbacks"
 *   data-callback-args="#selector,insert|replace">
 *      <input type="submit" value="Submit"/>
 *  </form>
 *
 *  or
 *
 *  <button class="button" type="submit" id="missing-client-submit" formaction="#"
 *   data-ajax-submit="true"
 *   data-container="#selector" data-callback-name="[libraryname].callbacks"
 *   data-callback-args="#selector,insert|replace">Submit</button>
 *
 **/
require('jquery')

var ajaxFormSubmit = {
  init: function (config) {
    var _this = this
    var $ajaxForm = $('form[data-ajax-submit], form:has([data-ajax-submit])')
    var ajaxFormCount = $ajaxForm.length
    var a = 0
    var eventData, $form, selector

    for (; a < ajaxFormCount; a++) {
      eventData = {
        context: _this,
        config: config
      }
      $form = $($ajaxForm[a])
      selector = 'input[type="submit"], button[type="submit"]'

      $form.on('submit click', $('form:has[data-ajax-submit]').length
               ? selector.replace('submit', 'data-ajax-submit')
               : selector, eventData, _this.submitHandler)

      if ($form.find('[data-ajax-submit]').addBack().length > 1) {
        // more than one button/input submit in the forms context - capture + handle enter key submit on text fields
        $form.on('keypress', 'input[type="text"], textarea', eventData, _this.keypressHandler)
      }
    }

    $('[data-ajax-submit-delegate]').on('submit click', 'input[type="submit"], button[type="submit"]', {
      context: _this,
      config: config
    }, _this.submitHandler)
  },

  keypressHandler: function (event) {
    if (event.which === 13) {
      event.preventDefault()
      var thisContext = $(this).closest('*:has([data-ajax-submit="true"])').find('[data-ajax-submit="true"]')
      event.data.context.submitHandler.apply(thisContext, [{ type: 'submit', preventDefault: function () {}, data: event.data }])
    }
  },

  submitHandler: function (event) {
    event.preventDefault()

    var $this = $(this)
    var _config = event.data.config
    var _this = event.data.context
    var $form = $this.data('ajax-submit') ? $this : $this.closest('[data-ajax-submit]')
    var path = $form.data('formaction') || $form.attr('formaction') || $form.attr('action')
    var $scope = $form.data('container') || $this
    var serializedData = _this.serializeForAjax($scope)
    var headerData = _this.headerFromInput($form)
    var handlers = {
      config: {
        name: $form.data('callback-name'),
        args: $form.data('callback-args'),
        $element: $form,
        targets: {
          success: $form.data('target-success') || '',
          error: $form.data('target-error') || ''
        },
        callbacks: _config,
        helpers: _config.helpers || {}
      },
      fn: null
    }

    handlers.fn = _this.getCallback(handlers.config, serializedData)

    if (!!handlers) {
      _this.doSubmit(path, serializedData, headerData, handlers.fn, $form)
    }
  },

  doSubmit: function (path, data, headers, callback, $form) {
    $.ajax({
      url: path,
      type: $form.attr('method') || 'POST',
      data: data,
      headers: headers,
      beforeSend: function () {
        if (!!callback) {
          callback('beforeSend')
        }
      }
    })
    .done(function (result) {
      if (!!callback) {
        callback('success', result)
      }
    })
    .fail(function (result) {
      if (!!callback) {
        callback('error', result)
      }
    })
    .always(function () {
      if (!!callback) {
        callback('always')
      }
    })
  },

  serializeForAjax: function (formScope) {
    var result = ['isajax=true']
    $.each($(formScope).find(':input'), function () {
      var input = $(this)
      var param = encodeURIComponent(this.name) + '=' + encodeURIComponent(input.val())
      if (!input.data('ajax-header')) {
        if (input.attr('type').toLowerCase() === 'radio') {
          if (input.prop('checked')) {
            result.push(param)
          }
        } else {
          result.push(param)
        }
      }
    })

    return result.join('&').replace(/%20/g, '+').replace(/=$/, '').replace(/&$/, '')
  },

  // read ajax header value from input fields
  headerFromInput: function (formScope) {
    var headers = {}

    $.each($(formScope).find(':input'), function () {
      var input = $(this)
      if (input.data('ajax-header')) {
        headers[this.name] = input.val()
      }
    })

    return headers
  },

  getCallback: function (config, data) {
    var parts = config.name.split('.')
    var method = config.callbacks
    var helpers = config.helpers
    var $element = config.$element
    var targets = config.targets

    config.parameters = []

    if (!!config.name) {
      if (!!config.args) {
        config.parameters = [].concat(config.args.split(','))
      }

      config.parameters.unshift(targets)
      config.parameters.unshift(helpers)
      config.parameters.unshift(!!data ? data : null)
      config.parameters.unshift($element)

      jQuery.each(parts, function (index, value) {
        method = method[value]
      })

      return function (type, response) {
        var fn = method[type] || config.helpers.base[type]

        if (type === 'success' || type === 'error') {
          response = response || {}
        }

        if (!!response) {
          config.parameters.unshift(response)
        }

        if (!!fn) {
          fn.apply(null, config.parameters)
        }
      }
    } else {
      return null
    }
  }
}

module.exports = ajaxFormSubmit
