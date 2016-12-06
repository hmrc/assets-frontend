require('jquery');
require('validate');

var form, formInline, $formElement,
	customValidations,
	$errorSummary, $errorSummaryMessages, $errorSummaryHeading,
	$submitButton,
	$fromDateGroup, $toDateGroup, $noMinMaxDateGroup,
	$errorMessageItems,
	$noMinMaxDateSummaryError, $noMinMaxDateCustomSummaryError,
	$toDateSummaryError, $toDateCustomSummaryError,
	$fromDateSummaryError, $fromDateCustomSummaryError,
	$dateGroupError = function (groupPrefix) { return $('#' + groupPrefix + 'Date-error-message'); },
	$dateParseError = function (groupPrefix) { return $('#' + groupPrefix + 'Date-parse-error-message'); },
	$inlineDateGroupErrorList = function(group) { return $('ul.error-notification--group[data-group-error-list="' + group + '"]'); },
	$summaryLinkById = function($element) { return $('[id="' + $element.attr('id') + '-error"]'); },
	dateGeneralErrorText = function(groupPrefix) { return 'Enter a ‘' + groupPrefix + ' date’.'; },
	dateCustomErrorText = function(groupPrefix) { return 'Enter a valid ‘' + groupPrefix + ' date’.'; },
	dateDayRequiredText = function(groupPrefix) { return 'Enter the day of month for the ‘' + groupPrefix + ' date’.'; },
	dateMonthRequiredText = function(groupPrefix) { return 'Enter the month for the ‘' + groupPrefix + ' date’.'; },
	dateYearRequiredText = function(groupPrefix) { return 'Enter the year for the ‘' + groupPrefix + ' date’.'; },
	$dateGroupField = function(groupPrefix, field) { return $('[name="' + groupPrefix + 'Date.' + field + '"]'); },
	$dateGroupFieldError = function(groupPrefix, field) { return $('.error-notification[data-input-name="' + groupPrefix + 'Date-' + field + '"]'); },
  setup = function() {
    form.init();
    formInline.init();
    $formElement = $('.js-form');
    customValidations();
    $errorSummary = $('.error-summary');
    $errorSummaryMessages = $('.js-error-summary-messages');
    $submitButton = $('#submit-button');
    $errorSummaryHeading = $('#errorSummaryHeading');
    $fromDateGroup = $('#fromDate');
    $toDateGroup = $('#toDate');
    $noMinMaxDateGroup = $('#noMinMaxDate');


    $formElement.on('submit', function() {
      $errorMessageItems = $errorSummaryMessages.find('> li');
      $fromDateCustomSummaryError = $('#fromDate-parse-error');
      $fromDateSummaryError = $('#fromDate-error');
      $toDateCustomSummaryError = $('#toDate-parse-error');
      $toDateSummaryError = $('#toDate-error');
      $noMinMaxDateCustomSummaryError = $('#noMinMaxDate-parse-error');
      $noMinMaxDateSummaryError = $('#noMinMaxDate-error');
    });
  };

