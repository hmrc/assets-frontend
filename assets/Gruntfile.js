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
      dist: '../dist',
      public: 'public',
      node_modules: 'node_modules',
      snapshot: 'public/999-SNAPSHOT',
      govuk: {
        elements: 'govuk_elements',
        template: 'govuk_elements/govuk'
      }
    },

    clean: {
      dist: {
        src: '<%= dirs.dist %>',
        options: {
          force: true
        }
      },
      public: '<%= dirs.public %>',
      stylesheets: '<%= dirs.snapshot %>/stylesheets'
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

    browserify: {
      options: {
        watch: true,
        browserifyOptions: {
         debug: true
        }
      },
      dev: {
        files: {
          '<%= dirs.snapshot %>/javascripts/application.min.js': ['javascripts/application.js']
        }
      },
      build: {
        options: {
          plugin: ['minifyify']
        },
        files: {
          '<%= dirs.public %>/javascripts/application.min.js': ['javascripts/application.js']
        }
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

    modernizr: {
      dev: {
        "devFile": '<%= dirs.node_modules %>/modernizr/dist/modernizr-build.js',
        outputFile: '<%= dirs.snapshot %>/javascripts/vendor/modernizr.js',
        extra: {
          shiv: true,
          cssclasses: true
        },
        extensibility: {
          teststyles: true,
          prefixes: true,
        }
      },
      dist: {
        devFile: '<%= dirs.node_modules %>/modernizr/dist/modernizr-build.js',
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
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= dirs.govuk.template %>/public/images',
          src: ['**/*'],
          dest: '<%= dirs.dist %>/images'
        }, {
          expand: true,
          cwd: '<%= dirs.public %>',
          src: ['**/*', '!**/*.map'],
          dest: '<%= dirs.dist %>/'
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
          'test/test-main.js',
          '!node_modules/**'
        ],
        tasks: ['test']
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

    compress: {
      main: {
        options: {
          archive: 'dist/<%= pkg.name %>-999-SNAPSHOT.zip',
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= dirs.dist %>',
          src: '**'
        }]
      }
    }
  });

  grunt.registerTask('version', 'Bumps the package.json version for publishing to npm', function() {
    var version = grunt.option('release');

    if (version && version !== '999-SNAPSHOT') {
      var dist = grunt.config.get('dirs.dist'),
          packageFile = grunt.file.read('package-build.json');

      packageFile = grunt.template.process(packageFile, {data: {'version': version}});

      grunt.file.write(dist + '/package.json', packageFile);
      grunt.log.ok('Version bumped to ' + version);
      grunt.log.ok('Wrote file to ' + dist + '/package.json');
    }
    else {
      grunt.log.error("No package.json needs to be written");
    }
  });

  grunt.registerTask('dev', ['default']);

  grunt.registerTask('default', [
    'clean',
    'sass:dev',
    'test',
    'copy:dev',
    'modernizr:dev',
    'browserify:dev',
    'express',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass:build',
    'cssmin',
    'browserify:build',
    'test',
    'modernizr:dist',
    'copy:build',
    'version',
    'compress'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);
};
