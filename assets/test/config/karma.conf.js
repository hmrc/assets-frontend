module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../..',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'javascripts/vendor/minified/jquery.min.js',
        'javascripts/plugins/**/*.js',
        'test/specs/helpers/jasmine-jquery.js',
        'test/specs/helpers/jasmine-matchers.js',
        //fixtures
        {pattern: 'test/specs/fixtures/**/*.html', served: true, watched: false, included: false},

        'javascripts/base64v1_0.js',
        'javascripts/mdtpdf.js',
        'javascripts/modules/*.js',
        'javascripts/application.js',
        'test/specs/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      //'client/main.js'
    ],

    preprocessors: {
      //'client/*.js': ['commonjs'],
     // 'test/client/*.js': ['commonjs']
     '**/*.html': []
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['spec', 'junit'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: '../../../target/test_results/TEST-javascript-test-results.xml'
    },

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: true,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ]
  });
};