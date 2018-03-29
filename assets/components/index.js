'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/timeout-dialog/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  $.timeoutDialog = timeoutDialog
})(window.jQuery, window, document)
