require('jquery');

describe("Given I have a tabs module on the page", function() {

  jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
  var tabs = require('../../javascripts/modules/tabs.js');

  describe("When I load the page", function() {

    beforeEach(function() {
      loadFixtures('tabs-fixtures.html');
      tabs(); // init tabs module
    });

    it("Then only the first tab content is visible", function() {
      expect($('[data-tab-content="1"]')).not.toHaveClass('hidden');
      expect($('[data-tab-content="2"]')).toHaveClass('hidden');
      expect($('[data-tab-content="3"]')).toHaveClass('hidden');
    });

  });

  describe("When I click the first tab link", function() {

    beforeEach(function() {
      loadFixtures('tabs-fixtures.html');
      tabs(); // init tabs module
      $('[data-tab-link="2"]').click();
    });

    it("Then only the 1st tab content is visible", function() {
      expect($('[data-tab-content="1"]')).toHaveClass('hidden');
      expect($('[data-tab-content="2"]')).not.toHaveClass('hidden');
      expect($('[data-tab-content="3"]')).toHaveClass('hidden');
    });

  });

  describe("With auto open tabs enabled", function() {

    describe("When I open the page", function() {

      describe("With no URL hash", function() {

        beforeEach(function() {
          loadFixtures('tabs-fixtures-auto-open.html');
          tabs();
        });

        it("should have the first tab selected", function() {
          expect($('.tabs-nav__tab--active').text()).toEqual("Tab One");
        });

        it("should have the first tab's content shown", function() {
          expect($('[data-tab-content="one"]')).not.toHaveClass('hidden');
          expect($('[data-tab-content="two"]')).toHaveClass('hidden');
          expect($('[data-tab-content="three"]')).toHaveClass('hidden');
        });
      });

      describe("With URL hash", function() {

        beforeEach(function() {
          loadFixtures('tabs-fixtures-auto-open.html');
          window.history.replaceState(null, null, '#three');
          tabs();
        });

        it("should have the tab matching the hash selected", function() {
          expect($('.tabs-nav__tab--active').text()).toEqual("Tab Three");
        });

        it("should have the matching tab's content shown", function() {
          expect($('[data-tab-content="one"]')).toHaveClass('hidden');
          expect($('[data-tab-content="two"]')).toHaveClass('hidden');
          expect($('[data-tab-content="three"]')).not.toHaveClass('hidden');

        });
      });

    });
  });

});
