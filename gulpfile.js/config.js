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
  elements: src + 'govuk_elements',
  template: src + 'govuk_elements/govuk',
  images: src + 'govuk_elements/govuk/public/images/'
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
    dev: {
      src: src + 'images/**/*.svg',
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  images: {
    govuk: govuk.images + '**/*',
    dev: {
      src: [src + 'images/**/*', '!' + src + 'images/**/*.svg'],
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  sass: {
    src: [
      src + 'scss/**/*.scss',
      src + 'components/**/*.scss',
      src + 'patterns/**/*.scss'
    ],
    govukSrc: govuk.template + '/public/sass/**/*.scss',
    govukElementsSrc: govuk.elements + '/public/sass/**/*.scss',
    dev: {
      dest: snapshotDir + 'stylesheets/',
      settings: {
        sourceComments: true,
        includePaths: [
          src,
          govuk.template + '/public/sass'
        ],
        outputStyle: 'expanded'
      },
      sourceMapsDir: './maps'
    },
    prod: {
      dest: distDir + 'stylesheets/',
      settings: {
        includePaths: [
          src,
          govuk.template + '/public/sass'
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
      dev: {
        dest: snapshotDir + 'javascripts'
      },
      prod: {
        dest: distDir + 'javascripts'
      },
      outputName: 'application.js'
    },
    {
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
    src: [
      src + 'components/**/*',
      src + 'patterns/**/*'
    ],
    port: 9042,
    host: 'http://localhost',
    baseDir: './component-library/'
  },

  vrt: {
    backstopConfigTemplate: './gulpfile.js/util/backstop/backstop.template.json',
    backstopConfig: './backstop.json'
  },

  browserSync: {
    ui: false,
    port: 9032,
    open: false,
    server: {
      baseDir: '.',
      routes: {
        '/assets': dest,
        '/component-library': './component-library'
      }
    }
  }
}
