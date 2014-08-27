// Karma configuration
// Generated on Tue Aug 26 2014 11:01:22 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../',

    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
      'test/test-main.js',
      {pattern: 'test/specs/helpers/jasmine-matchers.js', included: false},
      {pattern: 'bower_components/**/*.js', included: false},
      {pattern: 'javascripts/modules/*.js', included: false},
      {pattern: 'javascripts/*.js', included: false},
      {pattern: 'test/specs/fixtures/*.html', included: false},
      {pattern: 'test/specs/*.js', included: false},
      {pattern: 'test/specs/helpers/*.js', included: false}
    ],

    // list of files to exclude
    exclude: [
      'bower_components/**/*Spec.js'
    ],

    preprocessors: {
      'javascripts/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['spec', 'junit', 'coverage'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: '../test_results/TEST-javascript-test-results.xml'
    },

    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: '../test_coverage/'
      }, {
        type: 'text-summary'
      }]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-requirejs',
      'karma-spec-reporter',
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};
