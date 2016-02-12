require('jquery');
require('validate');

var ERROR_SUMMARY_HEADER_TEXT = 'There are errors on the page.';
var form;
var $formElement;
var customValidations;
var $errorSummary;
var $errorSummaryMessages;
var $submitButton;
var $errorSummaryHeading;
var $textInputExample;
var $radioYesElement;
var $radioNoElement;

var setup = function () {
  form.init();
  $formElement = $('.js-form');
  customValidations();
  $errorSummary = $('.error-summary');
  $errorSummaryMessages = $('.js-error-summary-messages');
  $submitButton = $('#submit-button');
  $errorSummaryHeading = $('#errorSummaryHeading');
  $textInputExample = $('#text-input-example');
  $radioYesElement = $('#radio-yes');
  $radioNoElement = $('#radio-no');
};

describe('Form Validation', function () {

  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('form-fixture.html');
    form = require('../../javascripts/validation/form.js');
    customValidations = require('../../javascripts/validation/customValidations.js');
  });

  describe('', function () {
    beforeEach(setup);

    describe('When I load the page', function () {
      it('The error summary should be hidden', function () {
        expect($errorSummary).not.toHaveClass('error-summary--show');
      });

      it('The error summary should contain no errors', function () {
          expect($errorSummaryMessages.find('> li').length).toBe(0);
      });

      it('The form should have no errors', function () {
          expect(form.getErrorMessages().length).toBe(0)
      });
    });

    describe('When I submit the form without filling it out', function () {

      beforeEach(function () {
        $submitButton.click();
      });

      it('The error summary should be visible', function () {
        expect($errorSummary).toHaveClass('error-summary--show');
        expect($errorSummaryHeading.text()).toBe(ERROR_SUMMARY_HEADER_TEXT);
      });

      it('The error summary should contain 2 errors', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');

        expect($errorMessages.length).toBe(2);
        expect($errorMessages.eq(0).text()).toBe($textInputExample.attr('data-msg-required'));
        expect($errorMessages.eq(1).text()).toBe($radioYesElement.attr('data-msg-required'));
      });

      it('The form should have 2 errors', function () {
        expect(form.getErrorMessages().length).toBe(2);
      });
    });

    describe('When I submit the form with filling it out', function () {

      beforeEach(function () {
        $textInputExample.val('4567878');
        $radioYesElement.click();
        $submitButton.on('click', function (event) {
            event.preventDefault();
            // prevent form submission - will cause page reload error in jasmine
        }).click();
      });

      it('The error summary should not be visible', function () {
        expect($errorSummary).not.toHaveClass('error-summary--show');
      });

      it('The error summary should contain 0 errors', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.length).toBe(0);
      });

      it('The form should have 0 errors', function () {
        expect(form.getErrorMessages().length).toBe(0);
      });
    });


    describe('When I enter the wrong pattern on text input and submit', function () {

      beforeEach(function () {
        // select radio button, add wrong format value to text input
        $textInputExample.val('wrong!');
        $radioYesElement.click();
        $submitButton.click();
      });

      it('The error summary should be visible', function () {
        expect($errorSummary).toHaveClass('error-summary--show');
        expect($errorSummaryHeading.text()).toBe(ERROR_SUMMARY_HEADER_TEXT);
      });

      it('The error summary should contain 1 error', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.length).toBe(1);
      });

      it('The form should have 1 error', function () {
        expect(form.getErrorMessages().length).toBe(1);
      });

      it('The form should have the invalid pattern error message', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.eq(0).text()).toBe($textInputExample.attr('data-msg-pattern'));
      });
    });

    describe('When I enter value below min length and submit', function () {

      beforeEach(function () {
        // select radio button, add value below min length to text input
        $textInputExample.val('55');
        $radioYesElement.click();
        $submitButton.click();
      });

      it('The error summary should be visible', function () {
        expect($errorSummary).toHaveClass('error-summary--show');
        expect($errorSummaryHeading.text()).toBe(ERROR_SUMMARY_HEADER_TEXT);
      });

      it('The error summary should contain 1 error', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.length).toBe(1);
      });

      it('The form should have 1 error', function () {
        expect(form.getErrorMessages().length).toBe(1);
      });

      it('The form should have the invalid pattern error message', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.eq(0).text()).toBe($textInputExample.attr('data-msg-minlength'));
      });
    });

    describe('When I do not select a radio input and submit', function () {

      beforeEach(function () {
        // do not select radio button, add correct value for text input
        $textInputExample.val('55888');
        $submitButton.click();
      });

      it('The error summary should be visible', function () {
        expect($errorSummary).toHaveClass('error-summary--show');
        expect($errorSummaryHeading.text()).toBe(ERROR_SUMMARY_HEADER_TEXT);
      });

      it('The error summary should contain 1 error', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.length).toBe(1);
      });

      it('The form should have 1 error', function () {
        expect(form.getErrorMessages().length).toBe(1);
      });

      it('The form should have the radio required error message', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.eq(0).text()).toBe($radioYesElement.attr('data-msg-required'));
      });
    });

    describe('When I enter value below min length and blur', function () {

      beforeEach(function () {
        // select radio button, add value below min length to text input
        $radioYesElement.click();
        $textInputExample.val('55').blur();
      });

      it('The error summary should not be visible', function () {
        expect($errorSummary).not.toHaveClass('error-summary--show');
      });

      it('The error summary should be visible for accessibility users', function () {
        expect($errorSummary).toHaveClass('visuallyhidden');
      });

      it('The error summary should contain 1 errors', function () {
        var $errorMessages = $errorSummaryMessages.find('> li');
        expect($errorMessages.length).toBe(1);
        expect($errorMessages.eq(0).text()).toBe($textInputExample.attr('data-msg-minlength'));
      });

      it('The form should have 1 error', function () {
        expect(form.getErrorMessages().length).toBe(1);
      });

      it('The form should have the invalid pattern inline error message', function () {
        var $inlineErrorMessage = $('#text-input-example-error-message');
        expect($inlineErrorMessage.text()).toBe($textInputExample.attr('data-msg-minlength'));
      });
    });

  });
});
