require('jquery');

describe("Given I have a toggle on value module an input and three targets on the page", function() {

  var hidden = 'hidden';

  var toggleOnValue,
      $input,
      $target1,
      $target2,
      $target3;

  beforeEach(function() {

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('toggle-on-value-fixture.html');

    toggleOnValue = require('../../javascripts/modules/toggleOnValue.js');

  });

  describe("When I load the page", function() {

    beforeEach(function() {

      loadFixtures('toggle-on-value-fixture.html');
      toggleOnValue();

      $input = $('#toggle-element');

      $target1 = $('#item1');
      $target2 = $('#item2');
      $target3 = $('#item3');
    });

    it("Item 1 should be visible", function() {
      expect($target1).not.toHaveClass(hidden);
    });

    it("Item 2 and 3 should be hidden", function() {
      expect($target2).toHaveClass(hidden);
      expect($target3).toHaveClass(hidden);
    });
  });

  describe("When the input value is set to 2", function() {

    beforeEach(function() {

      loadFixtures('toggle-on-value-fixture.html');
      toggleOnValue();

      $input = $('#toggle-element');

      $target1 = $('#item1');
      $target2 = $('#item2');
      $target3 = $('#item3');

      $input.val("2").change();
    });

    it("Item 2 should be visible", function() {
      expect($target2).not.toHaveClass(hidden);
    });

    it("Item 1 and 3 should be hidden", function() {
      expect($target1).toHaveClass(hidden);
      expect($target3).toHaveClass(hidden);
    });

  });

  describe("When the input value is set to 0", function() {

    beforeEach(function() {

      loadFixtures('toggle-on-value-fixture.html');
      toggleOnValue();

      $input = $('#toggle-element');

      $target1 = $('#item1');
      $target2 = $('#item2');
      $target3 = $('#item3');

      $input.val("0").change();
    });

    it("Item 1, 2 and 3 should be hidden", function() {
      expect($target1).toHaveClass(hidden);
      expect($target2).toHaveClass(hidden);
      expect($target3).toHaveClass(hidden);
    });
  });


});










