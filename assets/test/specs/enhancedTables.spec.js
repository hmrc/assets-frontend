require('jquery');

describe('Given I have an enhanced table on the page', function() {
  jasmine.getFixtures().fixturesPath = 'base/specs/fixtures/';
  loadFixtures('enhanced-tables.html');
  var tableSelector = '.js-datatable', 
      $table = $(tableSelector), 
      dataTable = require('../../javascripts/modules/enhancedTables.js')($table),
      objDataTable;

  beforeEach(function() {
    objDataTable = $table.DataTable();
    // reset search results
    objDataTable.columns().search("").draw();
  });
  
  it('should have both "dataTable" and "DataTable" function properties defined.', function() {
    expect(typeof objDataTable).toBe("object");
    expect($.isFunction($table.dataTable)).toBe(true);
    expect($.isFunction($table.DataTable)).toBe(true);
  });
  
  it("should have five (5) columns defined", function() {
    expect(objDataTable.columns()[0].length).toBe(5);  
  });

  it("should have four (4) columnDefs defined, as configured on table's data attributes.", function() {
    expect($table.data('columnDefs').length).toBe(4);
  });
  
  it("should be initiated with ascending sort on column 3, as configured on table's data attributes.", function() {
    var order = objDataTable.order();
    
    expect(order.length).toBe(2);
    //expect(order[0].join(",")).toBe($table.data('order').join(","));
    
    expect(order[0]).toBe(3);
    expect(order[1]).toBe("asc");

    // reset sort order (use dom, no api function)
    $table.find("thead > tr > th:eq(3)").click();
  });
  
  it("should return one (1) search result when searching for table row three (3) column one (1) cell text.", function() {
    var search = objDataTable.columns(0).search("Row 3 / Cell 1").draw(),
        searchResults = $table.find("tbody > tr");
        
        expect(searchResults.length).toBe(1);
  });
});

