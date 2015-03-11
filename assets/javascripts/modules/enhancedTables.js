require('jquery');
require('datatables');

module.exports = function(tableSelector) {
  tableSelector.parent().addClass('js-datatable-wrapper');

  var table = tableSelector.DataTable({
    dom: 'ftip',
    pageLength: 5,
    lengthChange: false,
    order: [
      [1, "asc"]
    ],
    "columnDefs": [{
      "targets": 0,
      "searchable": false,
      "orderable": false
    }],
    language: {
      info: "Showing _START_ - _END_ of _MAX_ clients",
      infoFiltered: "",
      searchPlaceholder: "Search by client name / reference",
      sSearch: ""
    },
    pagingType: "simple_numbers",
    drawCallback: function(settings) {
      var wrapper = this.parent(),
          rowsPerPage = 3,
          rowsToShow = this.api().page.info().recordsDisplay,
          minRowsPerPage = settings.aLengthMenu[0][0];

      if (rowsToShow <= rowsPerPage || rowsPerPage === -1) {
        $('.dataTables_paginate', wrapper).addClass('visuallyhidden');
      } else {
        $('.dataTables_paginate', wrapper).removeClass('visuallyhidden');
      }

      if (rowsToShow <= minRowsPerPage) {
        $('.dataTables_length', wrapper).addClass('visuallyhidden');
      } else {
        $('.dataTables_length', wrapper).removeClass('visuallyhidden');
      }
    }
  });

  tableSelector.parents('form').on('click', '.js-datatable-submit', function(event) {
    event.preventDefault();
    var selectedNodes = table.$(':not(:visible)').filter(':checked');
    selectedNodes.addClass('hidden').appendTo(tableSelector.parents('form'));
    console.log('selectedNodes ' , selectedNodes);
    $(this).parents('form').submit();
  });
};
