/* eslint-env jasmine */

var govuk = require('../../../javascripts/modules/GOVUK_helpers.js')
var fingerprint = require('../../../javascripts/modules/fingerprint.js')

describe('fingerprint cookie', function () {
  beforeEach(function () {
    fingerprint()
  })

  it('should create mdtpdf cookie', function () {
    expect(govuk.getCookie('mdtpdf')).not.toBeNull()
  })
})
