/* eslint-env jasmine, jquery */
/* global preloadFixtures, loadFixtures */

require('jquery')

jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/'

preloadFixtures('ajax-form-client-access-request.html', 'client-access-request-responses.html')

var ajaxFormSubmit = require('../../javascripts/modules/ajaxFormSubmit.js')
var ajaxCallbacks = require('../../javascripts/modules/ajaxCallbacks.js')
var forms
var formCount = 0
var responseHtml = {
  'clientAccessSuccess': responseHelper({
    file: 'base/specs/fixtures/client-access-request-responses.html',
    dom: '#access--response'
  }),
  'missingClientSuccess': responseHelper({
    file: 'base/specs/fixtures/client-access-request-responses.html',
    dom: '#missing--response'
  })
}

describe('AjaxFormSubmit', function () {
  beforeEach(function () {
    loadFixtures('ajax-form-client-access-request.html')
    forms = $('*[data-ajax-submit]')
    formCount = forms.length

    ajaxFormSubmit.init(ajaxCallbacks)
  })

  describe('When the client access request fixture loads', function () {
    it('Form element is present', function () {
      expect($('#verify-form').length).toBeTruthy()
    })

    it('Form elements for PAYEs are present', function () {
      for (var e = 0; e < formCount; e++) {
        var payeId = new Array(4).join(e.toString()) + '/Z' + new Array(4).join(e.toString())
        var $fp = $(forms[e]).parents('#client_' + payeId.replace('/', '') + '_notes, #missing-client')
        var $button = $fp.find('.button')

        expect($fp.length).toBeTruthy()

        expect($fp.find('input[name="csrfToken"]').val().length).toBeTruthy()

        if ($fp.attr('id') !== 'missing-client') {
          expect($fp.find('input[name="name"]')).toBeDefined()
          expect((/^Employer[0-9]$/i).test($fp.find('input[name="name"]').attr('value'))).toBe(true)

          expect($fp.find('input[name="payeref"]').length).toBeTruthy()
          expect((/^[0-9]{3}\/[A-Z][0-9]{3}$/i).test($fp.find('input[name="payeref"]').attr('value'))).toBe(true)
        } else {
          expect($fp.find('input[name="name"]').length).toBeFalsy()
          expect($fp.find('input[name="payeref"]').attr('value')).toBe('')
        }

        expect($fp.find('input[name="email"]').length).toBeTruthy()

        expect($button.length).toBeTruthy()

        expect($button.attr('data-ajax-submit').length).toBeTruthy()
        expect($button.attr('data-ajax-submit')).toBe('true')

        expect($button.attr('data-container').length).toBeTruthy()
        expect(new RegExp('#' + $fp.attr('id'), 'i').test($button.attr('data-container'))).toBe(true)

        expect($button.attr('data-callback-name').length).toBeTruthy()
        expect($button.attr('data-callback-name')).toBe('emailFormResponse.callbacks')

        expect($button.attr('data-callback-args').length).toBeTruthy()

        var callbackArgs = $button.attr('data-callback-args').split(',')
        expect(callbackArgs.length).toBe(2)
        expect(callbackArgs[0]).toBe($button.attr('data-container'))
        expect(callbackArgs[1]).toBe($fp.attr('id') === 'missing-client' ? 'before' : 'insert')
        expect(callbackArgs[1]).not.toBe('replace')
      }
    })
  })

  describe('When the "ajaxFormSubmit.js" is loaded in the client access request fixture', function () {
    it("the 'ajaxFormSubmit' var loads if we wait", function () {
      expect(ajaxFormSubmit).toBeDefined()
    })

    it("the 'ajaxFormSubmit.init' property is available", function () {
      expect(ajaxFormSubmit.init).toBeDefined()
      expect(typeof ajaxFormSubmit.init).toBe('function')
    })

    it("the 'ajaxFormSubmit.doSubmit' property is available", function () {
      expect(ajaxFormSubmit.doSubmit).toBeDefined()
      expect(typeof ajaxFormSubmit.doSubmit).toBe('function')
    })

    it("the 'ajaxFormSubmit.serializeForAjax' property is available", function () {
      expect(ajaxFormSubmit.serializeForAjax).toBeDefined()
      expect(typeof ajaxFormSubmit.serializeForAjax).toBe('function')
    })

    it("the 'ajaxFormSubmit.getCallback' property is available", function () {
      expect(ajaxFormSubmit.getCallback).toBeDefined()
      expect(typeof ajaxFormSubmit.getCallback).toBe('function')
    })
  })

  describe('When the "ajaxFormSubmit.js" is initialized in the client access request fixture', function () {
    it('"doSubmit" handler is bound to the client access form', function () {
      var handlers = $._data($('#verify-form')[0], 'events')

      expect(handlers.submit.length).toBeTruthy()
      expect(typeof handlers.submit[0].handler).toBe('function')

      var formHandler

      for (var f = 0; f < handlers.submit.length; f++) {
        var h = handlers.submit[f].handler

        if (h.toString().indexOf('.doSubmit(') > -1) {
          formHandler = h
        }
      }

      expect(formHandler).toBeDefined()
    })
  })

  describe("When 'serializeForAjax' creates a data string for the scoped form ONLY", function () {
    var scopeForms = []

    beforeEach(function () {
      for (var e = 0; e < formCount; e++) {
        var payeId = new Array(4).join(e.toString()) + '/Z' + new Array(4).join(e.toString())
        var $fp = $(forms[e]).parents('#client_' + payeId.replace('/', '') + '_notes, #missing-client')
        var data = ajaxFormSubmit.serializeForAjax($fp)

        scopeForms.push({
          payeId: payeId,
          containerId: $fp.attr('id'),
          $fields: $fp.find('input[name]'),
          serial: data.replace(/&?isajax=true&?/i, '').split('&')
        })
      }
    })

    it('scoped forms exist', function () {
      expect(scopeForms.length).toBeTruthy()
    })

    it('serialized form fields match field values', function () {
      for (var f = 0; f < formCount; f++) {
        var form = scopeForms[f]
        var data = form.serial
        var count = data.length
        var $fields = form.$fields
        var fieldCount = $fields.length
        var dataValues = {}

        for (var d = 0; d < count; d++) {
          var kvp = data[d].split('=')

          dataValues[kvp[0]] = kvp[1]
        }

        for (var i = 0; i < fieldCount; i++) {
          var $field = $($fields[i])
          var name = $field.attr('name')
          var value = $field.attr('value')

          expect(dataValues[name]).toBe(encodeURIComponent(value))
        }
      }
    })
  })

  describe("When 'getCallback' gets the callback function", function () {
    it('The Button "data-callback" values return a function', function () {
      for (var e = 0; e < formCount; e++) {
        var payeId = new Array(4).join(e.toString()) + '/Z' + new Array(4).join(e.toString())
        var $fp = $(forms[e]).parents('#client_' + payeId.replace('/', '') + '_notes, #missing-client')
        var $button = $fp.find('.button')
        var callback = ajaxFormSubmit.getCallback({
          name: $button.attr('data-callback-name'),
          args: $button.attr('data-callback-args'),
          callbacks: ajaxCallbacks,
          helpers: ajaxCallbacks.helpers
        }, ajaxFormSubmit.serializeForAjax($button.attr('data-container')))

        expect(typeof callback).toBe('function')
      }
    })
  })

  describe('When submitting client access request form', function () {
    var spy
    var callbackArgs = []
    var $button

    beforeEach(function () {
      for (var e = 0; e < formCount; e++) {
        var payeId = new Array(4).join(e.toString()) + '/Z' + new Array(4).join(e.toString())
        var $fp = $(forms[e]).parents('#client_' + payeId.replace('/', '') + '_notes, #missing-client')
        var isMissingClient = $fp.attr('id') === 'missing-client'
        var successHtml = isMissingClient ? responseHtml.missingClientSuccess : responseHtml.clientAccessSuccess

        $button = $fp.find('.button')
        spy = spy || spyOn($, 'ajax')
        callbackArgs.push({
          html: successHtml,
          $form: $fp,
          position: isMissingClient ? 'before' : 'insert',
          container: isMissingClient ? '.panel-indent .alert--success' : '>p'
        })
      }
    })

    it('Ajax post occurs', function () {
      for (var e = 0; e < formCount; e++) {
        var callbackParams = callbackArgs[e]
        var html = callbackParams.html
        var $form = callbackParams.$form
        var position = callbackParams.position
        var data = ajaxFormSubmit.serializeForAjax(callbackParams.$form)
        var container = callbackParams.container
        var callbackMethod = spy.and.callFake((function (h, d, helps, $f, p) {
          return function () {
            return $.Deferred()
              .resolveWith(null, [h, d, helps, $f, p])
              .promise()
          }
        })(html, data, ajaxCallbacks.helpers, $form, position))

        if (forms[e].tagName === 'FORM') {
          forms[e].submit()
        } else {
          forms[e].click()
        }

        expect(callbackMethod).toHaveBeenCalled()

        var args = callbackMethod.calls.mostRecent().args
        expect(args.length).toBe(1)

        expect($form.find(container).length).toBeGreaterThan(0)

        expect($button).not.toBeDisabled()
      }
    })
  })
})

function responseHelper (target) {
  var result = $.ajax({
    url: target.file,
    type: 'get',
    data: target.data || {},
    async: false,
    cache: true
  })

  var $element = $('<result/>').html(result.responseText).find(target.dom)

  return $element.html()
}
