'use strict'

var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../patterns/warn-users-we-are-going-to-time-them-out/timeoutDialog')

;(function ($, window, document) {
  accountMenu()
  charCounter()
  $.timeoutDialog = timeoutDialog
})(window.jQuery, window, document)
