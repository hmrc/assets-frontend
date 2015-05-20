/**
 * Submit a form via AJAX
 *
 * Hijack's a forms submit event and POSTs its data via AJAX to avoid page reloads.
 *
 * Usage:
 *
 *  Place the attribute 'data-ajax-submit="true"' on either a form tag or a button
 *  that has a formaction attribute.
 *
 *  <form action="#" data-ajax-submit="true">
 *      <input type="submit" value="Submit"/>
 *  </form>
 *
 *  or
 *
 *  <button formaction="#" data-ajax-submit="true">Submit</button>
 *
 **/

require('jquery');

var ajaxFormSubmit = {

  init: function() {
    var path,
        _this = this,
        $ajaxForm = $('[data-ajax-submit]');

    if (!$ajaxForm.length) {
      return false;
    }

    $ajaxForm.parents('form').on('submit', function(event) {
      event.preventDefault();

      if ($ajaxForm[0].nodeName.toLowerCase() === 'button') {
        path = $ajaxForm.attr('formaction');
      }
      else {
        path = $ajaxForm.attr('action');
      }

      _this.doSubmit(path, $(this).serialize() + '&isAjax');
    });
  },

  doSubmit: function(path, data) {
    $.ajax({
      url: path,
      type: 'POST',
      data: data
    })
    .done(function(result) {
      console.log('success', result);
    })
    .fail(function(result) {
      console.log('error', result);
    })
    .always(function(result) {
      console.log('complete', result);
    });
  }

};

module.exports = ajaxFormSubmit;
