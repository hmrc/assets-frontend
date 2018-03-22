// Karma configuration
// Generated on Tue Aug 26 2014 11:01:22 GMT+0100 (BST)

module.exports = function (karmaConfig) {
  karmaConfig.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    // frameworks to use
    frameworks: [
      'jasmine-jquery',
      'jasmine',
      'jasmine-matchers',
      'browserify'
    ],

    // list of files / patterns to load in the browser
    // these are set in /gulpfile.js/config.js
    files: [],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['spec', 'junit'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: '../test_results/TEST-javascript-test-results.xml'
    },
    // browserify configuration
    browserify: {
      debug: true
    },

    preprocessors: {
      'test/specs/*.js': ['browserify'],
      'components/**/*.test.js': ['browserify'],
      'components/**/*.test-mobile.js': ['browserify']
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karmaConfig.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS_desktop'],

    customLaunchers: {
      'PhantomJS_desktop': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1024,
            height: 800
          }
        }
      }
    },

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    browserDisconnectTolerance: 3
  })
}
