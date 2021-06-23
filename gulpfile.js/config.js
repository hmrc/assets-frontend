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

var govuk = {
  elements: 'node_modules/govuk-elements-sass',
  toolkit: 'node_modules/govuk_frontend_toolkit'
}

module.exports = {
  src: src,

  dest: dest,

  distDir: distDir,

  designSystemRepositoryMetadata: 'design-system-repository-metadata.yaml',

  snapshotDir: {
    v3: dest + 'v3-SNAPSHOT/',
    v4: dest + 'v4-SNAPSHOT/'
  },

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
      add: [
        govuk.toolkit + '/javascripts/govuk/**/*.js',
        '!' + govuk.toolkit + '/javascripts/govuk/selection-buttons.js',
        '!' + govuk.toolkit + '/javascripts/govuk/analytics/*'
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
    files: {
      v3: [
        'test/specs/fixtures/*.html',
        'test/specs/*.js',
        'components/**/*.html',
        'components/**/*.test.js',
        'components/**/*.test-mobile.js',
        'patterns/**/*.html',
        'patterns/**/*.test.js',
        'public/v3-SNAPSHOT/stylesheets/application.min.css'
      ],
      v4: [
        'components/**/*.html',
        'components/**/*.test.js',
        'components/**/*.test-mobile.js',
        'patterns/**/*.html',
        'patterns/**/*.test.js',
        'public/v4-SNAPSHOT/stylesheets/application.min.css'
      ]
    },
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

  componentLibrary: {
    baseDir: './component-library/',
    dest: 'component-library'
  },

  designSystem: {
    sourceBaseDir: src,
    src: [
      src + 'styles',
      src + 'components',
      src + 'patterns'
    ],
    dest: 'design-system',
    template: './gulpfile.js/util/design-system/design-system.html',
    homepage: 'design-system.md',
    helpers: './gulpfile.js/util/design-system/helpers',
    macrosPath: './gulpfile.js/util/design-system/macros'
  },

  browserSync: [{
    ui: false,
    port: 9032,
    open: false,
    logLevel: 'silent',
    host: '127.0.0.1',
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
    logLevel: 'silent',
    localOnly: true,
    host: '127.0.0.1',
    server: 'component-library'
  }, {
    ui: false,
    port: 9034,
    open: false,
    logLevel: 'silent',
    localOnly: true,
    host: '127.0.0.1',
    server: 'design-system'
  }]
}
