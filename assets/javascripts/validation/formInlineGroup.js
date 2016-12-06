require('jquery');
/**
 Extend generic form validation to handle grouped inline form elements
 (e.g. date of birth, dob: dob.day dob.month dob.year):
 - updates generic form validator:
   * adds groups setting for validator to dynamically declare;
   * overrides validation callbacks where grouped elements present:
      + change `errorPlacement` to ignore updating of error text when field is part of an inline group;
      + change `unhighlight` to removal of highlighting class when field is part of an inline group;
      + change `showErrors` to display inline field error messages inline with group error;
      + add `success` callback to empty the valid inline group field(s) error message text

 Inline group fields and inline error markup example:

 <form action="..." method="POST"
      class="form js-form js-form-inline-group"
      data-groups="date: date-day date-month date-year"
      autocomplete="off"
      novalidate="novalidate">
   <fieldset class="form-field-group touch" id="date">
      <legend class="form-label-bold">Date</legend>
      <div class="form-date form-field-group  full-width">
        <span class="form-hint">For example, 31 MAR 26</span>
        <ul class="error-notification error-notification--group list--inline group" data-group-error-list="date">
          <li class="error-notification--group-item list__item inline-block flush">
             @uk.gov.hmrc.play.views.html.helpers.errorInline(
               errorKey = "date",
               errorMessage = Messages("date.required"),
               classes = Seq("flush", "hard", "float--left"))
          </li>
          <li class="error-notification--group-item list__item inline-block flush">
             @uk.gov.hmrc.play.views.html.helpers.errorInline(
             errorKey = "date-day",
             errorMessage = Messages("date.day.required"),
             classes = Seq("error-summary--ignore", "flush", "hard", "float--left"))
          </li>
          <li class="error-notification--group-item list__item inline-block flush">
             @uk.gov.hmrc.play.views.html.helpers.errorInline(
               errorKey = "date-month",
               errorMessage = Messages("date.month.required"),
               classes = Seq("error-summary--ignore", "flush", "hard", "float--left"))
          </li>
          <li class="error-notification--group-item list__item inline-block flush">
             @uk.gov.hmrc.play.views.html.helpers.errorInline(
               errorKey = "date-year",
               errorMessage = Messages("date.year.required"),
               classes = Seq("error-summary--ignore", "flush", "hard", "float--left"))
          </li>
        </ul>
        <div class="no-touch native-date-picker" id="date-fields">
          <div class="form-group form-group-day">
            <label for="date-day" class="form-group form-group-day">Day</label>
            <input
              id="date-day"
              data-group="date"
              name="date.day"
              type="number"
              class="date input--xsmall input--no-spinner"
              required
              max="31"
              min="1"
              data-rule-range="1,31"
              data-rule-dategroupvalid="yyyy/mm/dd,yyyy/mm/dd"
              data-msg-range="..." data-msg-required="..." data-msg-dategroupvalid="...">
          </div>
          <div class="form-group form-group-month">
            <label for="date-month" class="form-group form-group-month">Month</label>
            <input
              id="date-month"
              data-group="date"
              name="date.month"
              type="number"
              class="date input--normal" type="text"
              data-month-abbrs="'JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC"
              required
              max="12"
              min="1"
              maxlength="3"
              data-rule-range="1,12"
              data-rule-dategroupvalid="yyyy/mm/dd,yyyy/mm/dd"
              data-msg-range="..." data-msg-required="..." data-msg-dategroupvalid="...">
          </div>
          <div class="form-date form-group-year">
            <label for="date-year" class="form-date form-group-year flush--bottom">Year</label>
            <input
              id="date-year"
              data-group="date"
              name="date.year"
              type="number"
              class="date input--xsmall form-group-year input--no-spinner"
              required
              maxlength="4"
              minlength="4"
              data-rule-pattern="^\d{4})$"
              data-rule-dategroupvalid="yyyy/mm/dd,yyyy/mm/dd"
              data-msg-pattern="..." data-msg-required="..." data-msg-dategroupvalid="...">
          </div>
        </div>
      </div>
    </fieldset>
 </form>
 */

var form = require('./form.js'),
  $groups,
  setupFormGroups = function($groupElem) {
    var $formElem = $groupElem.closest('.js-form'),
      validator = $formElem.data('validator'),
      groupOptions = {
        onfocusout: function(element, event) {
          if (!$(element).data('group')) {
            return false;
          }

          $.validator.defaults.onfocusout.call(validator, element);
        },

        errorPlacement: function($error, $element) {
          var $formFieldGroup = $element.closest('.form-field-group');

          // don't set error text if the element is in a group
          if (!$element.data('group')) {
            $formFieldGroup.find('.error-notification').text($error.text());
          }
        },

        unhighlight: function(element) {
          var $element = $(element);

          // don't remove error class if the element is in a group
          if (!$element.data('group')) {
            $element.closest('.form-field-group').removeClass('form-field-group--error');
          }
        },

        showErrors: function(messages, elements) {
          // process form errors generically
          form.handleErrors(validator, form.submitted);
          form.submitted = false;

          $.each(elements, function(i, val) {
            var $element = $(val.element),
              group = $element.data('group'),
              $group = $('.error-notification--group'),
              errMsg = $('<a/>').html(val.message).text();

            if ($element.has('[data-group]') && $group.text().indexOf(val.message) === -1) {
              // set the element error text
              $('#' + $element.attr('id') + '-error-message').text(errMsg);
            }
          });
        },

        success: function($label, element) {
          // if validated element is in a group, empty the valid element(s) error message text
          var $element = $(element),
            $errMessage = $('[data-input-name="' + $element.attr('id') + '"]'),
            groupName = $element.data('group');

          if (groupName && $errMessage.length && !$errMessage.is(':hidden')) {
            $errMessage.empty();

            if (!$('#' + groupName + ' .error-notification--group-item > .error-summary--ignore').text().trim().length) {
              $element.closest('.form-field-group').removeClass('form-field-group--error');
            }
          }
        },

        groups: (function() {
          // add groups defined in <form/> data-groups attribute (will be empty {} if not defined)
          var groups = {},
            definedGroups = $groupElem.data('groups');

          // when groups defined in form element data attribute  (comma separated list with format: dob: dob-day dob-month dob-year)
          if (definedGroups) {
            // for each comma separated value in list
            $.each(definedGroups.split(','), function(idx, val) {
              // group is key / value pair
              var group = val.trim().split(':'),
                groupName,
                fields;

              if (group.length) {
                groupName = group[0].trim();
                fields = group[1].trim();

                // add group to  groups config { key: "values" }
                groups[groupName] = fields;

                // add data group property to field element
                $.each(fields.split(' '), function(i, v) {
                  var $field = $('#' + v);
                  $field.data('group', groupName);
                  $field.attr('data-group', groupName);
                });
              }
            });
          }

          return groups;
        })()
      },

      // extend/merge validator options in generic validation (javascripts/validation/form.js)
      options = $.extend({}, validator.settings, $groupElem.data('groups') ? groupOptions : {});

    $formElem.removeData('validator');
    validator = $formElem.validate(options);
  },

  setupGroupValidation = function() {
    $groups.each(function(index, elem) {
      setupFormGroups($(elem));
    });
  },

  init = function() {
    $groups = $('.js-form-inline-group');
    if ($groups.length) {
      setupGroupValidation();
    }
  };

module.exports = {
  init: init
};
