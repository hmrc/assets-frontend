/* eslint-env jquery */

require('jquery')
require('details')
require('validate')
require('basicpunc')
require('govuk-template')
require('stageprompt')

window._gaq = window._gaq || []

var sso = require('./modules/sso.js')
var visibility = require('./modules/visibility.js')
var mask = require('./modules/mask.js')
var form = require('./validation/form.js')
var toggle = require('./modules/toggle.js')
var autoCompleteFactory = require('./modules/autoCompleteFactory.js')
var passwordReveal = require('./modules/passwordReveal.js')
var formHintHelper = require('./modules/formHintHelper.js')
var control = require('./modules/control.js')
var masker = require('./modules/masker.js')
var contentNudge = require('./modules/contentNudge.js')
var tableRowClick = require('./modules/tableRowClick.js')
var feedbackForms = require('./modules/feedbackForms.js')
var reportAProblem = require('./modules/reportAProblem.js')
var ajaxFormSubmit = require('./modules/ajaxFormSubmit.js')
var ajaxCallbacks = require('./modules/ajaxCallbacks.js')
var preventDoubleSubmit = require('./modules/preventDoubleSubmit.js')
var toggleContextualFields = require('./modules/toggleContextualFields.js')
var toggleDynamicFormFields = require('./modules/toggleDynamicFormFields.js')
var conditionallyDisableButton = require('./modules/conditionallyDisableButton.js')
var simpleToggleDynamicFormFields = require('./modules/simpleToggleDynamicFormFields.js')
var questionnaireSubmission = require('./modules/questionnaireSubmission.js')
var registerBlockInputFields = require('./modules/registerBlockInputFields.js')
var customValidations = require('./validation/customValidations.js')
var exitSurveyValidation = require('./validation/exitSurveyValidation.js')
var citizenAuthValidation = require('./validation/citizenAuthValidation.js')
var saEmailPrefs = require('./validation/saEmailPrefs.js')
var toggleDetails = require('./modules/toggleDetails.js')
var fingerprint = require('./modules/fingerprint.js')
var validatorFocus = require('./modules/validatorFocus.js')
var enhancedTables = require('./modules/enhancedTables.js')
var attorneyBanner = require('./modules/attorneyBanner.js')
var youtubePlayer = require('./modules/youtubePlayer.js')
var accordion = require('./modules/accordion.js')
var tabs = require('./modules/tabs.js')
var charCounter = require('../components/character-counter/character-counter.js')
var accountMenu = require('../components/account-menu/account-menu.js')
var addRemove = require('./modules/addRemove.js')
var modalDialog = require('./modules/modalDialog.js')
var dynamicGaTags = require('./modules/dynamicGaTags.js')
var listCollapse = require('./modules/listCollapse.js')
var noticeBanner = require('./modules/noticeBanner.js')

// initialise mdtpf
fingerprint()

$(function () {
  var datatable
  var $searchFocus
  var $clickableRow

  conditionallyDisableButton()

  // feedback forms require a hidden field denoting if javascript is enabled
  $searchFocus = $('.js-search-focus')
  $clickableRow = $('.clickable-row')

  if ($clickableRow.length) {
    tableRowClick($clickableRow)
  }

  preventDoubleSubmit()

  // datatables init
  datatable = $('.js-datatable')

  if (datatable.length) {
    enhancedTables(datatable)
  }

  // initialise stageprompt for Analytics
  window.GOVUK.performance.stageprompt.setupForGoogleAnalytics()

  $('.print-link a').attr('target', '_blank')

  if ($searchFocus.val() !== '') {
    $searchFocus.addClass('focus')
  }

  $searchFocus.on('focus', function (e) {
    $(e.target).addClass('focus')
  })

  $searchFocus.on('blur', function (e) {
    if ($searchFocus.val() === '') {
      $(e.target).removeClass('focus')
    }
  })

  if (window.location.hash && $('.design-principles').length !== 1 && $('.section-page').length !== 1) {
    contentNudge(window.location.hash)
  }

  $('nav').delegate('a', 'click', function () {
    var hash
    var href = $(this).attr('href')

    if (href.charAt(0) === '#') {
      hash = href
    } else if (href.indexOf('#') > 0) {
      hash = '#' + href.split('#')[1]
    }

    if ($(hash).length === 1) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('#global-header').height()
      }, 10)
    }
  })

  // hover, active and focus states for buttons in IE<8
  if (!$.support.leadingWhitespace) {
    $('.button').not('a')
      .on('click focus', function () {
        $(this).addClass('button-active')
      })
      .on('blur', function () {
        $(this).removeClass('button-active')
      })

    $('.button')
      .on('mouseover', function () {
        $(this).addClass('button-hover')
      })
      .on('mouseout', function () {
        $(this).removeClass('button-hover')
      })
  }

  if ($('*[data-contextual-helpers]').length) {
    // setup showing/hiding of contextual fields
    toggleContextualFields().setup()
  }

  sso().init()
  visibility()
  form.init()
  mask()
  toggle()
  autoCompleteFactory()
  control()
  masker()
  passwordReveal()
  formHintHelper()
  toggleDynamicFormFields()

  // TODO: replace toggleDynamicFormField usage in all exemplars and rename this function
  simpleToggleDynamicFormFields()
  questionnaireSubmission()
  registerBlockInputFields()
  customValidations()
  exitSurveyValidation().setup()
  citizenAuthValidation().setup()
  feedbackForms().setup()
  reportAProblem().setup()
  saEmailPrefs().setup()
  toggleDetails()
  validatorFocus()
  attorneyBanner()
  youtubePlayer().init()
  ajaxFormSubmit.init(ajaxCallbacks)
  tabs()
  accordion()
  charCounter()
  accountMenu()
  addRemove()
  modalDialog()
  dynamicGaTags()
  listCollapse()
  noticeBanner()
})
