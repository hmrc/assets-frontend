require('jquery');

describe("Given I have an accordion module on the page", function() {

  var accordion;

  beforeEach(function() {

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('accordion-fixtures.html');

    accordion = require('../../javascripts/modules/accordion.js');

  });

  xdescribe("When I load the page", function() {

    beforeEach(function() {  
      accordion(); // init accordion module
    });

    xit("Then the accordion #1 is collapsed", function() {          
      expect($('#accordion1 [data-accordion-body]').height()).toBe(0);
    });

    xit("Then any content flagged to be revealed is hidden", function() {      
      expect($('#accordion1 [data-accordion-reveal]')).toHaveClass('hidden');
    });

  });

  xdescribe("When I click on Accordion #1 title", function() {

    beforeEach(function() {
      accordion(); // init accordion module
      $('#accordion1 [data-accordion-button]').click();
    });

    xit("Then the accordion is expanded", function() {      
      expect($('#accordion1 [data-accordion-body]').height() > 0).toBe(true);
    });

    xit("Then any content flagged to be revealed is shown", function() {      
      expect($('#accordion1 [data-accordion-reveal]')).not.toHaveClass('hidden');
    });

  });

  xdescribe("When Accordion #2 loads", function() {

    beforeEach(function() {  
      accordion(); // init accordion module
    });

    xit("Then the accordion is expanded by default", function() {      
      expect($('#accordion2 [data-accordion-body]').height() > 0).toBe(true);
    });

    xit("Then any content flagged to be revealed is shown", function() {      
      expect($('#accordion2 [data-accordion-reveal]')).not.toHaveClass('hidden');
    });

    xit("Then clicking the accordion title collapses the accordion", function() {      
      $('#accordion2 [data-accordion-button]').click();
      expect($('#accordion2 [data-accordion-body]').height()).toBe(0);
    });

  });

});
