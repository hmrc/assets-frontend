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

var src = './assets/'
var dest = src + 'public/'
var distDir = src + 'dist/'
var snapshotDir = dest + '999-SNAPSHOT/'
var govuk = {
  elements: 'node_modules/govuk-elements-sass',
  toolkit: 'node_modules/govuk_frontend_toolkit'
}

module.exports = {
  dest: dest,
  distDir: distDir,

  dev: {
    dest: snapshotDir
  },
  prod: {
    dest: distDir
  },

  production: {
    jsSrc: distDir + 'javascripts/*.js',
    jsDest: distDir + 'javascripts/',
    imagesDir: distDir + 'images',
    cssSrc: distDir + 'stylesheets',
    dest: distDir
  },

  scripts: {
    src: [
      src + 'javascripts/modules/**/*.js',
      src + 'components/**/*.js'
    ],
    dest: snapshotDir + 'javascripts',
    dev: {
      dest: snapshotDir + 'javascripts'
    },
    prod: {
      dest: distDir + 'javascripts'
    },
    entryPoint: src + 'javascripts/application.js',
    gulpTasks: 'gulpfile.js/**/*.js',
    encryptionSrc: src + 'javascripts/encryption/**/*.js',
    encryptionDest: {
      dev: snapshotDir + 'javascripts/',
      prod: distDir + 'javascripts/'
    },
    vendorDest: {
      dev: snapshotDir + 'javascripts/vendor/',
      prod: distDir + 'javascripts/vendor/'
    },

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
          src + '{javascripts,scss,govuk_*}/**/*.{js,scss}',
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
    dev: {
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  images: {
    src: [
      src + 'images/**/*',
      '!' + src + 'images/**/*.svg',
      govuk.toolkit + '/images/**/*',
      '!' + govuk.toolkit + '/images/**/*.svg'
    ],
    dev: {
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  sass: {
    src: [
      src + '*.scss',
      src + 'scss/**/*.scss',
      src + 'components/**/*.scss'
    ],
    dev: {
      dest: snapshotDir + 'stylesheets/',
      settings: {
        sourceComments: true,
        includePaths: [
          govuk.elements + '/public/sass',
          govuk.toolkit + '/stylesheets'
        ],
        outputStyle: 'expanded'
      },
      sourceMapsDir: './maps'
    },
    prod: {
      dest: distDir + 'stylesheets/',
      settings: {
        includePaths: [
          govuk.elements + '/public/sass',
          govuk.toolkit + '/stylesheets'
        ],
        outputStyle: 'compressed'
      }
    }
  },

  browserify: {
    bundleConfigs: [{
      entries: [
        src + 'javascripts/application.js'
      ],
      add: [
        govuk.toolkit + '/javascripts/govuk/**/*.js',
        '!' + govuk.toolkit + '/javascripts/govuk/selection-buttons.js'
      ],
      dev: {
        dest: snapshotDir + 'javascripts'
      },
      prod: {
        dest: distDir + 'javascripts'
      },
      outputName: 'application.js'
    }, {
      entries: [
        src + 'javascripts/export/fingerprint.js'
      ],
      dev: {
        dest: snapshotDir + 'javascripts'
      },
      prod: {
        dest: distDir + 'javascripts'
      },
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
    dev: {
      dest: snapshotDir,
      assetsPath: '/' + snapshotDir
    },
    prod: {
      dest: distDir,
      assetsPath: process.env.TAG ? '/assets/' + process.env.TAG + '/' : '/assets/999-SNAPSHOT/'
    }
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
