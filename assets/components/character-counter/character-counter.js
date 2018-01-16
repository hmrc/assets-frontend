/* eslint-env jquery */

/**
 * Character Counter Module
 *
 * Usage:
 *
 *  <div class="char-counter" data-char-counter>
 *    <textarea data-char-field maxLength="250"></textarea>
 *  </div>
 *
 * Known Issue:
 *
 * Chrome counts new lines as two characters, while other browser count them as one.
 * In non-Chrome browsers, sometimes it will say 0 characters remaining but let you type one more.
 *
 */

var $ = require('jquery')

var counterContainer = '[data-char-counter]'
var counterField = '[data-char-field]'
var counterValue = '[data-counter]'
var counterText = '[data-char-text]'

/**
 * If any char counters on page, init
 *
 * @param $counters
 */
module.exports = function () {
  var $counters = $(counterContainer)

  // only continue if counter html exists
  if ($counters.length === 0) {
    return
  }

  // for each counter on the page
  $counters.each(function () {
    var $counter = $(this)
    var $input = $counter.find(counterField)

    // only proceed if max length is set
    if (!$input.attr('maxLength')) {
      return
    }

    // add "characters remaining" html
    addCounterHtml($counter)

    // bind on change of text
    bindEvents($counter)

    // set initial count
    setCounterText($counter)
  })
}

/**
 * Bind on change of input
 *
 * @param $counter
 */
var bindEvents = function ($counter) {
  $counter.find(counterField).on('input onpropertychange', function () {
    setCounterText($counter)
  })
}

/**
 * Add character count text
 *
 * @param $counter
 */
var addCounterHtml = function ($counter) {
  var html = $('<p class="char-counter-text flush"><span data-counter></span> remaining <span data-char-text>characters</span></p>')
  $counter.find(counterField).after(html)
}

/**
 * Set counter text
 *
 * @param $counter
 */
var setCounterText = function ($counter) {
  var $input = $counter.find(counterField)
  var maxLength = parseInt($input.attr('maxLength'), 10)

  // give carriage returns and newline characters equal weighting cross browser to help accurate calculation
  var count = $input.val().replace(/\r\n/g, '~~').replace(/\n/g, '~~').length
  var remaining = maxLength - count

  // in the scenario where one character is remaining and the user breaks some text onto a new line,
  // the browser allows this but registers it as two characters giving a count of -1, so need to adjust for this
  if (remaining < 0) {
    remaining = 0
  }

  $counter.find(counterValue).text(remaining)
  $counter.find(counterText).text(remaining === 1 ? 'character' : 'characters')
}
