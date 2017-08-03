/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

var registerBlockInputFields

var $radioInputs
var $yesRadio
var $yesRadioLabel
var $ofCourseRadio
var $ofCourseRadioLabel
var $noRadio
var $noRadioLabel

var $checkboxInputs
var $ofCourseCheckbox
var $ofCourseCheckboxLabel
var $maybeCheckbox
var $maybeCheckboxLabel

var setup = function () {
  registerBlockInputFields()

  $radioInputs = $('#radio-inputs')
  $yesRadio = $radioInputs.find('#yes-radio')
  $yesRadioLabel = $radioInputs.find("label[for='yes-radio']")
  $ofCourseRadio = $radioInputs.find('#of-course-radio')
  $ofCourseRadioLabel = $radioInputs.find("label[for='of-course-radio']")
  $noRadio = $radioInputs.find('#no-radio')
  $noRadioLabel = $radioInputs.find("label[for='no-radio']")

  $checkboxInputs = $('#checkbox-inputs')
  $ofCourseCheckbox = $checkboxInputs.find('#of-course-checkbox')
  $ofCourseCheckboxLabel = $checkboxInputs.find("label[for='of-course-checkbox']")
  $maybeCheckbox = $checkboxInputs.find('#maybe-checkbox')
  $maybeCheckboxLabel = $checkboxInputs.find("label[for='maybe-checkbox']")
}

describe('Register Block Input Fields', function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/test/specs/fixtures/'
    loadFixtures('register-block-input-fields-fixture.html')
    registerBlockInputFields = require('../../javascripts/modules/registerBlockInputFields.js')
  })

  describe('on page load', function () {
    beforeEach(setup)

    it('radio and checkbox elements should be setup correctly', function () {
      expect($yesRadio).toHaveAttr('checked', 'checked')
      expect($yesRadioLabel).toHaveClass('selected')

      expect($ofCourseCheckbox).toHaveAttr('checked', 'checked')
      expect($ofCourseCheckboxLabel).toHaveClass('selected')

      expect($ofCourseRadio).not.toHaveAttr('checked')
      expect($ofCourseRadioLabel).not.toHaveClass('selected')

      expect($maybeCheckbox).not.toHaveAttr('checked')
      expect($maybeCheckboxLabel).not.toHaveClass('selected')
    })
  })

  describe('on interaction', function () {
    beforeEach(setup)

    it('input should have correct class when focused', function () {
      $noRadio.click()

      expect($noRadio).toBeChecked()
      expect($noRadioLabel).toHaveClass('selected')
      expect($noRadioLabel).toHaveClass('add-focus')

      expect($ofCourseRadio).not.toBeChecked()
      expect($ofCourseRadioLabel).not.toHaveClass('selected')
      expect($ofCourseRadioLabel).not.toHaveClass('add-focus')

      expect($maybeCheckbox).not.toBeChecked()
      expect($maybeCheckboxLabel).not.toHaveClass('selected')
      expect($maybeCheckboxLabel).not.toHaveClass('add-focus')
    })

    it('input should have correct class when blured', function () {
      $noRadio.click()

      expect($noRadio).toBeChecked()
      expect($noRadioLabel).toHaveClass('selected')
      expect($noRadioLabel).toHaveClass('add-focus')

      expect($ofCourseRadio).not.toBeChecked()
      expect($ofCourseRadioLabel).not.toHaveClass('selected')
      expect($ofCourseRadioLabel).not.toHaveClass('add-focus')

      expect($maybeCheckbox).not.toBeChecked()
      expect($maybeCheckboxLabel).not.toHaveClass('selected')
      expect($maybeCheckboxLabel).not.toHaveClass('add-focus')

      $noRadio.blur()

      expect($noRadio).toBeChecked()
      expect($noRadioLabel).toHaveClass('selected')
      expect($noRadioLabel).not.toHaveClass('add-focus')
    })

    it('input should have correct class when changed', function () {
      $noRadio.click()

      expect($noRadio).toBeChecked()
      expect($noRadioLabel).toHaveClass('selected')
      expect($noRadioLabel).toHaveClass('add-focus')

      expect($ofCourseRadio).not.toBeChecked()
      expect($ofCourseRadioLabel).not.toHaveClass('selected')
      expect($ofCourseRadioLabel).not.toHaveClass('add-focus')

      expect($maybeCheckbox).not.toBeChecked()
      expect($maybeCheckboxLabel).not.toHaveClass('selected')
      expect($maybeCheckboxLabel).not.toHaveClass('add-focus')

      $ofCourseRadio.click()

      expect($ofCourseRadio).toBeChecked()
      expect($ofCourseRadioLabel).toHaveClass('selected')
      expect($ofCourseRadioLabel).toHaveClass('add-focus')

      expect($noRadio).not.toBeChecked()
      expect($noRadioLabel).not.toHaveClass('selected')
      expect($noRadioLabel).not.toHaveClass('add-focus')

      expect($maybeCheckbox).not.toBeChecked()
      expect($maybeCheckboxLabel).not.toHaveClass('selected')
      expect($maybeCheckboxLabel).not.toHaveClass('add-focus')
    })
  })
})
