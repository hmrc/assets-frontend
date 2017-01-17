/* eslint-env jquery */
require('jquery')

/*
Show or hide elements by changing respective aria-hidden attribute
The visual styles can be controlled by using the .visible-javascript-on and .hidden-javascript-on CSS selectors

Used for displaying markup and altering aria details dependant on browser JavaScript ability
*/
var $showElements
var $hideElements

var updateAriaHiddenStatus = function ($elems, show) {
  $elems.each(function (index, elem) {
    $(elem).attr('aria-hidden', show)
  })
}

var show = function () {
  updateAriaHiddenStatus($showElements, false)
}

var hide = function () {
  updateAriaHiddenStatus($hideElements, true)
}

var setup = function () {
  $showElements = $('.js-aria-show')
  $hideElements = $('.js-aria-hide')
}

module.exports = function () {
  setup()

  if ($showElements.length) {
    show()
  }

  if ($hideElements.length) {
    hide()
  }
}
