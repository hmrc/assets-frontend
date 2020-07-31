/* eslint-env jquery */

require('jquery')
var dialog = require('./dialog.js')
var redirectHelper = require('./redirectHelper.js')
var timeoutHelper = require('./timeoutHelper.js')

var self = module.exports = {
  timeoutDialog: function (options) {

    validateInput(options)

    var cleanupFunctions = []
    var localisedDefaults = readCookie('PLAY_LANG') && readCookie('PLAY_LANG') === 'cy' && {
      title: undefined,
      message: 'Er eich diogelwch, byddwn yn eich allgofnodi cyn pen',
      keepAliveButtonText: 'Parhau i fod wedi’ch mewngofnodi',
      signOutButtonText: 'Allgofnodi',
      properties: {
        minutes: 'funud',
        minute: 'funud',
        seconds: 'eiliad',
        second: 'eiliad'
      }
    } || {
      title: undefined,
      message: 'For your security, we will sign you out in',
      keepAliveButtonText: 'Stay signed in',
      signOutButtonText: 'Sign out',
      properties: {
        minutes: 'minutes',
        minute: 'minute',
        seconds: 'seconds',
        second: 'second'
      }
    }

    var settings = mergeOptionsWithDefaults(options, localisedDefaults)

    setupDialogTimer()

    function validateInput(config) {
      var requiredConfig = ['timeout', 'countdown', 'keepAliveUrl', 'signOutUrl']
      var missingRequiredConfig = []

      $.each(requiredConfig, function () {
        if (!config.hasOwnProperty(this) || config[this] === '') {
          missingRequiredConfig.push(this)
        }
      })

      if (missingRequiredConfig.length > 0) {
        throw new Error('Missing config item(s): [' + missingRequiredConfig.join(', ') + ']')
      }
    }

    function mergeOptionsWithDefaults (options, localisedDefaults) {
      var clone = $.extend({}, options)

      Object.keys(localisedDefaults).forEach(function (key) {
        if (typeof clone[key] === 'object') {
          clone[key] = mergeOptionsWithDefaults(
            options[key],
            localisedDefaults[key]
          )
        }
        if (clone[key] === undefined || clone[key] === '') {
          clone[key] = localisedDefaults[key]
        }
      })

      return clone
    }

    function setupDialogTimer () {
      settings.signout_time = getDateNow() + settings.timeout * 1000

      var timeout = timeoutHelper.setTimeout(function () {
        setupDialog()
      }, (settings.timeout - settings.countdown) * 1000)

      cleanupFunctions.push(function () {
        timeoutHelper.clearTimeout(timeout)
      })
    }

    function setupDialog() {
      var $countdownElement = $('<span id="timeout-countdown" class="countdown">')
      var $timeoutMessage = $('<p id="timeout-message" role="text" aria-hidden="true">').text(settings.message + ' ')
        .append($countdownElement)
        .append('.')

      if (settings.messageSuffix) {
        $timeoutMessage.append(' ')
        $timeoutMessage.append(settings.messageSuffix)
      }

      var $audibleCountdownElement = $('<div class="screenreader-content govuk-visually-hidden" aria-live="assertive">')

      var $element = $('<div>')
        .append($audibleCountdownElement)
        .append(settings.title ? $('<h1 class="heading-medium push--top">').text(settings.title) : '')
        .append($timeoutMessage)
        .append($('<button id="timeout-keep-signin-btn" class="button">').text(settings.keepAliveButtonText))
        .append($('<p>')
          .append($('<a id="timeout-sign-out-link">').text(settings.signOutButtonText).attr('href', settings.signOutUrl)))

      $element.find('#timeout-keep-signin-btn').on('click', keepAliveAndClose)
      $element.find('#timeout-sign-out-link').on('click', function (e) {
        e.preventDefault()
        signOut()
      })

      var dialogControl = dialog.displayDialog($element)

      cleanupFunctions.push(function () {
        dialogControl.closeDialog()
      })

      dialogControl.addCloseHandler(keepAliveAndClose)

      dialogControl.setAriaLabelledBy('timeout-message')

      startCountdown($countdownElement, $audibleCountdownElement)
    }

    function getMillisecondsRemaining () {
      return settings.signout_time - getDateNow()
    }

    function getSecondsRemaining () {
      return Math.round(getMillisecondsRemaining() / 1000)
    }

    function startCountdown ($countdownElement, $screenReaderCountdownElement) {
      var currentTimer

      cleanupFunctions.push(function () {
        if (currentTimer) {
          timeoutHelper.clearTimeout(currentTimer)
        }
      })

      function getHumanText (counter) {
        var minutes, visibleMessage
        if (counter < 60) {
          visibleMessage = counter + ' ' + settings.properties[counter !== 1 ? 'seconds' : 'second']
        } else {
          minutes = Math.ceil(counter / 60)
          visibleMessage = minutes + ' ' + settings.properties[minutes === 1 ? 'minute' : 'minutes']
        }
        return visibleMessage
      }

      function getAudibleHumanText (counter) {
        var humanText = getHumanText(roundSecondsUp(counter))
        var messageParts = [settings.message, ' ', humanText, '.']
        if (settings.messageSuffix) {
          messageParts.push(' ')
          messageParts.push(settings.messageSuffix)
        }
        return messageParts.join('')
      }

      function roundSecondsUp (counter) {
        if (counter > 60) {
          return counter
        } else if (counter < 20) {
          return 20
        } else {
          return Math.ceil(counter / 20) * 20
        }
      }

      function updateTextIfChanged ($elem, text) {
        if ($elem.text() !== text) {
          $elem.text(text)
        }
      }

      function updateCountdown (counter, $countdownElement) {
        var visibleMessage = getHumanText(counter)
        var audibleHumanText = getAudibleHumanText(counter)

        updateTextIfChanged($countdownElement, visibleMessage)
        updateTextIfChanged($screenReaderCountdownElement, audibleHumanText)
      }

      function getNextTimeout () {
        var remaining = getMillisecondsRemaining()
        var roundedRemaining = Math.floor(getMillisecondsRemaining() / 1000) * 1000
        if (roundedRemaining <= 60000) {
          return (remaining - roundedRemaining) || 1000
        }
        return remaining - (roundedRemaining - (roundedRemaining % 60000 || 60000))
      }

      function runUpdate () {
        var counter = getSecondsRemaining()
        updateCountdown(counter, $countdownElement)
        if (counter <= 0) {
          signOut()
        }
        currentTimer = timeoutHelper.setTimeout(runUpdate, getNextTimeout())
      }

      runUpdate()
    }
    function keepAliveAndClose() {
      cleanup()
      setupDialogTimer()
      $.get(settings.keepAliveUrl, function () {
      })
    }

    function getDateNow() {
      var dateNow = Date.now() || +new Date()
      return dateNow
    }

    function signOut() {
      redirectHelper.redirectToUrl(settings.signOutUrl)
    }

    function cleanup() {
      while (cleanupFunctions.length > 0) {
        var fn = cleanupFunctions.shift()
        fn()
      }
    }

    function readCookie(cookieName) { // From http://www.javascripter.net/faq/readingacookie.htm
      var re = new RegExp('[ ]' + cookieName + '=([^\\s]*)')
      var sMatch = (' ' + document.cookie).match(re)
      if (cookieName && sMatch) return unescape(sMatch[1])
      return ''
    }

    return {cleanup: cleanup}
  },
  legacyWrapper: function (config) {
    console.warn('$.timeout is now deprecated, please use window.GOVUK.timeoutDialog')
    var updatedConfig = $.extend({}, config)

    if (updatedConfig.hasOwnProperty('keep_alive_url')) {
      updatedConfig.keepAliveUrl = updatedConfig.keep_alive_url
      delete updatedConfig.keep_alive_url
    }
    if (updatedConfig.hasOwnProperty('keep_alive_button_text')) {
      updatedConfig.keepAliveButtonText = updatedConfig.keep_alive_button_text
      delete updatedConfig.keep_alive_button_text
    }
    if (updatedConfig.hasOwnProperty('logout_url')) {
      updatedConfig.signOutUrl = updatedConfig.logout_url
      delete updatedConfig.logout_url
    }
    if (updatedConfig.hasOwnProperty('sign_out_button_text')) {
      updatedConfig.signOutButtonText = updatedConfig.sign_out_button_text
      delete updatedConfig.sign_out_button_text
    }

    self.timeoutDialog($.extend({
      timeout: 900,
      countdown: 120,
      keepAliveUrl: '/keep-alive',
      signOutUrl: '/sign-out'
    }, updatedConfig))
  }
}
