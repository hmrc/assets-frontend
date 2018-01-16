// Karma configuration
// Generated on Tue Aug 26 2014 11:01:22 GMT+0100 (BST)

module.exports = function (config) {
  config.set({
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
    files: [
      'test/specs/fixtures/*.html',
      'test/specs/*.js',
      'components/**/**.html',
      'components/**/**.test.js',
      'public/v3-SNAPSHOT/stylesheets/application.min.css'
    ],

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
      'components/**/*.test.js': ['browserify']
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

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
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  })
}
