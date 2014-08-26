var tests = [];
var TEST_REGEXP = /spec\.js$/;

var pathToModule = function(path) {
  return path.replace(/^\/base\/javascripts\//, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    tests.push(pathToModule(file));
  }
});

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/javascripts',

  paths: {
    'json3': '../bower_components/json3/lib/json3',
    'jquery': '../bower_components/jquery/jquery',
    'jquery.validate': '../bower_components/jquery-validation/jquery.validate',
    'jquery.validate.additional-methods': '../bower_components/jquery-validation/additional-methods',
    'details.polyfill': '../govuk_elements/public/javascripts/vendor/details.polyfill',
    'stageprompt': '../bower_components/stageprompt/script/stageprompt',
    'govuk-elements': '../govuk_elements/govuk/public/javascripts/govuk-template',
    'base64': '../bower_components/base64v1_0/index',
    'mdtpdf': 'modules/mdtpdf',
    'jasmine-jquery': '../test/specs/helpers/jasmine-jquery',
    'jasmine-matchers': '../test/specs/helpers/jasmine-matchers'
  },

  shim: {
    'jquery.validate': ['jquery'],
    'jquery.validate.additional-methods': ['jquery'],
    'jasmine-jquery': ['jquery']
  },

  // Ask Require.js to load these files (all our tests).
  deps: tests,

  // Set test to start run once Require.js is done.
  callback: window.__karma__.start
});
