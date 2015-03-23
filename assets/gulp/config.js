var src = './',
	dest = './public/',
  snapshotDir = dest + '999-SNAPSHOT/',
  distDir = './dist/' ,
  npmModules = src + 'node_modules/',
  govuk = {
    elements: src + 'govuk_elements',
    template: src + 'govuk_elements/govuk',
    images: src + 'govuk_elements/govuk/public/images/'
  }
'use strict';
module.exports = {
  browserSync: {
    ui: false,
    port: 9032,
    open: false,
    server: {
      // Serve up our build folder
      baseDir: snapshotDir,
      directory: true,
      routes: {
        "/assets" : snapshotDir
      }
    }
  },  
  scripts: {
    src : src + 'javascripts/modules/**/*.js',
    jshintExclude: '!javascripts/**/{base64v1_0,details.polyfill,mdtpdf}.js',
    dest: snapshotDir + 'javascripts',
    vendorDest: {
      dev: snapshotDir + 'javascripts/vendor',
      prod:  distDir + 'javascripts/vendor'
    },
    modernizr: {
      //devFile: npmModules + 'modernizr/dist/modernizr-build.min.js',
      extra: {
        shiv: true,
        cssclasses: true
      },
      extensibility: {
        teststyles: true,
        prefixes: true
      }
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
    dev: {
      dest: snapshotDir + 'stylesheets/',
      settings: {
        sourceComments: true,
        includePaths: [govuk.template + '/public/sass' ],
        outputStyle:'expanded'
      },
      sourceMapsDir:  './maps',
    },
    prod: {
      dest: distDir + 'stylesheets/',
      settings: {
        includePaths: [govuk.template + '/public/sass' ],
        outputStyle: 'compressed'
      }      
    }

  },
  browserify: {
    bundleConfigs: [{
    entries   : [src + 'javascripts/application.js'],
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
    karma: src + 'test/config/karma.conf.js',
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
    dest: distDir,
  }	
}
