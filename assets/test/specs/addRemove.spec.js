/**
 * Add/Remove Module Tests
 */

require('jquery');

describe("Given I have a list of inputs to add/remove", function() {

  jasmine.getFixtures().fixturesPath = "base/specs/fixtures/";
  var addRemove = require('../../javascripts/modules/addRemove.js');
  var $container1,
      $container2;

  describe("When I load the page", function() {

    beforeEach(function() {
      loadFixtures('addRemove-fixture.html');
      addRemove();
      $container1 = $('#addRemove1');
      $container2 = $('#addRemove2');
    });

    it("Then Delete buttons are added to each item in first container", function() {
      expect($container1.find('li a[data-remove-btn]').length).toBe(3);
    });

    it("Then Delete buttons are added to each item in second container", function() {
      expect($container2.find('li a[data-remove-btn]').length).toBe(0);
    });

    it("Then Add buttons are inserted in both containers", function() {
      expect($container1.find('a[data-add-btn]').length).toBe(1);
      expect($container2.find('a[data-add-btn]').length).toBe(1);
    });

    it("Then Add button has the specified text in both containers", function() {
      expect($container1.find('a[data-add-btn]').text()).toBe('Add another redirect URI');
      expect($container2.find('a[data-add-btn]').text()).toBe('Add Item');
    });

  });

  describe("When I click the Add button within the first container", function() {

    beforeEach(function() {
      loadFixtures('addRemove-fixture.html');
      addRemove();
      $container1 = $('#addRemove1');
      $container1.find('a[data-add-btn]').trigger('click');
    });

    it("Then an additional input is added to the list", function() {
      expect($container1.find('li:nth-child(4)')).toBeVisible();
    });

    it("Then the additional input has the correct name and id attributes", function() {
      expect($container1.find('li:nth-child(4) [data-add-remove-unique]').attr('name')).toBe('redirectUris[3]');
    });

    it("Then a corresponding Delete button is added beside the input", function() {
      expect($container1.find('li:nth-child(4) a[data-remove-btn]')).toBeVisible();
    });

  });

  describe("When I add two items in the first container", function() {

    beforeEach(function() {
      loadFixtures('addRemove-fixture.html');
      addRemove();
      $container1 = $('#addRemove1');
      $container1.find('a[data-add-btn]').trigger('click').trigger('click');
    });

    it("Then the Add button no longer exists", function() {
      expect($container1.find('[data-add-btn]').length).toBe(0);
    });

  });

  describe("When I remove an item from a full list", function() {

    beforeEach(function() {
      loadFixtures('addRemove-fixture.html');
      addRemove();
      $container1 = $('#addRemove1');
      $container1.find('a[data-add-btn]').trigger('click').trigger('click');
      $container1.find('li:last-child a[data-remove-btn]').trigger('click');
    });

    it("Then the Add button exists", function() {
      expect($container1.find('[data-add-btn]')).toBeVisible();
    });

  });

  describe("When I click the Add button within the second container", function() {

    beforeEach(function() {
      loadFixtures('addRemove-fixture.html');
      addRemove();
      $container2 = $('#addRemove2');
      $container2.find('a[data-add-btn]').trigger('click');
    });

    it("An additional item is added to the list", function() {
      expect($container2.find('li:nth-child(2)')).toBeVisible();
    });

    it("No delete button is added", function() {
      expect($container2.find('li:last-child a[data-remove-btn]').length).toBe(0);
    });

  });

});
