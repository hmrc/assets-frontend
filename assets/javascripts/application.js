require('jquery');
require('details');
require('validate');
require('basicpunc');
require('govuk-template');

var setSSOLinks = require('./modules/SSO_links.js'),
    contentNudge = require('./modules/contentNudge.js'),
    tableRowClick = require('./modules/tableRowClick.js'),
    feedbackForms = require('./modules/feedbackForms.js'),
    reportAProblem = require('./modules/reportAProblem.js'),
    ajaxFormSubmit = require('./modules/ajaxFormSubmit.js'),
    preventDoubleSubmit = require('./modules/preventDoubleSubmit.js'),
    toggleContextualFields = require('./modules/toggleContextualFields.js'),
    toggleDynamicFormFields = require('./modules/toggleDynamicFormFields.js'),
    conditionallyDisableButton = require('./modules/conditionallyDisableButton.js'),
    simpleToggleDynamicFormFields = require('./modules/simpleToggleDynamicFormFields.js'),
    questionnaireSubmission = require('./modules/questionnaireSubmission.js'),
    registerBlockInputFields = require('./modules/registerBlockInputFields.js'),
    customValidations = require('./validation/customValidations.js'),
    exitSurveyValidation = require('./validation/exitSurveyValidation.js'),
    citizenAuthValidation = require('./validation/citizenAuthValidation.js'),
    saEmailPrefs = require('./validation/saEmailPrefs.js'),
    GOVUK = require('stageprompt'),
    toggleDetails = require('./modules/toggleDetails.js'),
    fingerprint = require('./modules/fingerprint.js'),
    validatorFocus = require('./modules/validatorFocus.js'),
    enhancedTables = require('./modules/enhancedTables.js'),
    attorneyBanner = require('./modules/attorneyBanner.js');

//initialise mdtpf
fingerprint();

$(function() {
  var datatable,
      $searchFocus,
      $clickableRow;

  conditionallyDisableButton();

  $(document).on('click', 'a', function(e) {
    // TODO: fix error thrown when clicking a [data-sso] links
    return setSSOLinks(e, window.ssoUrl);
  });

  // feedback forms require a hidden field denoting if javascript is enabled
  $searchFocus      = $('.js-search-focus');
  $clickableRow     = $('.clickable-row');
  
  if ($clickableRow.length) {
    tableRowClick($clickableRow);
  }

  preventDoubleSubmit();

  // datatables init
  datatable = $('.js-datatable');

  if (datatable.length) {
    enhancedTables(datatable);
  }

  // initialise stageprompt for Analytics
  GOVUK.performance.stageprompt.setupForGoogleAnalytics();

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

  if (window.location.hash && $('.design-principles').length !== 1 && $('.section-page').length !== 1) {
    contentNudge(window.location.hash);
  }

  $('nav').delegate('a', 'click', function() {
    var hash,
      href = $(this).attr('href');

    if (href.charAt(0) === '#') {
      hash = href;
    } else if (href.indexOf('#') > 0) {
      hash = '#' + href.split('#')[1];
    }

    if ($(hash).length === 1) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('#global-header').height()
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

  if ($('*[data-contextual-helpers]').length) {
    // setup showing/hiding of contextual fields
    toggleContextualFields().setup();
  }

  toggleDynamicFormFields();

  var callbacks = {
    clientAccessResponse: {
      callbacks: {
        success: function (response, data, helpers, container, type) {
          helpers.insertResponseHtml(helpers, type, data, $(container), response);
        },

        error: function (response, data, helpers, container, type) {
          helpers.insertResponseHtml(helpers, type, data, $(container), response);
        },

        always: function (response, data, helpers, container, type) {
          helpers.resetForms(helpers, type, data, container);
        }
      }
    },
    helpers: {
      insertResponseHtml: function (helpers, type, data, $target, response) {
        var html = !!response.responseText ? response.responseText : response,
            htmlText = helpers.utilities.cleanHtml(html),
            isError = !!response.status || response.status === 500,
            isValidType = function () {
              return $.isFunction($.fn[type]);
            };

        if (!isError) {
          $target.addClass('js-hidden');
        } else if (!isValidType()) {
          type = 'prepend';
        }

        $target.parent().find('.alert--success, .alert--failure').remove();

        var heading = helpers.utilities.getElementInnerHtml(htmlText, 'h1');
        
        if (helpers.utilities.isFullPageError(heading)) {
          var $head = helpers.utilities.getElementInnerHtml(htmlText, 'head'),
            $body = helpers.utilities.getElementInnerHtml(htmlText, 'body');
          $('head').html($head);
          $('body').html($body);
        }
        else if (!isValidType()) {
          // just 'insert' html in target container element
          $target.html(htmlText);
        }
        else {
          $.fn[type].apply($target, [htmlText]);
        }

        if (data.indexOf('missingclient=true') > -1) {
          helpers.bindEvents($target, data);
        }
        else {
          $target.removeClass('js-hidden');
        }
      },
      
      resetForms: function (helpers, type, data, target) {
        var emailValue = helpers.getEmailValue(target, data);
        
        $(target + ', #client-list_wrapper .summary').find('input[type=submit], button[type=submit]').prop('disabled', false);

        $('input[name="email"]').each(function (index, element) {
            $(element).val(emailValue);
        });
      },
      
      getEmailValue: function(container, data) {
        var reEmail = /&?email=([^&]+)/gi, 
            emailMatch = data.match(reEmail), 
            emailValue = $(container).find('input[name="email"]').val();
        return emailValue || decodeURIComponent(emailMatch[0]).replace(reEmail, '$1') || ""; 
      },
    
      bindEvents: function ($container) {
        $('#another-missing-client').one("click keydown", function (event) {
          event.preventDefault();

          var $this = $(event.target);

          $this.parent().find('.alert--success, .alert--failure').remove();
          $this.remove();

          $('input[name="payeref"]').prop('value', null); // -webkit-autofill background-color mask: $('input[name="payeref"]').css({'-webkit-box-shadow':'0 0 0 500px white inset' });

          $container.removeClass('js-hidden');
        });
      },
      
      utilities: {
        getElementInnerHtml: function(html, nodeName) {
          var re = new RegExp("^(.+)<" + nodeName + "[^>]*>(.+?)<\/" + nodeName + ">(.+)$", "gi");
          return $($.parseHTML(html.replace(re, "$2")));
        },

        cleanHtml: function(htmlString) {
          return $.trim(htmlString).replace(/[\r\n\f\t]/g, '').replace(/>\s+</g, '><')
        },

        isFullPageError: function(heading) {
          return !!heading && heading.text() === 'Sorry, we’re experiencing technical difficulties';
        }
      }
    }
  };
  
  //TODO: replace toggleDynamicFormField usage in all exemplars and rename this function
  simpleToggleDynamicFormFields();
  questionnaireSubmission();
  registerBlockInputFields();
  customValidations();
  exitSurveyValidation().setup();
  citizenAuthValidation().setup();
  feedbackForms().setup();
  reportAProblem().setup();
  saEmailPrefs().setup();
  toggleDetails();
  validatorFocus();
  attorneyBanner();
  ajaxFormSubmit.init(callbacks);
});
