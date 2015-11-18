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
      expect($('.accordion [data-accordion-body]').height()).toBe(0);
    });

    it("Then any content flagged to be revealed is hidden", function() {      
      expect($('.accordion [data-accordion-reveal]')).toHaveClass('hidden');
    });

  });

  describe("When I click on the accordion title", function() {

    beforeEach(function() {

      // init accordion module
      accordion();

      $('.accordion [data-accordion-button]').click();

    });

    xit("Then the accordion is expanded", function() {   
      //console.log("height = " + $('.accordion [data-accordion-body]').height());   
      expect($('.accordion [data-accordion-body]').height() > 0).toBe(true);
    });

    xit("Then any content flagged to be revealed is shown", function() {      
      expect($('.accordion [data-accordion-reveal]')).not.toHaveClass('hidden');
    });

  });

});
