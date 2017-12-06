'use strict'

/*
- Clean all generated dirs
- Copy error pages
- Styles
- Scripts
- Images

Dev:
- Sourcemaps
- BrowserSync
- Watch

Build:
- Image compression

Test:
- Continuous
- Spec reporter
*/

const src = './assets/'
const dest = src + 'public/'
const distDir = src + 'dist/'
const snapshotDir = {
  v3: dest + 'v3-SNAPSHOT/',
  v4: dest + 'v4-SNAPSHOT/'
}

var govuk = {
  elements: 'node_modules/govuk-elements-sass',
  toolkit: 'node_modules/govuk_frontend_toolkit'
}

module.exports = {
  dest: snapshotDir,
  distDir: distDir,

  scripts: {
    src: [
      src + 'javascripts/modules/**/*.js',
      src + 'javascripts/**/index.js',
      src + 'components/**/*.js',
      src + 'application.js',
      '!**/*.polyfill.js'
    ],
    destDirName: 'javascripts',
    vendorDestDirName: 'javascripts/vendor',
    gulpTasks: 'gulpfile.js/**/*.js',
    encryptionSrc: src + 'javascripts/encryption/**/*.js',

    modernizr: {
      options: [
        'setClasses',
        'html5printshiv',
        'testProp'
      ],
      tests: [
        'touchevents'
      ],
      excludeTests: [
        'flash',
        'hidden',
        'arrow'
      ],
      files: {
        src: [
          src + '{javascripts,scss}/**/*.{js,scss}',
          govuk.toolkit + '/**/*.{js,scss}',
          govuk.elements + '/**/*.{js,scss}',
          '!**[^node_modules]/**/modernizr.js'
        ]
      }
    }
  },

  svg: {
    src: [
      src + 'images/**/*.svg',
      govuk.toolkit + '/images/**/*.svg'
    ],
    destDirName: 'images'
  },

  images: {
    src: [
      src + 'images/**/*',
      '!' + src + 'images/**/*.svg',
      govuk.toolkit + '/images/**/*',
      '!' + govuk.toolkit + '/images/**/*.svg'
    ],
    destDirName: 'images'
  },

  sass: {
    src: [
      src + '*.scss',
      src + 'scss/**/*.scss',
      src + 'components/**/*.scss'
    ],
    destDirName: 'stylesheets',
    settings: {
      sourceComments: true,
      includePaths: [
        govuk.elements + '/public/sass',
        govuk.toolkit + '/stylesheets'
      ],
      outputStyle: 'compressed'
    },
    sourceMapsDir: './maps'

  },

  browserify: {
    bundleConfigs: [{
      basedir: './',
      entries: [
        src + 'application.js'
      ],
      destDirName: 'javascripts',
      outputName: 'application.js'
    }, {
      entries: [
        src + 'javascripts/export/fingerprint.js'
      ],
      destDirName: 'javascripts',
      outputName: 'mdtpdf.js'
    }]
  },

  test: {
    src: src + 'test/**/*.js',
    specsScr: src + 'test/specs/unit/**/*.js',
    fixturesScr: src + 'test/specs/fixtures/*.html',
    karmaConfig: src + 'test/config/karma.conf.js',
    gulpTasks: [
      'gulpfile.js/tests/**/*.test.js',
      '!gulpfile.js/tests/fixtures/**/*'
    ]
  },

  errorPages: {
    src: src + 'error_pages/*.html',
    assetsBaseUri: '/assets/'
  },

  compLib: {
    port: 9042,
    host: 'http://localhost',
    baseDir: './component-library/'
  },

  patternLibrary: {
    sourceBaseDir: src,
    src: [
      src + 'styles',
      src + 'components',
      src + 'patterns'
    ],
    dest: 'design-pattern-library',
    template: './node_modules/hmrc-component-library-template/design-system.html',
    homepage: 'design-system.md',
    helpers: './node_modules/hmrc-component-library-template/helpers'
  },

  vrt: {
    backstopConfigTemplate: './gulpfile.js/util/backstop/backstop.template.json',
    backstopConfig: './backstop.json'
  },

  browserSync: [{
    ui: false,
    port: 9032,
    open: false,
    server: {
      baseDir: '.',
      routes: {
        '/assets': dest
      }
    }
  }, {
    ui: false,
    port: 9033,
    open: false,
    server: 'component-library'
  }, {
    ui: false,
    port: 9034,
    open: false,
    server: 'design-pattern-library'
  }]
}
