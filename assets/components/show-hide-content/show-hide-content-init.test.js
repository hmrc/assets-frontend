/* eslint-env jasmine, jquery */
/* global loadFixtures */
require('jquery')

describe('Show hide content', function () {
  beforeEach(function (done) {
    jasmine.getFixtures().fixturesPath = 'base/components/show-hide-content/'
    loadFixtures('show-hide-content-init.html')
    $('html').addClass('js')
    var event = document.createEvent('Event')
    event.initEvent('DOMContentLoaded', true, true)
    require('govuk_frontend_toolkit/javascripts/govuk/show-hide-content') // This is added in browserify during a build
    require('../../application')
    window.document.dispatchEvent(event)
    done()
  })

  // Todo: See if we can find a way to check that the showHideContent.init() code has actually been called.

  it('should reveal content when selecting the associated radio button', function (done) {
    $('#example-contact-by-phone').click()
    expect($('#contact-by-phone')).not.toBeHidden()
    done()
  })

  it('should hide content when a different radio button is clicked', function (done) {
    $('#example-contact-by-email').click()
    expect($('#contact-by-phone')).toBeHidden()
    done()
  })
})
