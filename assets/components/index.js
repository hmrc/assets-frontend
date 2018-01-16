
var accountMenu = require('./account-menu/account-menu')
var charCounter = require('./character-counter/character-counter')
var timeoutDialog = require('../components/timeout-dialog/timeoutDialog.js')

accountMenu()
charCounter()
$.timeoutDialog = timeoutDialog
