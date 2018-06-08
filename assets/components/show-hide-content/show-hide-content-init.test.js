/* eslint-env jasmine, jquery */
/* global loadFixtures */
require('jquery')

describe('Show hide content', function () {
  beforeEach(function () {
    jasmine.getFixtures().fixturesPath = 'base/components/show-hide-content/'
    loadFixtures('show-hide-content-init.html')
    require('govuk_frontend_toolkit/javascripts/govuk/show-hide-content') // This is added in browserify during a build
    require('../../application')
    $('html').addClass('js')
  })

  it('should have been called', function () {
    expect($('#contact-by-phone')).toBeHidden()
    $('#example-contact-by-phone').click()
    expect($('#contact-by-phone')).not.toBeHidden()
    $('#example-contact-by-email').click()
    expect($('#contact-by-phone')).toBeHidden()
  })
})