describe('Form Validation for inline group elements', function() {

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
    loadFixtures('formInlineGroup-fixture.html');
    form = require('../../javascripts/validation/form.js');
    formInline = require('../../javascripts/validation/formInlineGroup.js');
    document.getElementById(jasmine.getFixtures().containerId).classList.add('js');
    customValidations = require('../../javascripts/validation/customValidations.js');
  });

  describe('', function() {
    beforeEach(function() {
      setup();
    });

    describe('When I load the page', function() {
      it('The error summary should be hidden', function() {
        expect($errorSummary).not.toHaveClass('error-summary--show');
      });

      it('The error summary should contain no errors', function() {
        expect($errorSummaryMessages.find('> li').length).toBe(0);
      });

      it('The form should have no errors', function() {
        expect(form.getErrorMessages().length).toBe(0);
      });
    });

    describe('When I use date elements with min and max ‘dateGroupValid’ parameters', function() {

      describe('And I submit empty date field values', function() {
        beforeEach(function() {
          $submitButton.click();
        });

        it('The form error summary should display the ‘fromDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateDayRequiredText('from'));
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateMonthRequiredText('from'));
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateYearRequiredText('from'));
        });

        it('The form error summary should display the ‘toDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($toDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('to'));
          expect($toDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('to'));


          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateDayRequiredText('to'));
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateMonthRequiredText('to'));
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateYearRequiredText('to'));
        });

        it('The ‘fromDate’ inline errors should display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('from')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('from')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'day')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'month')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'year')).is(':visible')).toBe(true);
        });

        it('The ‘toDate’ inline errors should display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('to')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('to')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'day')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'month')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'year')).is(':visible')).toBe(true);
        });
      });

      describe('And I update submitted empty date field values without re-submitting', function() {
        beforeEach(function() {
          $submitButton.click();
        });

        it('The form error summary does not show error messages relating to ‘fromDate’ group when valid values entered', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('from')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('from')).is(':visible')).toBe(false);

          expect($inlineDateErrors.find($dateGroupFieldError('from', 'day')).is(':visible')).toBe(true);
          $dateGroupField('from', 'day').focus().val(2);

          expect($inlineDateErrors.find($dateGroupFieldError('from', 'month')).is(':visible')).toBe(true);
          $dateGroupField('from', 'month').focus().val('Aug');

          expect($inlineDateErrors.find($dateGroupFieldError('from', 'year')).is(':visible')).toBe(true);
          $dateGroupField('from', 'year').focus().val('2016');

          $submitButton.focus();

          expect($inlineDateErrors.find($dateGroupFieldError('from', 'day'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'month'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'year'))).toHaveText('');

          expect($inlineDateErrors.find($dateGroupError('from'))).not.toBeVisible();
          expect($inlineDateErrors.find($dateParseError('from'))).not.toBeVisible();

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();


          expect($fromDateSummaryError).not.toBeInDOM();
          expect($fromDateCustomSummaryError).not.toBeInDOM();
        });

        it('The form error summary does not show error messages relating to ‘toDate’ group when valid values entered', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');

          expect($inlineDateErrors.find($dateGroupError('to')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('to')).is(':visible')).toBe(false);

          expect($inlineDateErrors.find($dateGroupFieldError('to', 'day')).is(':visible')).toBe(true);
          $dateGroupField('to', 'day').focus().val(2);

          expect($inlineDateErrors.find($dateGroupFieldError('to', 'month')).is(':visible')).toBe(true);
          $dateGroupField('to', 'month').focus().val('8');

          expect($inlineDateErrors.find($dateGroupFieldError('to', 'year')).is(':visible')).toBe(true);
          $dateGroupField('to', 'year').focus().val('2017');

          $submitButton.focus();

          expect($inlineDateErrors.find($dateGroupFieldError('to', 'day'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'month'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'year'))).toHaveText('');

          expect($inlineDateErrors.find($dateGroupError('to'))).not.toBeVisible();
          expect($inlineDateErrors.find($dateParseError('to'))).not.toBeVisible();

          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();

          expect($toDateSummaryError).not.toBeInDOM();
          expect($toDateCustomSummaryError).not.toBeInDOM();
        });
      });
      
      describe('And when I submit valid date field values', function() {
        beforeEach(function() {
          $dateGroupField('from', 'day').val('01');
          $dateGroupField('from', 'month').val('Jul');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The form error summary should not display the ‘fromDate’ group general error message or any of the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateGeneralErrorText('from'));
          expect($toDateSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();
        });

        it('The form error summary should not display the ‘toDate’ group general error message or any of the group’s field specific inline error messages', function() {
          expect($toDateSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateGeneralErrorText('to'));
          expect($toDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('to'));

          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The ‘fromDate’ inline errors should not display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('from')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateParseError('from')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'day')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'month')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('from', 'year')).is(':visible')).toBe(false);
        });

        it('The ‘toDate’ inline errors should display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('to')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateParseError('to')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'day')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'month')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('to', 'year')).is(':visible')).toBe(false);
        });
      });

      describe('And when I submit a pattern invalid abbreviation string in the ‘fromDate’ group month field value', function () {

        beforeEach(function() {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('xXx');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The ‘fromDate’ group month field should have the input type ‘text’', function() {
          expect($dateGroupField('from', 'month').is('[type="text"]')).toBe(true);
        });

        it('The form error summary should display the ‘fromDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘fromDate’ inline group error message and the ‘fromDate’ month field inline error message', function() {
          var fieldError = 'The ‘from date’ month you have entered is invalid. Enter the first 3 letters of the month or write the month as a number between 1 and 12.';
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('from'));
          expect($inlineDateErrors.text()).toContain(fieldError);

          expect($dateGroupField('from', 'month').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupFieldError('from', 'month').is(':visible')).toBe(true);
        });
      });

      describe('And when I submit a range invalid number in the ‘toDate’ group month field value', function() {

        beforeEach(function () {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('Jul');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('13');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The ‘toDate’ group month field should have the input type ‘number’', function() {
          expect($dateGroupField('to', 'month').is('[type="number"]')).toBe(true);
        });

        it('The form error summary should display the ‘toDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($toDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('to'));
          expect($toDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('to'));


          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘toDate’ inline group error message and the ‘toDate’ month field inline error message', function () {
          var fieldError = 'The ‘to date’ month entered is not valid. Enter a number between 1 and 12';
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('to'));
          expect($inlineDateErrors.text()).toContain(fieldError);

          expect($dateGroupField('to', 'month').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupFieldError('to', 'month').is(':visible')).toBe(true);
        });
      });

      describe('And when I submit a pattern invalid in the ‘fromDate’ group year field value', function() {
        beforeEach(function() {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('Jul');
          $dateGroupField('from', 'year').val('20166');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The year field should have the input type ‘number’', function() {
          expect($dateGroupField('from', 'year').is('[type="number"]')).toBe(true);
        });

        it('The form error summary should display the ‘fromDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('from'));


          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘fromDate’ inline group error message and the ‘fromDate’ month field inline error message', function () {
          var fieldError = 'The ‘from date’ year entered is not valid. Enter the year as a 4 digit number.';
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('from'));
          expect($inlineDateErrors.text()).toContain(fieldError);

          expect($dateGroupField('from', 'month').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupFieldError('from', 'month').is(':visible')).toBe(true);
        });
      });

      describe('And when I submit an invalid minimum value in the ‘fromDate’ group year field', function() {
        beforeEach(function() {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('12');
          $dateGroupField('from', 'year').val('2015');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The form error summary should display the ‘fromDate’ group general error and custom ‘dategroupvalid’ message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘fromDate’ inline group error and custom ‘dategroupvalid’ messages', function () {
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('from'));
          expect($inlineDateErrors.text()).toContain(dateCustomErrorText('from'));

          expect($dateGroupField('from', 'day').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupError('from').is(':visible')).toBe(true);
          expect($dateParseError('from').is(':visible')).toBe(true);        
        });
      });
     
      describe('And when I submit an invalid two-digit value in the ‘toDate’ group year field', function() {

        beforeEach(function() {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('Jul');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('18');
          $submitButton.click();
        });

        it('The year field should have the input type ‘number’', function() {
          expect($dateGroupField('to', 'year').is('[type="number"]')).toBe(true);
        });

        it('The form error summary should display the ‘toDate’ group general error and custom ‘dategroupvalid’ message and not the group’s field specific inline error messages', function() {
          expect($toDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('to'));
          expect($toDateCustomSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateCustomErrorText('to'));

          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘toDate’ inline group error and custom ‘dategroupvalid’ messages', function () {
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('to'));
          expect($inlineDateErrors.text()).toContain(dateCustomErrorText('to'));

          expect($dateGroupField('to', 'day').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupError('to').is(':visible')).toBe(true);
          expect($dateParseError('to').is(':visible')).toBe(true);
        });
      });
     
      describe('And when I submit an invalid day for the month in the ‘fromDate’ fields', function() {
        beforeEach(function() {
          $dateGroupField('from', 'day').val('31');
          $dateGroupField('from', 'month').val('Nov');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The form error summary should display the ‘fromDate’ group general error and custom ‘dategroupvalid’ message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘fromDate’ inline group error and custom ‘dategroupvalid’ messages', function () {
          var $inlineDateErrors = $inlineDateGroupErrorList('fromDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('from'));
          expect($inlineDateErrors.text()).toContain(dateCustomErrorText('from'));

          expect($dateGroupField('from', 'day').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupError('from').is(':visible')).toBe(true);
          expect($dateParseError('from').is(':visible')).toBe(true);
        });
      });

      describe('And when I submit an invalid leap year date  in the ‘toDate’ fields', function() {
        beforeEach(function() {
          $dateGroupField('to', 'day').val('29');
          $dateGroupField('to', 'month').val('Feb');
          $dateGroupField('to', 'year').val('2016');
          $dateGroupField('to', 'day').val('29');
          $dateGroupField('to', 'month').val('2');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The form error summary should display the ‘toDate’ group general error and custom ‘dategroupvalid’ message and not the group’s field specific inline error messages', function() {
          expect($toDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('to'));
          expect($toDateCustomSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateCustomErrorText('to'));

          expect($summaryLinkById($dateGroupField('to', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('to', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘toDate’ inline group error and custom ‘dategroupvalid’ messages', function () {
          var $inlineDateErrors = $inlineDateGroupErrorList('toDate').find('> li');

          expect($inlineDateErrors.text()).toContain(dateGeneralErrorText('to'));
          expect($inlineDateErrors.text()).toContain(dateCustomErrorText('to'));

          expect($dateGroupField('to', 'day').closest('.form-field-group--error').is(':visible')).toBe(true);
          expect($dateGroupError('to').is(':visible')).toBe(true);
          expect($dateParseError('to').is(':visible')).toBe(true);
        });
      });

      describe('And when I submit an valid leap year date  in the ‘fromDate’ fields', function() {

        beforeEach(function() {
          $dateGroupField('from', 'day').val('29');
          $dateGroupField('from', 'month').val('Feb');
          $dateGroupField('from', 'year').val('2016');
          $dateGroupField('to', 'day').val('01');
          $dateGroupField('to', 'month').val('7');
          $dateGroupField('to', 'year').val('17');
          $submitButton.click();
        });

        it('The form error summary should display the ‘fromDate’ group general error and custom ‘dategroupvalid’ message and not the group’s field specific inline error messages', function() {
          expect($fromDateSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateGeneralErrorText('from'));
          expect($fromDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('from'));

          expect($summaryLinkById($dateGroupField('from', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('from', 'year'))).not.toBeInDOM();
        });

        it('The form should display the ‘fromDate’ inline group error and custom ‘dategroupvalid’ messages', function () {
          expect($dateGroupField('from', 'day').closest('.form-field-group--error').is(':visible')).not.toBe(true);
          expect($dateGroupError('from').is(':visible')).not.toBe(true);
          expect($dateParseError('from').is(':visible')).not.toBe(true);
        });
      });
    });

    describe('When I use date elements without min and max ‘dateGroupValid’ parameters', function() {
      describe('And I submit empty date field values', function() {
        beforeEach(function() {
          $submitButton.click();
        });

        it('The form error summary should display the ‘noMinMaxDate’ group general error message and not the group’s field specific inline error messages', function() {
          expect($noMinMaxDateSummaryError).toBeInDOM();
          expect($errorMessageItems.text()).toContain(dateGeneralErrorText('no min/max'));
          expect($noMinMaxDateCustomSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('no min/max'));

          expect($summaryLinkById($dateGroupField('noMinMax', 'day'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateDayRequiredText('noMinMax'));
          expect($summaryLinkById($dateGroupField('noMinMax', 'month'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateMonthRequiredText('noMinMax'));
          expect($summaryLinkById($dateGroupField('noMinMax', 'year'))).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateYearRequiredText('noMinMax'));
        });
        
        it('The ‘noMinMaxDate’ inline errors should display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('noMinMaxDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('noMinMax')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('noMinMax')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'day')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'month')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'year')).is(':visible')).toBe(true);
        });
      });

      describe('And I update submitted empty date field values without re-submitting', function() {
        beforeEach(function() {
          $submitButton.click();
        });
        
        it('The form error summary does not show error messages relating to ‘noMinMaxDate’ group when valid values entered', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('noMinMaxDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('noMinMax')).is(':visible')).toBe(true);
          expect($inlineDateErrors.find($dateParseError('noMinMax')).is(':visible')).toBe(false);
          
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'day')).is(':visible')).toBe(true);
          $dateGroupField('noMinMax', 'day').focus().val(2);
          
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'month')).is(':visible')).toBe(true);
          $dateGroupField('noMinMax', 'month').focus().val('07');
          
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'year')).is(':visible')).toBe(true);
          $dateGroupField('noMinMax', 'year').focus().val('2016');
          
          $submitButton.focus();
          
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'day'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'month'))).toHaveText('');
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'year'))).toHaveText('');
          
          expect($inlineDateErrors.find($dateGroupError('noMinMax'))).not.toBeVisible();
          expect($inlineDateErrors.find($dateParseError('noMinMax'))).not.toBeVisible();
          
          expect($summaryLinkById($dateGroupField('noMinMax', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('noMinMax', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('noMinMax', 'year'))).not.toBeInDOM();
          
          
          expect($noMinMaxDateSummaryError).not.toBeInDOM();
          expect($noMinMaxDateCustomSummaryError).not.toBeInDOM();
        });
      });

      describe('And when I submit valid date field values', function() {
        beforeEach(function(){
          $dateGroupField('noMinMax', 'day').val('01');
          $dateGroupField('noMinMax', 'month').val('7');
          $dateGroupField('noMinMax', 'year').val('2016');

          $submitButton.click();
        });

        it('The form error summary should not display the ‘noMinMaxDate’ group general error message or any of the group’s field specific inline error messages', function() {
          expect($noMinMaxDateSummaryError).not.toBeInDOM();
          expect($errorMessageItems.text()).not.toContain(dateGeneralErrorText('no ‘min/max’'));
          expect($errorMessageItems.text()).not.toContain(dateCustomErrorText('no ‘min/max’'));

          expect($summaryLinkById($dateGroupField('noMinMax', 'day'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('noMinMax', 'month'))).not.toBeInDOM();
          expect($summaryLinkById($dateGroupField('noMinMax', 'year'))).not.toBeInDOM();
        });


        it('The ‘noMinMaxDate’ inline errors should not display the group’s error message and the field specific inline error messages', function() {
          var $inlineDateErrors = $inlineDateGroupErrorList('noMinMaxDate').find('> li');
          expect($inlineDateErrors.find($dateGroupError('noMinMax')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateParseError('noMinMax')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'day')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'month')).is(':visible')).toBe(false);
          expect($inlineDateErrors.find($dateGroupFieldError('noMinMax', 'year')).is(':visible')).toBe(false);
        });

      });
    });
  });
});
