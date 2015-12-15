/**
 * Character Counter Module Tests
 */

require('jquery');

describe("Given I have two empty textarea elements set up with a char counter", function() {

  jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
  var charCounter = require('../../javascripts/modules/charCounter.js');

  describe("When I load the page", function() {

    beforeEach(function() {
      loadFixtures('charCounter-fixtures.html');
      charCounter();
    });

    it("The first counter should read 10 remaining characters", function() {
      expect($('#fieldContainer1 [data-counter]').text()).toBe("10");
    });

    it("The second counter should read 2 remaining characters", function() {
      expect($('#fieldContainer2 [data-counter]').text()).toBe("2");
    });

  });

  describe("When I type some text in the first field", function() {

    beforeEach(function() {
      loadFixtures('charCounter-fixtures.html');
      charCounter();
      $('#fieldContainer1 [data-char-field]').val('Some text').trigger('input');
    });

    it("The first counter should read 1 remaining character", function() {
      expect($('#fieldContainer1 [data-counter]').text()).toBe("1");
    });

    it("The first counter text should read 'character'", function() {
      expect($('#fieldContainer1 [data-char-text]').text()).toBe("character");
    });

  });

  describe("When I type two characters in the second field", function() {

    beforeEach(function() {
      loadFixtures('charCounter-fixtures.html');
      charCounter();
      $('#fieldContainer1 [data-char-field]').val('AB').trigger('input');
    });

    it("The counter text should read 'characters'", function() {
      expect($('#fieldContainer1 [data-char-text]').text()).toBe("characters");
    });

  });

});
