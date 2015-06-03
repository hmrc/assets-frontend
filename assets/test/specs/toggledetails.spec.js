require('jquery');

describe("Given I have a toggle details module and two targets on the page", function() {

  var hidden = 'js-hidden';

  var toggleDetails,
      $link1,
      $link2,
      $target1,
      $target2;

  beforeEach(function() {

    jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
    loadFixtures('toggle-details-fixture.html');

    toggleDetails = require('../../javascripts/modules/toggleDetails.js');

  });

  describe("When I load the page", function() {

    beforeEach(function() {

      loadFixtures('toggle-details-fixture.html');
      toggleDetails();

      $link1 = $('p[data-toggle-details]');
      $link2 = $('a[data-toggle-details]');

      $target1 = $('.target-container1');
      $target2 = $('.target-container2');

    });

    it("Both link containers should be visible", function() {
      expect($link1).not.toHaveClass(hidden);
      expect($link2).not.toHaveClass(hidden);
    });

    it("Both target containers should be hidden", function() {
      expect($target1).toHaveClass(hidden);
      expect($target2).toHaveClass(hidden);
    });

    it("Both minimise links should be not be hidden", function() {
      expect($target1.find('.minimise')).not.toBeHidden();
      expect($target2.find('.minimise')).not.toBeHidden();
    });

  });

  describe("When I click the first toggle link", function() {

    beforeEach(function() {

      loadFixtures('toggle-details-fixture.html');
      toggleDetails();

      $link1 = $('p[data-toggle-details]');
      $link2 = $('a[data-toggle-details]');

      $target1 = $('.target-container1');
      $target2 = $('.target-container2');

      $link1.find('a').click();

    });

    it("The first link should be hidden", function() {
      expect($link1).toHaveClass(hidden);
    });

    it("The first target should be visible", function() {
      expect($target1).not.toHaveClass(hidden);
    });

    it("The second link should be visible", function() {
      expect($link2).not.toHaveClass(hidden);
    });

    it("The second target should be hidden", function() {
      expect($target2).toHaveClass(hidden);
    });

  });

  describe("When I click the second toggle link", function() {

    beforeEach(function() {

      loadFixtures('toggle-details-fixture.html');
      toggleDetails();

      $link1 = $('p[data-toggle-details]');
      $link2 = $('a[data-toggle-details]');

      $target1 = $('.target-container1');
      $target2 = $('.target-container2');

      $link2.click();

    });

    it("The first link should be visible", function() {
      expect($link1).not.toHaveClass(hidden);
    });

    it("The first target should be hidden", function() {
      expect($target1).toHaveClass(hidden);
    });

    it("The second link should be hidden", function() {
      expect($link2).toHaveClass(hidden);
    });

    it("The second target should be visible", function() {
      expect($target2).not.toHaveClass(hidden);
    });

  });

  describe("When I click the first minimise link", function() {

    beforeEach(function() {

      loadFixtures('toggle-details-fixture.html');
      toggleDetails();

      $link1 = $('p[data-toggle-details]');
      $link2 = $('a[data-toggle-details]');

      $target1 = $('.target-container1');
      $target2 = $('.target-container2');

      $link1.find('a').click();

      $target1.find('.minimise').click();

    });

    it("The first link should be visible", function() {
      expect($link1).not.toHaveClass(hidden);
    });

    it("The first target should be hidden", function() {
      expect($target1).toHaveClass(hidden);
    });

    it("The second link should be visible", function() {
      expect($link2).not.toHaveClass(hidden);
    });

    it("The second target should be hidden", function() {
      expect($target2).toHaveClass(hidden);
    });

  });

  describe("When I click the second minimise link", function() {

    beforeEach(function() {

      loadFixtures('toggle-details-fixture.html');
      toggleDetails();

      $link1 = $('p[data-toggle-details]');
      $link2 = $('a[data-toggle-details]');

      $target1 = $('.target-container1');
      $target2 = $('.target-container2');

      $link2.click();

      $target2.find('.minimise').click();

    });

    it("The first link should be visible", function() {
      expect($link1).not.toHaveClass(hidden);
    });

    it("The first target should be hidden", function() {
      expect($target1).toHaveClass(hidden);
    });

    it("The second link should be visible", function() {
      expect($link2).not.toHaveClass(hidden);
    });

    it("The second target should be hidden", function() {
      expect($target2).toHaveClass(hidden);
    });

  });


});










