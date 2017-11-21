/* eslint-env jquery */
/* global reportProblemAjaxUrl */

require('jquery')

module.exports = function () {
  var feedbackForms = require('./feedbackForms.js')

  var showErrorMessage = function () {
    var response = '<p>There was a problem sending your query.</p><p>Please try again later.</p>'
    reportErrorContainer().html(response)
    enableSubmitButton()
  }

  var reportErrorContainer = function () {
    return $('.report-error__content')
  }

  var submitButton = function () {
    return reportErrorContainer().find('.button')
  }

  // TODO: should refactor to use Javascript debounce
  var disableSubmitButton = function () {
    submitButton().prop('disabled', true)
  }

  var enableSubmitButton = function () {
    submitButton().prop('disabled', false)
  }

  var showConfirmation = function (data) {
    reportErrorContainer().html(data.message)
  }

  var submit = function (form, url) {
    $.ajax({
      type: 'POST',
      url: url,
      data: $(form).serialize(),
      beforeSend: function (xhr) {
        disableSubmitButton()
        xhr.setRequestHeader('Csrf-Token', 'nocheck')
      },

      success: function (data) {
        showConfirmation(data)
        setupFormValidation()
      },

      error: function (jqXHR, status) {
        if (status === 'error' || !jqXHR.responseText) {
          showErrorMessage()
        }
      }
    })
  }

  var load = function (url) {
    var $formContainer = $('#report-error-partial-form')

    $formContainer.load(reportProblemAjaxUrl, function (response, status, xhr) {
      setupFormValidation()
      feedbackForms().setup()
    })
  }

  var configureToggle = function () {
    var reportErrorToggle = $('.report-error__toggle')

    reportErrorToggle.on('click', function (e) {
      var $errorContent = $('.report-error__content')

      if ($errorContent.has('form').length === 0) {
        // show the spinner
        $errorContent.removeClass('hidden')
        $errorContent.removeClass('js-hidden')
        // the form or the form's submission result is not there, load the HTML asynchronously using Ajax
        // and replace the spinner with the form markup
        load(decodeURIComponent(reportProblemAjaxUrl))
      } else {
        $errorContent.toggleClass('js-hidden')
      }

      // Preventing navigation ONLY if element has "href" attribute
      if (reportErrorToggle.attr('href')) {
        e.preventDefault()
      }
    })
  }

  var setupFormValidation = function () {
    var $errorReportForm = $('.report-error__content form')

    if ($errorReportForm) {
      // Initialise validation for the feedback form
      $errorReportForm.validate({
        errorClass: 'error-notification',
        errorPlacement: function (error, element) {
          error.insertBefore(element)
        },

        // Highlight invalid input
        highlight: function (element, errorClass) {
          $(element).parent().addClass('form-field--error')

          // TODO: temp fix for form submission bug. Report a problem needs a rewrite
          $errorReportForm.find('.button').prop('disabled', false)
        },

        // Unhighlight valid input
        unhighlight: function (element, errorClass) {
          $(element).parent().removeClass('form-field--error')
        },

        // When all fields are valid perform AJAX call
        submitHandler: function (form) {
          submit(form, $('.report-error__content form').attr('action'))
        }
      })
    }
  }

  var setup = function () {
    configureToggle()
    setupFormValidation()
  }

  return {
    setup: setup
  }
}
