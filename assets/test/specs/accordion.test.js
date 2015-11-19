require('jquery');

describe("Given I have an accordion module on the page", function() {

  var accordion;

  beforeEach(function() {

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('accordion-fixtures.html');

    accordion = require('../../javascripts/modules/accordion.js');

  });

  describe("When I load the page", function() {

    beforeEach(function() {

      // init accordion module
      accordion();

    });

    it("Then the accordion is collapsed", function() {          
      expect($('#accordion1 [data-accordion-body]').height()).toBe(0);
    });

    it("Then any content flagged to be revealed is hidden", function() {      
      expect($('#accordion1 [data-accordion-reveal]')).toHaveClass('hidden');
    });

  });

  describe("When I click on Accordion #1 title", function() {

    beforeEach(function() {

      // init accordion module
      accordion();

      $('#accordion1 [data-accordion-button]').click();

    });

    it("Then the accordion is expanded", function() {      
      expect($('#accordion1 [data-accordion-body]').height() > 0).toBe(true);
    });

    it("Then any content flagged to be revealed is shown", function() {      
      expect($('#accordion1 [data-accordion-reveal]')).not.toHaveClass('hidden');
    });

  });

  describe("When Accordion #2 loads", function() {

    beforeEach(function() {

      // init accordion module
      accordion();

    });

    it("Then the accordion is expanded by default", function() {      
      expect($('#accordion2 [data-accordion-body]').height() > 0).toBe(true);
    });

    it("Then any content flagged to be revealed is shown", function() {      
      expect($('#accordion2 [data-accordion-reveal]')).not.toHaveClass('hidden');
    });

    it("Then clicking the accordion title collapses the accordion", function() {      
      $('#accordion2 [data-accordion-button]').click();
      expect($('#accordion2 [data-accordion-body]').height()).toBe(0);
    });

  });

});
