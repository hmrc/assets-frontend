'use strict';

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

var src = './',
    dest = './public/',
    distDir = './dist/',
    snapshotDir = dest + '999-SNAPSHOT/',
    govuk = {
      elements: src + 'govuk_elements',
      template: src + 'govuk_elements/govuk',
      images: src + 'govuk_elements/govuk/public/images/'
    };

module.exports = {
  dest: './public/',
  distDir: './dist/',

  browserSync: {
    ui: false,
    port: 9032,
    open: false,
    server: {
      baseDir: src,
      directory: true,
      routes: {
        '/assets': dest
      }
    }
  },

  scripts: {
    src: src + 'javascripts/modules/**/*.js',
    dest: snapshotDir + 'javascripts',
    entryPoint: src + 'javascripts/application.js',
    jshintExclude: '!javascripts/**/{base64v1_0,details.polyfill,mdtpdf}.js',
    jscsSrc: src + '.jscsrc',
    encryptionSrc: src + 'javascripts/encryption/**/*.js',
    gulpTasks: src + 'gulpfile.js/**/*.js',
    vendorDest: {
      dev: snapshotDir + 'javascripts/vendor',
      prod: distDir + 'javascripts/vendor'
    },
    modernizr: {
      'feature-detects': [
        'cookies',
        'css/all',
        'draganddrop',
        'elem/details',
        'elem/picture',
        'elem/progress-meter',
        'file/api',
        'file/filesystem',
        'forms/placeholder',
        'forms/validation',
        'fullscreen-api',
        'geolocation',
        'hashchange',
        'hiddenscroll',
        'history',
        'htmlimports',
        'ie8compat',
        'input',
        'input/formaction',
        'input/formenctype',
        'input/formmethod',
        'input/formtarget',
        'inputsearchevent',
        'inputtypes',
        'json',
        'notification',
        'pagevisibility-api',
        'performance',
        'pointerevents',
        'proximity',
        'queryselector',
        'requestanimationframe',
        'script/async',
        'script/defer',
        'speech/speech-recognition',
        'speech/speech-synthesis',
        'storage/localstorage',
        'storage/sessionstorage',
        'storage/websqldatabase',
        'svg',
        'textarea/maxlength',
        'touchevents',
        'vibration',
        'video'
      ],
      'options': [
          'setClasses'
      ]
    }
  },

  images: {
    govuk: govuk.images + '**/*',
    dev: {
      src: src + 'images/**/*',
      dest: snapshotDir + 'images'
    },
    prod: {
      dest: distDir + 'images'
    }
  },

  sass: {
    src: 'scss/**/*.scss',
    govukSrc: govuk.template + '/public/sass/**/*.scss',
    govukElementsSrc: govuk.elements + '/public/sass/**/*.scss',
    dev: {
      dest: snapshotDir + 'stylesheets/',
      settings: {
        sourceComments: true,
        includePaths: [govuk.template + '/public/sass'],
        outputStyle: 'expanded'
      },
      sourceMapsDir: './maps'
    },
    prod: {
      dest: distDir + 'stylesheets/',
      settings: {
        includePaths: [govuk.template + '/public/sass'],
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
    }]
  },

  test: {
    specsScr: src + 'test/specs/unit/**/*.js',
    fixturesScr: src + 'test/specs/fixtures/*.html',
    karma: src + 'test/config/karma.conf.js'
  },

  server: {
    options: {
      port: 9032,
      server: src + 'server.js',
      bases: src
    },
    dist: {
      root: dest + '999-SNAPSHOT/'
    }
  },

  production: {
    jsSrc: distDir + 'javascripts/*.js',
    jsDest: distDir + 'javascripts/',
    imagesDir: distDir + 'images',
    cssSrc: distDir + 'stylesheets',
    dest: distDir
  }
};
