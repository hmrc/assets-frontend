/* eslint-env jasmine, jquery */
/* global loadFixtures */

require('jquery')

describe('Given I have an enhanced table on the page', function () {
  jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/'
  loadFixtures('enhanced-tables-fixture.html')

  var enhancedTables = require('../../javascripts/modules/enhancedTables.js')
  var $table = $('.js-datatable')
  var objDataTable

  beforeEach(function () {
    enhancedTables($table)
    objDataTable = $table.DataTable()
    // reset search results
    objDataTable.columns().search('').draw()
  })

  it('should have both "dataTable" and "DataTable" function properties defined.', function () {
    expect(typeof objDataTable).toBe('object')
    expect($.isFunction($table.dataTable)).toBe(true)
    expect($.isFunction($table.DataTable)).toBe(true)
  })

  it('should have five (5) columns defined', function () {
    expect(objDataTable.columns()[0].length).toBe(5)
  })

  it('should have four (4) columnDefs defined, as configured on table\'s data attributes.', function () {
    expect($table.data('columnDefs').length).toBe(4)
  })

  it('should be initiated with ascending sort on column 3, as configured on table\'s data attributes.', function () {
    expect(objDataTable.order().length).toBe(2)

    expect(objDataTable.order()[0]).toBe(3)
    expect(objDataTable.order()[1]).toBe('asc')

    // sort col 3 in descending order (use dom, no api function)
    $table.find('thead > tr > th:eq(3)').click()

    expect(objDataTable.order()[0][0]).toBe(3)
    expect(objDataTable.order()[0][1]).toBe('desc')

    // sort col 3 in ascending order (use dom, no api function)
    $table.find('thead > tr > th:eq(2)').click()

    expect(objDataTable.order()[0][0]).toBe(2)
    expect(objDataTable.order()[0][1]).toBe('asc')

    // sort col 2 in descending order (use dom, no api function)
    $table.find('thead > tr > th:eq(2)').click()

    expect(objDataTable.order()[0][0]).toBe(2)
    expect(objDataTable.order()[0][1]).toBe('desc')
  })

  it('should return one (1) search result when searching for table row three (3) column one (1) cell text.', function () {
    objDataTable.columns(0).search('Row 3 / Cell 1').draw()
    expect($table.find('tbody > tr').length).toBe(1)
  })
})
