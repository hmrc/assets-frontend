require.config({
  baseUrl: 'javascripts',
  name: '../bower_components/almond/almond',
  paths: {
    'json3': '../bower_components/json3/lib/json3',
    'jquery': '../bower_components/jquery/jquery',
    'jquery.validate': '../bower_components/jquery-validation/jquery.validate',
    'jquery.validate.additional-methods': '../bower_components/jquery-validation/additional-methods',
    'details.polyfill': '../govuk_elements/public/javascripts/vendor/details.polyfill',
    'stageprompt': '../bower_components/stageprompt/script/stageprompt',
    'govuk-elements': '../govuk_elements/govuk/public/javascripts/govuk-template',
    'base64': '../bower_components/base64/base64',
    'mdtpdf': 'modules/mdtpdf'
  },
  shim: {
    'jquery.validate': ['jquery'],
    'jquery.validate.additional-methods': ['jquery']
  },
  include: [
    'json3',
    'base64',
    'details.polyfill',
    'mdtpdf',
    'govuk-elements',
    'modules/fingerprint',
    'application'
  ],
  preserveLicenseComments: false,
  generateSourceMaps: true,
  optimize: 'uglify2',
  uglify2: {
    mangle: false
  }
  // wrap: true
});
