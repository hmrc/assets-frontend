require('jquery');
require('validate');

var setSSOLinks = require('./modules/SSO_links.js'),
    contentNudge = require('./modules/contentNudge.js'),
    tableRowClick = require('./modules/tableRowClick.js'),
    reportAProblem = require('./modules/reportAProblem.js'),
    preventDoubleSubmit = require('./modules/preventDoubleSubmit.js'),
    toggleContextualFields = require('./modules/toggleContextualFields.js'),
    toggleDynamicFormFields = require('./modules/toggleDynamicFormFields.js'),
    simpleToggleDynamicFormFields = require('./modules/simpleToggleDynamicFormFields.js'),
    questionnaireSubmission = require('./modules/questionnaireSubmission.js'),
    registerBlockInputFields = require('./modules/registerBlockInputFields.js'),
    exitSurveyValidation = require('./modules/exitSurveyValidation.js'),
    saEmailPrefs = require('./modules/saEmailPrefs.js'),
    GOVUK = require('stageprompt');

(function() {

  $(function() {
    $(document).on('click', 'a', function(e) {
      // TODO: fix error thrown when clicking a [data-sso] links
      return setSSOLinks(e, window.ssoUrl);
    });

    var $clickableRow = $('.clickable-row'),
        //feedback forms require a hidden field denoting if javascript is enabled
        $feedbackForms = $('.form--feedback'),
        $searchFocus = $('.js-search-focus'),
        $errorReportForm = $('.report-error__content form');

    if($clickableRow.length) {
      tableRowClick($clickableRow);
    }
    preventDoubleSubmit();

    // initialise stageprompt for Analytics
    GOVUK.performance.stageprompt.setupForGoogleAnalytics();

    // toggle for reporting a problem (on all content pages)
    $('.report-error__toggle').on('click', function(e) {
      $('.report-error__content').toggleClass('js-hidden');
      e.preventDefault();
    });



    //we have javascript enabled so change hidden input to reflect this
    $feedbackForms.find('input[name="isJavascript"]').attr("value", true);

    //Initialise validation for the feedback form
    $errorReportForm.validate({
      errorClass: 'error-notification',
      errorPlacement: function(error, element) {
        error.insertBefore(element);
      },
      //Highlight invalid input
      highlight: function(element, errorClass) {
        $(element).parent().addClass('form-field--error');
        //TODO: temp fix for form submission bug. Report a problem needs a rewrite
        $errorReportForm.find('.button').prop('disabled', false);
      },
      //Unhighlight valid input
      unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('form-field--error');
      },
      //When all fields are valid perform AJAX call
      submitHandler: function(form) {
        reportAProblem().submitForm(form, $errorReportForm.attr("action"));
      }
    });


    $('.print-link a').attr('target', '_blank');

    if ($searchFocus.val() !== '') {
      $searchFocus.addClass('focus');
    }
    $searchFocus.on('focus', function(e) {
      $(e.target).addClass('focus');
    });
    $searchFocus.on('blur', function(e) {
      if ($searchFocus.val() === '') {
        $(e.target).removeClass('focus');
      }
    });
    if (window.location.hash && $(".design-principles").length !== 1 && $('.section-page').length !== 1) {
      contentNudge(window.location.hash);
    }
    $("nav").delegate('a', 'click', function() {
      var hash,
          href = $(this).attr('href');
      if (href.charAt(0) === '#') {
        hash = href;
      } else if (href.indexOf("#") > 0) {
        hash = "#" + href.split("#")[1];
      }
      if ($(hash).length === 1) {
        $("html, body").animate({
          scrollTop: $(hash).offset().top - $("#global-header").height()
        }, 10);
      }
    });

    // hover, active and focus states for buttons in IE<8
    if (!$.support.leadingWhitespace) {
      $('.button').not('a')
        .on('click focus', function() {
          $(this).addClass('button-active');
        })
        .on('blur', function() {
          $(this).removeClass('button-active');
        });
      $('.button')
        .on('mouseover', function() {
          $(this).addClass('button-hover');
        })
        .on('mouseout', function() {
          $(this).removeClass('button-hover');
        });
    }

    if ($("*[data-contextual-helper]").length) {
      // setup showing/hiding of contextual fields
      toggleContextualFields().setup();
    }

    toggleDynamicFormFields();
    //TODO: replace toggleDynamicFormField usage in all exemplars and rename this function
    simpleToggleDynamicFormFields();
    questionnaireSubmission();
    registerBlockInputFields();
    exitSurveyValidation();
    saEmailPrefs().setup();


    $('details').on('click', function(e){
      console.log($(e.target));//.find('div').is(':visible'));
      // if($(e).find('.panel-indent').showing()){
      //   $('.action-list').find('a').css({'visibility': 'hidden'});
      //   $('.action-list').find('a').css({'visibility': 'visible'});
      // }
    });
  });
})();
