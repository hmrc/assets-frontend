require('jquery');
require('datatables')();

var sticky = require('./sticky-header.js');

module.exports = function(tableSelector) {
  var table,
      pageLength,
      tableSubmit,
      isAllChecked,
      updateCheckAll,
      addHiddenInput;

  tableSelector.parent().addClass('js-datatable-wrapper');

  table = tableSelector.DataTable({
    dom: 'ftip',
    pageLength: 50,
    lengthChange: false,
    order: [
      [1, 'asc']
    ],
    columnDefs: [{
      targets: 0,
      searchable: false,
      orderable: false
    }],
    language: {
      info: 'Showing _START_ - _END_ of _MAX_ clients',
      infoFiltered: '',
      searchPlaceholder: 'Search by client name / reference',
      sSearch: ''
    },
    pagingType: 'simple_numbers',

    drawCallback: function(settings) {
      var wrapper = this.parent(),
          rowsPerPage = settings._iDisplayLength,
          rowsToShow = this.api().page.info().recordsDisplay,
          minRowsPerPage = settings.aLengthMenu[0][0];

      if (rowsToShow <= rowsPerPage || rowsPerPage === -1) {
        $('.dataTables_paginate', wrapper).addClass('visuallyhidden');
        $('.dataTables_info', wrapper).addClass('no-float');
      } else {
        $('.dataTables_paginate', wrapper).removeClass('visuallyhidden');
        $('.dataTables_info', wrapper).removeClass('no-float');
      }

      if (rowsToShow <= minRowsPerPage) {
        $('.dataTables_length', wrapper).addClass('visuallyhidden');
      } else {
        $('.dataTables_length', wrapper).removeClass('visuallyhidden');
      }
    }
  });

  pageLength = table.settings()[0]._iDisplayLength;

  tableSelector.parents('form').on('click', '.js-datatable-submit, .js-datatable-delete', function(event) {
    tableSubmit(this, event);
  });

  isAllChecked = function() {

    var pageInputs     = '#verification-list tbody input[type=checkbox]',
        $inputs        = $(pageInputs),
        $checkedInputs = $(pageInputs + ':checked');

    return $checkedInputs.length === $inputs.length;
  };

  // update check-all checkbox
  updateCheckAll = function() {
    $('#checkbox-all').prop('checked', isAllChecked());
  };

  // clear the check-all box on when user paginates

  //on deselect run function that returns true or false for select-all
  tableSelector.on('page.dt', function(e, settings) {

    //check-all stays checked as long as all items on the page are selected
    tableSelector.one('draw.dt', updateCheckAll);

  });

  tableSelector.on('click', '.client-checkbox', updateCheckAll);

  // add hidden inputs to a form
  addHiddenInputs = function($form, $inputs) {

    $inputs.each(function() {

      $('<input>')
        .attr({'type': 'hidden', 'name': $(this).attr('name')})
        .val($(this).attr('value'))
        .appendTo($form);

    });

    return $form;

  };

  tableSubmit = function(el, event) {

    var $form          = $(el).parents('form'), 
        $allCheckboxes = table.$('input[type=checkbox]:checked');

    event.preventDefault();

    // add checkboxes to form as hidden inputs
    $form = addHiddenInputs($form, $allCheckboxes);

    $form.submit();

  };

  if ($('#js-select-all').length) {
    $('#js-select-all').html('<input id="checkbox-all" type="checkbox">')
      .on('click', '#checkbox-all', function() {
        var isChecked = $(this).is(':checked');
        $('td input[type=checkbox]').each(function(i) {
          $(this).prop('checked', isChecked);
        });
      });
  }

  updateCheckAll();

  // control items should be fixed in position if table is scrolled
  if (!!$('.controlpanel.stick').length) {
    sticky({
      el: '.controlpanel.stick',
      className: 'fixed'
    });
  }
};
