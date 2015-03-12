require('jquery');

describe("Given there is a checkbox that must be checked to continue", function() {

  var $button,
      $checkbox,
      conditionallyDisableButton;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('toggle-button-fixture.html');

    conditionallyDisableButton = require('../../javascripts/modules/conditionallyDisableButton.js');
    conditionallyDisableButton();

    $checkbox = $('input[type=checkbox]');
    $button = $('input[type=submit]');
  });

  describe("When the page loads", function() {
    it("The checkbox should not be checked", function() {
      expect($checkbox).toBeInDOM();
      expect($checkbox).not.toBeChecked();
    });

    it('And its data-toggle-button attribute should equal the button\'s name attribute', function() {
      expect($checkbox).toHaveAttr('data-toggle-button', $button.attr('name'));
    });

    it("The button should be disabled", function() {
      expect($button).toBeDisabled();
    });
  });

  describe("When the checkbox is checked", function() {
    it('The button should not be disabled', function() {
      $checkbox.click();
      expect($checkbox).toBeChecked();
      expect($button).not.toBeDisabled();
    });
  });

  describe("When the checkbox is unchecked", function() {
    it('The button should be disabled', function() {
      $checkbox.click();
      $checkbox.click();
      expect($checkbox).not.toBeChecked();
      expect($button).toBeDisabled();
    });
  });

});
