require('jquery');

describe("Given I have a tabs module on the page", function() {

  var tabs;

  beforeEach(function() {

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('tabs-fixtures.html');

    tabs = require('../../javascripts/modules/tabs.js');

  });

  describe("When I load the page", function() {

    beforeEach(function() {  
      tabs(); // init tabs module
    });

    it("Then the 1st tab content is hidden", function() {        
      expect($('[data-tab-content="1"]')).toHaveClass('hidden');
    });

    it("Then the 2nd tab content is visible", function() {        
      expect($('[data-tab-content="2"]')).not.toHaveClass('hidden');
    });

    it("Then the 3rd tab content is hidden", function() {        
      expect($('[data-tab-content="3"]')).toHaveClass('hidden');
    });

  });

  describe("When I click the first tab link", function() {

    beforeEach(function() {  
      tabs(); // init tabs module
      $('[data-tab-link="1"]').click();
    });

    it("Then the 1st tab content is visible", function() {        
      expect($('[data-tab-content="1"]')).not.toHaveClass('hidden');
    });

    it("Then the 2nd tab content is hidden", function() {        
      expect($('[data-tab-content="2"]')).toHaveClass('hidden');
    });

    it("Then the 3rd tab content is hidden", function() {        
      expect($('[data-tab-content="3"]')).toHaveClass('hidden');
    });

  });

});
