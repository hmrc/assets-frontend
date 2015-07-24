require('jquery');

jasmine.getFixtures().fixturesPath = "base/specs/fixtures/"; 

preloadFixtures('ajax-form-client-access-request.html');

var ajaxCallbacks = require('../../javascripts/modules/ajaxCallbacks.js'),
  helpers = ajaxCallbacks.helpers;

describe('AjaxCallbacks', function () {
  describe('helpers', function () {

    describe('.getEmailValue', function () {
      var emailValue = 'test@email.com', 
        $form = $('<form style="visibility:hidden">' +
        '<input name="value1" value="something 1"/>' +
        '<input name="email" type="email" value="'+ emailValue +'"/>' +
        '<input name="value2" value="something 2"/><button type="submit" class="button" value="go" />' +
        '</form>'),
        data = $form.serialize();

      it('returns the email value from the input element', function() {
        expect(helpers.getEmailValue($form, data)).toBe(emailValue);
      });

      it('returns the email value from the input element in the container (when no data supplied)', function() {
        expect(helpers.getEmailValue($form)).toBe(emailValue);
      });

      it('returns the email value from the supplied data (when no container supplied)', function() {
        expect(helpers.getEmailValue(undefined, data)).toBe(emailValue);
      });

      it('returns the empty string when no container or data supplied', function() {
        expect(helpers.getEmailValue()).toBe('');
      });
    });
    
    describe('.resetForms', function () {
      var $main = $('#missing-client'),
        $nestedForms = $('#verify-form').find('div[id^="client_"][id$="notes"]'),
        emailSelector = 'input[type="email"]',
        buttonSelector = 'input[type=submit], button[type=submit]';

      beforeEach(function() {
        loadFixtures('ajax-form-client-access-request.html');
        
        $main.find(buttonSelector).prop('disabled', true);
        
        $nestedForms.each(function(){
          $(this).find(buttonSelector).prop('disabled', true);
        });
      });
      
      it('leaves all buttons enabled', function() {
        helpers.resetForms(helpers, '', $main.serialize(), '#' + $main.attr('id'));

        $('#' + jasmine.getFixtures().containerId).find(buttonSelector).each(function () {
          expect($(this).is(':disabled')).toBe(false);
        });
      });
      
      it('sets all email input fields to value  email in submitted form', function() {
        
        helpers.resetForms(helpers, '', $main.serialize(), '#' + $main.attr('id'));
        
        $nestedForms.each(function() {
          expect($(this).find(emailSelector).val()===$main.find(emailSelector).val()).toBe(true);
        });
      });

    });
  });

  describe('helpers.utilities', function () {
    describe('.getElementInnerHtml should return', function () {
      var  $html = setFixtures('<div><span>inner html</span></div>'),
          $span = $html.find('span');
      
      it('inner html of named element', function () {
        expect(helpers.utilities.getElementInnerHtml($html.html(), 'div').html()).toEqual($span.html());
      });

      it('empty string if named element not found', function () {
        expect(helpers.utilities.getElementInnerHtml($html.html(), 'pre')).toEqual('');
      });
    
      it('empty string if named element not specified', function () {
        expect(helpers.utilities.getElementInnerHtml($html.html())).toEqual('');
      });
    });

    describe('.cleanHtml should return', function () {
      var uncleanHtml = '\r\n<html><head>\r\n</head><body>\r\n<h1> unclean\r\n\t html </h1> </body>          </html>      \r\n',
          cleanHtml = '<html><head></head><body><h1> unclean html </h1></body></html>',
          startsWithWhitespace = /^[\r\n\f\t]+/,
          endsWithWhitespace = /[\r\n\f\t]+$/,
          containsNonTagWhitespace = />\s+</g;
      
      it('cleaned html, with unnecessary whitespace removed', function() {
        // test the fixtures and regexp patterns used to test
        expect(startsWithWhitespace.test(uncleanHtml)).toBe(true);
        expect(startsWithWhitespace.test(cleanHtml)).toBe(false);

        expect(endsWithWhitespace.test(uncleanHtml)).toBe(true);
        expect(endsWithWhitespace.test(cleanHtml)).toBe(false);

        expect(containsNonTagWhitespace.test(uncleanHtml)).toBe(true);
        expect(containsNonTagWhitespace.test(cleanHtml)).toBe(false);

        expect(helpers.utilities.cleanHtml(uncleanHtml)).toEqual(cleanHtml);
      });
      
      it('html without whitespace at the start', function() {
        expect(startsWithWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false);
      });

      it('html without whitespace at the end', function() {
        expect(endsWithWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false);
      });

      it('html without unnecessary whitespace between tags', function() {
        expect(containsNonTagWhitespace.test(helpers.utilities.cleanHtml(uncleanHtml))).toBe(false);
      });
    });

    describe('.isFullPageError() should return', function () {
      var fullPageError = '<div style="visibility:hidden"><p>blah</p><h1>Sorry, we’re experiencing technical difficulties</h1><p>blah</p></div>',
          $fullPageError = setFixtures(fullPageError);

      it('true, when page contains full page error heading and text', function () {
        var $heading = $fullPageError.find('h1');
        expect($heading.length).toBeTruthy();
        expect($heading.text().length).toBeTruthy();

        expect(helpers.utilities.isFullPageError(helpers, $fullPageError.html())).toBe(true);
      });

      it('false when page contains full page error heading without text', function () {
        var $fullPageErrorClone = $fullPageError.clone(),
            $headingNoText = $fullPageErrorClone.find('h1');

        expect($headingNoText.length).toBeTruthy();
        
        $headingNoText.text('');
        expect($headingNoText.text().length).toBeFalsy();

        expect(helpers.utilities.isFullPageError(helpers, $fullPageErrorClone.html())).toBe(false);
      });
      
      it('false when html param is null', function () {
        expect(helpers.utilities.isFullPageError(helpers, null)).toBe(false);
      });

      it('false when html param is undefined', function () {
        expect(helpers.utilities.isFullPageError(helpers, undefined)).toBe(false);
      });

      it('false when html param is empty string', function () {
        expect(helpers.utilities.isFullPageError(helpers, '')).toBe(false);
      });

      it('false when html param is missing', function () {
        expect(helpers.utilities.isFullPageError()).toBe(false);
      });
      
    });
  });
});
