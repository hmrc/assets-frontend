/* eslint-env jasmine, jquery */
/* global loadFixtures */

/**
 * Add/Remove Module Tests
 */

require('jquery')

var $container1
var $container2
var $container3
var $container4
var addRemove

var setup = function () {
  $container1 = $('#addRemove1')
  $container2 = $('#addRemove2')
  $container3 = $('#addRemove3')
  $container4 = $('#addRemove4')
  addRemove()
}

describe('Given I have a list of inputs to add/remove', function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/'
    loadFixtures('addRemove-fixture.html')
    addRemove = require('../../javascripts/modules/addRemove.js')
  })

  describe('When I load the page', function () {
    beforeEach(setup)

    it('When delete attribute specified delete buttons should be added to all items except the first', function () {
      expect($container1.find('li a[data-remove-btn]').length).toBe(2)
    })

    it('No Delete Buttons should be added', function () {
      expect($container2.find('li a[data-remove-btn]').length).toBe(0)
    })

    it('Add buttons should be inserted', function () {
      expect($container1.find('a[data-add-btn]').length).toBe(1)
      expect($container2.find('a[data-add-btn]').length).toBe(1)
    })

    it('Add button should have the custom specified text', function () {
      expect($container2.find('a[data-add-btn]').text()).toBe('Add Item')
    })

    it('Add button should have the default text', function () {
      expect($container1.find('a[data-add-btn]').text()).toBe('Add')
    })

    it('Delete button should have the custom specified text', function () {
      expect($container1.find('a[data-remove-btn]').first().text()).toBe('Press')
    })

    it('Delete button should have the default text', function () {
      expect($container3.find('a[data-remove-btn]').text()).toBe('Delete')
    })

    it('Delete buttons should not be present on container 2', function () {
      expect($container2.find('a[data-remove-btn]').length).toBe(0)
    })

    it('Delete buttons should be present on container 3', function () {
      expect($container3.find('a[data-remove-btn]').length).toBe(1)
    })

    it('Delete buttons should not be present on container 4', function () {
      expect($container4.find('a[data-remove-btn]').length).toBe(0)
    })
  })

  describe('When I click the Add button', function () {
    beforeEach(function () {
      setup()
      $container1.find('a[data-add-btn]').trigger('click')
    })

    it('An additional input should be added to the list', function () {
      expect($container1.find('[data-add-remove-item]').length).toBe(4)
    })

    it('Additional input should have the expected name attribute', function () {
      var $lastInput = $container1.find('[data-add-remove-input]').last()

      expect($lastInput).toExist()
      expect($lastInput.attr('name')).toBe('exampleOne[]')
    })

    it('Delete button should be added with the input', function () {
      var $lastInput = $container1.find('[data-add-remove-item]').last()
      var $lastInputDeleteBtn = $lastInput.find('[data-remove-btn]')

      expect($lastInput).toExist()
      expect($lastInputDeleteBtn).toExist()
    })
  })

  describe('When I add max number of items', function () {
    beforeEach(setup)

    it('Then the Add button should be hidden', function () {
      $container1.find('a[data-add-btn]').trigger('click').trigger('click')

      expect($container1.find('[data-add-btn]')).not.toBeVisible()
    })
  })

  describe('When I remove an item from a full list', function () {
    beforeEach(setup)

    it('The Add button should exist', function () {
      var $addBtn = $container1.find('[data-add-btn]')

      $addBtn.trigger('click').trigger('click')

      expect($addBtn).not.toBeVisible()

      $container1.find('li:last-child a[data-remove-btn]').trigger('click')

      expect($addBtn).toBeVisible()
    })
  })

  describe('When I click the Add button when delete attribute is not specified', function () {
    beforeEach(function () {
      setup()
      $container2.find('a[data-add-btn]').trigger('click')
    })

    it('An additional item should be added to the list', function () {
      expect($container2.find('[data-add-remove-item]').length).toBe(3)
    })

    it('A delete button should NOT be added', function () {
      expect($container2.find('[data-remove-btn]').length).toBe(0)
    })
  })

  describe('When I add to list of container #4', function () {
    beforeEach(function () {
      setup()
      $container4.find('a[data-add-btn]').trigger('click')
    })

    it('The addtional item is of the correct template', function () {
      expect($container4.find('[data-add-remove-item]:nth-child(3) p')).toExist()
    })
  })
})
