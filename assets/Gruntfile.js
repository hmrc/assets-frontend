var path = require('path');
module.exports = function(grunt) {

  // Displays the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);

  // Loading the different plugins
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      temp: '.tmp',
      dist: 'dist',
      public: 'public',
      bower: 'bower_components',
      snapshot: 'public/999-SNAPSHOT',
      govuk: {
        elements: 'govuk_elements',
        template: 'govuk_elements/govuk'
      }
    },

    clean: {
      public: '<%= dirs.public %>',
      stylesheets: '<%= dirs.snapshot %>/stylesheets'
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= dirs.bower %>',
          copy: false
        }
      }
    },

    sass: {
      dev: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded',
          includePaths: ['<%= dirs.govuk.template %>/public/sass', '/assets/scss']
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: '<%= dirs.snapshot %>/stylesheets',
          ext: '.min.css'
        }]
      },
      build: {
        options: {
          outputStyle: 'compressed',
          includePaths: ['<%= dirs.govuk.template %>/public/sass']
        },
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: '<%= dirs.public %>/stylesheets',
          ext: '.min.css'
        }]
      }
    },

    cssmin: {
      build: {
        expand: true,
        cwd: '<%= dirs.public %>/stylesheets',
        src: ['*.css'],
        dest: '<%= dirs.public %>/stylesheets'
      }
    },

    jshint: {
      all: [
        'javascripts/**/*.js',
        '!javascripts/vendor/**/*',
        '!javascripts/**/{base64v1_0,mdtpdf}.js'
      ],
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true,
        force: true
      }
    },

    karma: {
      options: {
        configFile: 'test/config/karma.conf.js'
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    requirejs: {
      dev: {
        options: {
          mainConfigFile: "require.conf.js",
          out: '<%= dirs.snapshot %>/javascripts/application.min.js',
        }
      },
      build: {
        options: {
          mainConfigFile: "require.conf.js",
          out: '<%= dirs.public %>/javascripts/application.min.js',
        }
      }
    },

    modernizr: {
      dist: {
        devFile: '<%= dirs.bower %>/modernizr/modernizr.js',
        outputFile: '<%= dirs.public %>/javascripts/vendor/modernizr.js',
        extra: {
          shiv: true,
          cssclasses: true
        },
        extensibility: {
          teststyles: true,
          prefixes: true,
        }
      }
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= dirs.govuk.template %>/public/images',
          src: ['**/*'],
          dest: '<%= dirs.snapshot %>/images'
        }, {
          src: '<%= dirs.bower %>/modernizr/modernizr.js',
          dest: '<%= dirs.snapshot %>/javascripts/vendor/modernizr.js'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= dirs.govuk.template %>/public/images',
          src: ['**/*'],
          dest: '<%= dirs.public %>/images'
        }]
      }
    },

    express: {
      server: {
        options: {
          port: 9032,
          server: path.resolve(__dirname, 'server.js'),
          bases: path.resolve(__dirname, 'assets')
        }
      }
    },

    watch: {
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['clean:stylesheets', 'sass:dev']
      },
      js: {
        files: [
          'javascripts/**/*.js',
          'test/specs/**/*.js',
          '!node_modules/**'
        ],
        tasks: [
          'test',
          'requirejs:dev'
        ]
      },
      configFiles: {
        files: [
          'Gruntfile.js',
          'require.conf.js'
        ],
        options: {
          reload: true
        }
      }
    },

    // make a zipfile
    compress: {
      main: {
        options: {
          archive: '<%= dirs.dist %>/<%= pkg.name %>-999-SNAPSHOT.zip',
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'public/',
          src: '**'
        }]
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'bower:install',
    'sass:dev',
    'test',
    'requirejs:dev',
    'copy:dev',
    'express',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'bower:install',
    'sass:build',
    'cssmin',
    'test',
    'requirejs:build',
    'modernizr',
    'copy:build',
    'compress'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

}
