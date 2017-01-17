/* eslint-env jasmine, jquery */
/* global setFixtures, preloadFixtures, loadFixtures */

require('jquery')

jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/'

preloadFixtures('ajax-form-client-access-request.html')

var ajaxCallbacks = require('../../javascripts/modules/ajaxCallbacks.js')
var helpers = ajaxCallbacks.helpers

describe('AjaxCallbacks', function () {
  describe('helpers', function () {
    describe('.getEmailValue', function () {
      var emailValue = 'test@email.com'
      var $form = $(
        '<form style="visibility:hidden">' +
          '<input name="value1" value="something 1"/>' +
          '<input name="email" type="email" value="' + emailValue + '"/>' +
          '<input name="value2" value="something 2"/><button type="submit" class="button" value="go" />' +
        '</form>'
      )
      var data = $form.serialize()

      it('returns the email value from the input element', function () {
        expect(helpers.getEmailValue($form, data)).toBe(emailValue)
      })

      it('returns the email value from the input element in the container (when no data supplied)', function () {
        expect(helpers.getEmailValue($form)).toBe(emailValue)
      })

      it('returns the email value from the supplied data (when no container supplied)', function () {
        expect(helpers.getEmailValue(undefined, data)).toBe(emailValue)
      })

      it('returns the empty string when no container or data supplied', function () {
        expect(helpers.getEmailValue()).toBe('')
      })
    })

    describe('.resetForms', function () {
      var $main = $('#missing-client')
      var $nestedForms = $('#verify-form').find('div[id^="client_"][id$="notes"]')
      var emailSelector = 'input[type="email"]'
      var buttonSelector = 'input[type=submit], button[type=submit]'

      beforeEach(function () {
        loadFixtures('ajax-form-client-access-request.html')

        $main.find(buttonSelector).prop('disabled', true)

        $nestedForms.each(function () {
          $(this).find(buttonSelector).prop('disabled', true)
        })
      })

      it('leaves all buttons enabled', function () {
        helpers.resetForms(helpers, '', $main.serialize(), '#' + $main.attr('id'))

        $('#' + jasmine.getFixtures().containerId).find(buttonSelector).each(function () {
          expect($(this).is(':disabled')).toBe(false)
        })
      })

      it('sets all email input fields to value  email in submitted form', function () {
        helpers.resetForms(helpers, '', $main.serialize(), '#' + $main.attr('id'))

        $nestedForms.each(function () {
          expect($(this).find(emailSelector).val() === $main.find(emailSelector).val()).toBe(true)
        })
      })
    })

    describe('.resetErrorMessages', function () {
      var $container
      var $responses = {
        error: {
          service: $(
            '<div class="form-field error">' +
              '<div class="alert alert--failure" role="alert" data-id="service--error">' +
                '<span class="error-message">This service is currently down. Please try again later.</span>' +
              '</div>' +
            '</div>'
          ),
          payeref: $(
            '<div class="alert alert--failure" data-input-for="payeref" data-id="payeref--error">' +
              '<span class="error-message">@Messages("clientListPage.missingClient.payeReference.error")</span>' +
            '</div>'
          ),
          email: $(
            '<div class="alert alert--failure" data-input-for="email" data-id="email--error">' +
              '<span class="error-message">@Messages("clientListPage.missingClient.email.error")</span>' +
            '</div>'
          ),
          fullPage: $(
            '<div class="alert alert--failure" data-input-for="email" id="service--error">' +
              '<span class="error-message">Sorry, we’re experiencing technical difficulties</span>' +
            '</div>'
          )
        }
      }

      beforeEach(function () {
        var $fixtures = setFixtures('<div id="reset-error"></div>')
        $container = $fixtures.find('#reset-error')
      })

      afterEach(function () {
        $container.empty()
      })

      it('should remove service error html', function () {
        var $serviceError = $responses.error.service.clone()
        $container.append($serviceError)

        expect($serviceError).toBeInDOM()

        helpers.resetErrorMessages($container, $serviceError)

        expect($serviceError).not.toBeInDOM()
      })

      it('should remove full page error html', function () {
        var $fullPageError = $responses.error.fullPage.clone()
        $container.append($fullPageError)

        expect($fullPageError).toBeInDOM()

        helpers.resetErrorMessages($container, $fullPageError)

        expect($fullPageError).not.toBeInDOM()
      })

      it('should remove PAYE Ref validation error html', function () {
        var $payerefError = $responses.error.payeref.clone()
        $container.append($payerefError)

        expect($payerefError).toBeInDOM()

        helpers.resetErrorMessages($container, $payerefError)

        expect($payerefError).not.toBeInDOM()
      })

      it('should remove email validation error html', function () {
        var $emailError = $responses.error.email.clone()
        $container.append($emailError)

        expect($emailError).toBeInDOM()

        helpers.resetErrorMessages($container, $emailError)

        expect($emailError).not.toBeInDOM()
      })

      it('should remove all error html when removing an error', function () {
        var $serviceError = $responses.error.service.clone()
        var $fullPageError = $responses.error.fullPage.clone()
        var $payerefError = $responses.error.payeref.clone()
        var $emailError = $responses.error.email.clone()

        $container.append($serviceError)
                  .append($fullPageError)
                  .append($payerefError)
                  .append($emailError)

        expect($serviceError).toBeInDOM()
        expect($fullPageError).toBeInDOM()
        expect($payerefError).toBeInDOM()
        expect($emailError).toBeInDOM()

        helpers.resetErrorMessages($container, $serviceError)

        expect($serviceError).not.toBeInDOM()
        expect($fullPageError).not.toBeInDOM()
        expect($payerefError).not.toBeInDOM()
        expect($emailError).not.toBeInDOM()
      })
    })

    describe('.setDomHtml', function () {
      var $elementTarget, $element, $anotherElement

      beforeEach(function () {
        var domTarget = setFixtures('<div id="dom-target"><div id="element-target"></div></div>')
        $elementTarget = domTarget.find('#element-target')
        $element = $('<div id="element"><p>Test</p></div>')
        $anotherElement = $element.clone()
        $anotherElement.attr('id', 'element-2')
        $anotherElement.empty()
      })

      it('should insert element after target when using jQuery.after', function () {
        helpers.setDomHtml('after', $elementTarget, $element)
        expect($element).toBeInDOM()
        expect($elementTarget.next().attr('id')).toBe('element')
      })

      it('should insert element before target when using jQuery.before', function () {
        helpers.setDomHtml('before', $elementTarget, $element)
        expect($element).toBeInDOM()
        expect($elementTarget.prev().attr('id')).toBe('element')
      })

      it('should append element to target when using jQuery.append', function () {
        helpers.setDomHtml('append', $elementTarget, $element)
        expect($element).toBeInDOM()

        helpers.setDomHtml('append', $elementTarget, $anotherElement)

        expect($elementTarget.children().eq(0).attr('id')).toBe('element')
        expect($elementTarget.children().eq(1).attr('id')).toBe('element-2')
      })

      it('should prepend element to target when using jQuery.prepend', function () {
        helpers.setDomHtml('prepend', $elementTarget, $element)
        expect($element).toBeInDOM()

        helpers.setDomHtml('prepend', $elementTarget, $anotherElement)

        expect($elementTarget.children().eq(0).attr('id')).toBe('element-2')
        expect($elementTarget.children().eq(1).attr('id')).toBe('element')
      })

      it('should replace target with element when using jQuery.replaceWith', function () {
        helpers.setDomHtml('append', $elementTarget, $element)
        expect($element).toBeInDOM()

        helpers.setDomHtml('replaceWith', $element, $anotherElement)

        expect($elementTarget.children().eq(0).attr('id')).toBe('element-2')
        expect($elementTarget.children().length).toBe(1)
      })

      it('should wrap target with element when using jQuery.wrapperInner', function () {
        helpers.setDomHtml('append', $elementTarget, $element)
        expect($element).toBeInDOM()
        expect($elementTarget.children().eq(0).attr('id')).toBe('element')

        $element.empty()

        helpers.setDomHtml('wrapInner', $elementTarget, $anotherElement)

        expect($elementTarget.children().eq(0).attr('id')).toBe('element-2')
        expect($elementTarget.children().eq(0).attr('id')).not.toBe('element')
        expect($element.parent().attr('id')).toBe('element-2')
      })

      it('should not affect DOM if one or both of target and element to add are not defined', function () {
        var html = $elementTarget.parent().html()

        helpers.setDomHtml('append', undefined, undefined)
        expect(html === $elementTarget.parent().html()).toBe(true)

        helpers.setDomHtml('append', $elementTarget, undefined)
        expect(html === $elementTarget.parent().html()).toBe(true)

        helpers.setDomHtml('append', undefined, $element)
        expect(html === $elementTarget.parent().html()).toBe(true)
      })
    })

    describe('.utilities', function () {
      describe('.getElementInnerHtml should return', function () {
        var $html = setFixtures('<div><span>inner html</span></div>')
        var $span = $html.find('span')

        it('inner html of named element', function () {
          expect(helpers.utilities.getElementInnerHtml($html.html(), 'div').html()).toEqual($span.html())
        })

        it('empty string if named element not found', function () {
          expect(helpers.utilities.getElementInnerHtml($html.html(), 'pre')).toEqual('')
        })

        it('empty string if named element not specified', function () {
          expect(helpers.utilities.getElementInnerHtml($html.html())).toEqual('')
        })
      })

      describe('.cleanHtml should return', function () {
        var uncleanHtml = '\r\n<html><head>\r\n</head><body>\r\n<h1> unclean\r\n\t html </h1> </body>          </html>      \r\n'
        var cleanHtml = '<html><head></head><body><h1> unclean html </h1></body></html>'
        var startsWithWhitespace = /^[\r\n\f\t]+/
        var endsWithWhitespace = /[\r\n\f\t]+$/
        var containsNonTagWhitespace = />\s+</g

        it('cleaned html, with unnecessary whitespace removed', function () {
          // test the fixtures and regexp patterns used to test
          expect(startsWithWhitespace.test(uncleanHtml)).toBe(true)
          expect(startsWithWhitespace.test(cleanHtml)).toBe(false)

          expect(endsWithWhitespace.test(uncleanHtml)).toBe(true)
          expect(endsWithWhitespace.test(cleanHtml)).toBe(false)

          expect(containsNonTagWhitespace.test(uncleanHtml)).toBe(true)
          expect(containsNonTagWhitespace.test(cleanHtml)).toBe(false)

          expect(helpers.utilities.cleanHtml(uncleanHtml)).toEqual(cleanHtml)
        })

        it('html without whitespace at the start', function () {
          expect(startsWithWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false)
        })

        it('html without whitespace at the end', function () {
          expect(endsWithWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false)
        })

        it('html without unnecessary whitespace between tags', function () {
          expect(containsNonTagWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false)
        })
      })

      describe('.isFullPageError() should return', function () {
        var $fullPageError

        beforeEach(function () {
          var fullPageError = setFixtures('<div id="full-page--error" style="visibility:hidden"><p>blah</p><h1>Sorry, we’re experiencing technical difficulties</h1><p>blah</p></div>')
          $fullPageError = fullPageError.find('#full-page--error')
        })

        it('true, when page contains full page error heading and text', function () {
          var $heading = $fullPageError.find('h1')
          expect($heading).toBeInDOM()
          expect($heading).not.toBeEmpty()

          expect(helpers.utilities.isFullPageError(helpers, $fullPageError.html())).toBe(true)
        })

        it('false when page contains full page error heading without text', function () {
          var $headingNoText = $fullPageError.find('h1')
          expect($headingNoText).toBeInDOM()

          $headingNoText.text('')
          expect($headingNoText).toBeEmpty()

          expect(helpers.utilities.isFullPageError(helpers, $fullPageError.html())).toBe(false)
        })

        it('false when html param is null', function () {
          expect(helpers.utilities.isFullPageError(helpers, null)).toBe(false)
        })

        it('false when html param is undefined', function () {
          expect(helpers.utilities.isFullPageError(helpers, undefined)).toBe(false)
        })

        it('false when html param is empty string', function () {
          expect(helpers.utilities.isFullPageError(helpers, '')).toBe(false)
        })

        it('false when html param is missing', function () {
          expect(helpers.utilities.isFullPageError()).toBe(false)
        })
      })

      describe('.isServiceError() should return', function () {
        var $serviceError

        beforeEach(function () {
          var serviceError = setFixtures('<div id="service-error--message" class="form-field error">' +
                '<div class="alert alert--failure" role="alert" data-id="service--error">' +
                  '<span class="error-message">This service is currently down. Please try again later.</span>' +
                '</div>' +
              '</div>')
          $serviceError = serviceError.find('#service-error--message')
        })

        it('true, when page contains full page error heading and text', function () {
          var $message = $serviceError.find('[data-id="service--error"]')
          expect($message).toBeInDOM()
          expect($message).not.toBeEmpty()

          expect(helpers.utilities.isServiceError(helpers, $serviceError)).toBe(true)
        })

        it('false when page contains full page error heading without text', function () {
          var $messageNoText = $serviceError.find('[data-id="service--error"]')

          expect($messageNoText).toBeInDOM()

          $messageNoText.text('')
          expect($messageNoText).toBeEmpty()

          expect(helpers.utilities.isServiceError(helpers, $.parseHTML($serviceError))).toBe(false)
        })

        it('false when html param is null', function () {
          expect(helpers.utilities.isServiceError(helpers, null)).toBe(false)
        })

        it('false when html param is undefined', function () {
          expect(helpers.utilities.isServiceError(helpers, undefined)).toBe(false)
        })

        it('false when html param is empty string', function () {
          expect(helpers.utilities.isServiceError(helpers, '')).toBe(false)
        })

        it('false when html param is missing', function () {
          expect(helpers.utilities.isServiceError()).toBe(false)
        })
      })

      describe('.hasSessionLapsed', function () {
        var response = { 'status': 401, 'responseJSON': { 'redirectUri': '#' } }
        it('returns true if status in specified in valid response object is 401 ("Unauthorized")', function () {
          helpers.utilities.redirect(response)
          expect(/#$/.test(window.location.href)).toBe(true)
        })

        it('returns false if status is not 401', function () {
          response.status = 200
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(window.location.href)
        })

        it('returns false if response object is invalid', function () {
          var currentUri = window.location.href

          response.status = undefined
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          response.status = 401

          response.responseJSON.redirectUri = undefined
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          response.responseJSON = {}
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          response = {}
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          helpers.utilities.redirect(undefined)
          expect(window.location.href).toBe(currentUri)
        })
      })

      describe('.redirect', function () {
        var response = { 'responseJSON': { 'redirectUri': '#' } }

        it('loads page at ".responseJSON.redirectUri" specified in valid response object', function () {
          helpers.utilities.redirect(response)
          expect(/#$/.test(window.location.href)).toBe(true)
        })

        it('ignores invalid response object', function () {
          var currentUri = window.location.href

          response.responseJSON.redirectUri = undefined
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          response.responseJSON = {}
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          response = {}
          helpers.utilities.redirect(response)
          expect(window.location.href).toBe(currentUri)

          helpers.utilities.redirect(undefined)
          expect(window.location.href).toBe(currentUri)
        })
      })

      describe('.setFormState', function () {
        var $form = $(
          '<form style="visibility:hidden">' +
            '<input name="value1" value="something 1"/>' +
            '<input name="email" type="email" value="test@test.com"/>' +
            '<textarea>test</textarea>' +
            '<input name="value2" value="something 2"/><button type="submit" class="button" value="go" />' +
          '</form>'
        )
        var $button = $('<button type="submit" class="button" value="go" />')

        it('disables form fields', function () {
          helpers.utilities.setFormState($form, true)

          $form.find('input, textarea, button').each(function (idx, element) {
            expect($(element).prop('disabled')).toBe(true)
            expect($(element).attr('aria-disabled')).toBe('true')
          })
        })

        it('enables disabled form fields', function () {
          helpers.utilities.setFormState($form, true)
          helpers.utilities.setFormState($form, false)

          $form.find('input , button').each(function (idx, element) {
            expect($(element).prop('disabled')).toBe(false)
            expect($(element).attr('aria-disabled')).toBe('false')
          })
        })

        it('disables form button', function () {
          helpers.utilities.setFormState($button, false)

          expect($button.prop('disabled')).toBe(false)
          expect($button.attr('aria-disabled')).toBe('false')
        })

        it('enables disabled form button', function () {
          helpers.utilities.setFormState($button, false)
          helpers.utilities.setFormState($button, true)

          expect($button.prop('disabled')).toBe(true)
          expect($button.attr('aria-disabled')).toBe('true')
        })
      })
    })
  })

  describe('.apiCollaboratorResponse', function () {
    describe('.callbacks', function () {
      describe('.success', function () {
        var $container
        var underTest = ajaxCallbacks.apiCollaboratorResponse.callbacks.success
        var targets = {
          success: null
        }
        var response = {
          registeredUser: false
        }

        beforeEach(function () {
          $container = setFixtures('<tbody data-collaborator-list></tbody>')
        })

        afterEach(function () {
          $container.empty()
        })

        it('appends "Admin" when Administrator checked', function () {
          var $form = $(
            '<form>' +
              '<input name="email" value="user1@example.com"/>' +
              '<input type="radio" checked name="role" value="ADMINISTRATOR"/>' +
              '<input type="radio" name="role" value="DEVELOPER"/>' +
            '</form>'
          )
          var data = $form.serialize()
          underTest(response, $form, data, helpers, targets, null, null)
          var $td = $container.find('td')
          expect($td[0].innerText).toBe('user1@example.com')
          expect($td[1].innerText).toBe('Admin')
        })

        it('appends "Developer" when Developer checked', function () {
          var $form = $(
            '<form>' +
              '<input name="email" value="user2@example.com"/>' +
              '<input type="radio" name="role" value="ADMINISTRATOR"/>' +
              '<input type="radio" checked name="role" value="DEVELOPER"/>' +
            '</form>'
          )
          var data = $form.serialize()
          underTest(response, $form, data, helpers, targets, null, null)
          var $td = $container.find('td')
          expect($td[0].innerText).toBe('user2@example.com')
          expect($td[1].innerText).toBe('Developer')
        })

        it('appends nothing when role not set', function () {
          var $form = $(
            '<form>' +
              '<input name="email" value="user3@example.com"/>' +
              '<input type="radio" name="role" value="ADMINISTRATOR"/>' +
              '<input type="radio" name="role" value="DEVELOPER"/>' +
            '</form>'
          )
          var data = $form.serialize()
          underTest(response, $form, data, helpers, targets, null, null)
          var $td = $container.find('td')
          expect($td[0].innerText).toBe('user3@example.com')
          expect($td[1].innerText).toBe('')
        })

        it('invites user to register with deb hub when adding a collaborator', function () {
          setFixtures('<h1 id="application" data-title="Application Title"/>')
          var $form = $(
            '<form>' +
              '<div class="alert alert--info hidden js-info" role="alert">' +
                '<p class="alert__message"></p>' +
              '</div>' +
            '</form>'
          )
          var data = $form.serialize()
          underTest(response, $form, data, helpers, targets, null, null)
          var $message = $form.find('p')
          expect($message[0].innerText).toContain('inviting them to register with the Application Title.')
        })
      })
    })
  })
})
