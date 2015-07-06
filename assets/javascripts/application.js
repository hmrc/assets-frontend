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

  if ($('*[data-contextual-helper]').length) {
    // setup showing/hiding of contextual fields
    toggleContextualFields().setup();
  }

  toggleDynamicFormFields();

  window.GOVUK.callbacks = window.GOVUK.callbacks || {
      ajaxFormSubmit: {
        clientList: {
          insertFormResponse: {
            success: function (response, data, container, type) {
              window.GOVUK.callbacks.ajaxFormSubmit.clientList.helpers.insertResponseHtml(type, data, $(container), response);
            },

            error: function (response, data, container, type) {
              window.GOVUK.callbacks.ajaxFormSubmit.clientList.helpers.insertResponseHtml(type, data, $(container), response);
            },

            always: function (response, data, container, type) {
              window.GOVUK.callbacks.ajaxFormSubmit.clientList.helpers.resetForms(type, data, container);
            }
          },
          helpers: {
            insertResponseHtml: function(type, data, $target, response) {
              var html = !!response.responseText ? response.responseText : response,
                isError = !!response.status || response.status === 500,
                isNotValidationError = isError && /<h1[^>]*>\s*Sorry, we’re experiencing technical difficulties\s*<\/h1>/i.test(html),
                isValidType = function() {
                  return $.isFunction($.fn[type]);
                };

              if (!isError) {
                $target.addClass('js-hidden');
              } else if (!isValidType()) {
                type = 'prepend';
              }

              $target.parent().find('.alert--success, .alert--failure').remove();

              if (isNotValidationError) {
                var htmlText = html;
                $('head').html(htmlText.substring(htmlText.indexOf('<head>') + 6, htmlText.indexOf('</head>')));
                $('body').html(htmlText.substring(htmlText.indexOf('<body>') + 6, htmlText.indexOf('</body>')));
              }
              else if (!isValidType()) {
                // just 'insert' html in target container element
                $target.html(html);
              }
              else {
                $.fn[type].apply($target, [html]);
              }

              if (data.indexOf('missingclient=true') > -1) {
                window.GOVUK.callbacks.ajaxFormSubmit.clientList.helpers.bindEvents($target, data);
              }
              else {
                $target.removeClass('js-hidden');
              }
            },
            
            resetForms: function(type, data, target) {
              var re = new RegExp('&?email=([^&]+)', 'gi'),
                emails = data.match(re);

              $(target +', #client-list_wrapper .summary').find('input[type=submit], button[type=submit]').prop('disabled', false);

              if (!!emails && !!emails.length) {
                $('input[name="email"]').each(function (index, element) {
                  $(element).attr('value', decodeURIComponent(emails[0]).replace(re, '$1'));
                });
              }
            },
            
            bindEvents: function($container, data) {
              $('#another-missing-client').one("click keydown", function (event) {
                event.preventDefault();

                var $this = $(event.target);

                $this.parent().find('.alert--success, .alert--failure').remove();
                $this.remove();

                $('input[name="payeref"]').prop('value', null); // -webkit-autofill background-color mask: $('input[name="payeref"]').css({'-webkit-box-shadow':'0 0 0 500px white inset' });

                $container.removeClass('js-hidden');
              });
            }
          }
        }
      }
    };


  //TODO: replace toggleDynamicFormField usage in all exemplars and rename this function
  ajaxFormSubmit.init();
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

});
