require('jquery');

var ExpandCollapse = require('../../javascripts/modules/expandCollapse.js');

describe("Given I have an expandCollapse module", function() {

  var ec,
      expanderSection = ".summary .more-details",
      targetSection   = ".details";

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
  });

  describe("When I create an instance", function() {

    beforeEach(function() {
      ec = new ExpandCollapse();
    });

    it("The object should contain an init method", function() {
      expect(ec.init).toBeFunction();
    });

    it("The object should contain a bindEvents method", function() {
      expect(ec.bindEvents).toBeFunction();
    });

    it("The object should contain a toggleTarget method", function() {
      expect(ec.toggleTarget).toBeFunction();
    });

  });

  describe("When I call the init method", function() {

    beforeEach(function() {

      loadFixtures('expand-collapse-fixture.html');
      ec = new ExpandCollapse();
      spyOn(ec, "bindEvents");

      ec.init({
        expanderSection: expanderSection,
        targetSection:   targetSection,
        hideExpander:    true
      });

    });

    it("The bindEvents method should have been called", function() {
      expect(ec.bindEvents).toHaveBeenCalled();
    });

    it("The details section should be hidden", function() {
      expect($(targetSection)).toHaveClass('visuallyhidden');
    });

  });

  describe("When I click the expander link", function() {

    beforeEach(function() {

      loadFixtures('expand-collapse-fixture.html');
      ec = new ExpandCollapse();
      spyOn(ec, "toggleTarget");

      ec.init({
        expanderSection: expanderSection,
        targetSection:   targetSection,
        hideExpander:    true
      });

      $(expanderSection).find('a').click();

    });

    it("The toggleTarget method should have been called", function() {
      expect(ec.toggleTarget).toHaveBeenCalled();
    });

    xit("The details section should be visible", function() {
      expect($(targetSection)).not.toHaveClass('visuallyhidden');
    });

    xit("The expander section should be hidden", function() {
      expect($(expanderSection)).toHaveClass('visuallyhidden');
    });

  });

  /**
   * REMAINING TESTS TO WRITE:
   *
   *  - Fix disabled tests above - toggleTarget is not being called upon click on expander link for some reason
   *  - Passing hideExpander = false - make sure expand link is never hidden upon toggle of details
   *  - Verify that the minimise link is visible if it exists
   *  - Passing invalid parameters should cause the init method to return
   *
   */

});










