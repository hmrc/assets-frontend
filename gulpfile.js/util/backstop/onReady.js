/* eslint-env jquery */
module.exports = function (casper, scenario, vp) {
  var scenarioLabel = scenario.label.toLowerCase()

  if (scenarioLabel === 'add-remove') {
    casper.evaluate(function () {
      // Use jQuery click() so the addRemove.js click implementation and its preventDefault() is fired
      $('a[data-add-btn]').click()
    })
  }

  if (scenarioLabel === 'autocomplete') {
    casper.sendKeys('#country-code-auto-complete', 'united kingdom')
  }

  if (scenarioLabel === 'details') {
    casper.evaluate(function () {
      var detailElements = Array.prototype.slice.call(document.querySelectorAll('summary'))

      detailElements.forEach(function (element) {
        element.click()
      })
    })
  }

  if (scenarioLabel === 'form') {
    casper.click('#continue')
  }

  if (scenarioLabel === 'youtube-player') {
    casper.evaluate(function () {
      var youTubePlayerContainerElement = document.querySelector('.youtube-player-container')
      var maskingDivElement = document.createElement('div')

      maskingDivElement.style.cssText = [
        'position: absolute;',
        'top: 0;',
        'left: 0;',
        'width: 100%;',
        'height: 100%;',
        'background-color: #000;',
        'z-index: 1000;'
      ].join('')

      youTubePlayerContainerElement.insertBefore(maskingDivElement, youTubePlayerContainerElement.firstElementChild)
    })
  }
}
