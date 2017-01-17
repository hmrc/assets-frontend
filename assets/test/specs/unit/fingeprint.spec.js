/* eslint-env jasmine, jquery */
/* global Mdtpdf */

require('mdtpdf')

describe('Device Fingerprint', function () {
  var fingerprint

  beforeEach(function () {
    fingerprint = new Mdtpdf()
  })

  afterEach(function () {
    fingerprint = undefined
  })

  it('should return a device fingerprint object', function () {
    expect(fingerprint).not.toBeUndefined()
  })

  it('method get() was called', function () {
    spyOn(fingerprint, 'get')
    fingerprint.get()
    expect(fingerprint.get).toHaveBeenCalled()
  })

  describe('returns', function () {
    var fpDetails

    beforeEach(function () {
      fingerprint = new Mdtpdf({
        screen_resolution: true
      })

      var attributes = {
        userAgent: 'Mock user agent',
        language: 'Some language',
        platform: 'The os',
        cpuClass: 'The cpu class',
        doNotTrack: 'true',
        plugins: [{
          name: 'plugin name',
          description: 'plugin description'
        }]
      }

      $.each(attributes, function (key, value) {
        navigator.__defineGetter__(key, function () {
          return value
        })
      })
    })

    it('userAgent attribute', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.userAgent).toBeString()
    })

    it('language attribute', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.language).toBeString()
    })

    it('platform attribute', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.platform).toBeString()
    })

    it('cpuClass attribute', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.cpuClass).toBeString()
    })

    it('doNotTrack attribute', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.doNotTrack).toBeBoolean()
    })

    it('number of plugins', function () {
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fpDetails.numberOfPlugins).toBeNumber()
    })

    it('list of plugins', function () {
      spyOn(fingerprint, 'getPluginsString')
      fpDetails = $.parseJSON(fingerprint.get())
      expect(fingerprint.getPluginsString).toHaveBeenCalled()
      expect(fpDetails.plugins).not.toBe(null)
    })
  })
})
