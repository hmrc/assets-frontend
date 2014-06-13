var path = require("path");
module.exports = function (grunt) {
    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Loading the different plugins
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //destination directories
        dirs: {
            public: "public",
            temp: ".tmp",
            dist: "dist",
            snapshot: "public/999-SNAPSHOT",
            sass: "scss",
            css: "stylesheets",
            images: "images",
            govuk :{
                elements: "govuk_elements",
                toolkit: "govuk_frontend_toolkit"
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
        uglify: {
            js: {
                src: '<%= dirs.temp %>/concat/app.js',
                dest: '<%= dirs.temp %>/minified/app.min.js'
            }
        },
        concat: {
            single: {
                options: {
                    //wrap each concatenated file in an Immediately invoke function expression (IIFE)
                    banner: ';(function ($, window, document) { \n"use strict";\n var GOVUK = GOVUK || {};\n',
                    footer: '\n})(jQuery, window, document);'
                },
                src: [
                    'javascripts/base64v1_0.js',
                    'javascripts/mdtpdf.js',
                    'javascripts/modules/*.js',
                    'javascripts/application.js'
                ],
                dest: '<%= dirs.temp %>/concat/app.js'
            },
            jquery: {
                //concatenate jquery and all its plugins
                src: [
                    'javascripts/vendor/minified/jquery.min.js',
                    'javascripts/plugins/jquery/minified/jquery.validate.min.js',
                    'javascripts/plugins/jquery/minified/*.js'
                ],
                dest: '<%= dirs.temp %>/minified/jquery-combined.min.js'
            },
            combineAll: {
                //combine all scripts and copy to public folder
                src: [
                    'javascripts/vendor/minified/json3.min.js',
                    '<%= dirs.temp %>/minified/jquery-combined.min.js',
                    '<%= dirs.temp %>/minified/app.min.js'
                ],
                dest: '<%= dirs.public %>/javascripts/application.min.js'
            }
        },
        cssmin: {
            combineAllCSS: {
                files: {
                    '<%= dirs.temp%>/concat/application.css': [
                        '<%= dirs.temp%>/css/elements/main.css'
                    ],
                    '<%= dirs.temp%>/concat/application-ie7.css': [
                        '<%= dirs.temp%>/css/elements/main-ie7.css'
                    ],
                    '<%= dirs.temp%>/concat/application-ie.css': [
                        '<%= dirs.temp%>/css/elements/main-ie8.css'
                    ]
                }

            }
        },
        clean: {
            tmp: ['<%= dirs.temp %>'],
            sass_cache: ['.sass-cache'],
            stylesheets: ['<%= dirs.snapshot %>/stylesheets'],
            javascripts: ['<%= dirs.snapshot %>/javascripts'],
            dest: ['<%= dirs.temp %>', '<%= dirs.dist %>', '<%= dirs.public %>'],
        },
        sass: {
            govukElementsDev: {
                options: {
                    style: 'compressed',
                    loadPath: ['<%= dirs.govuk.elements %>/govuk/public/sass']
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.govuk.elements %>/public/sass',
                    src: ['main*.scss'],
                    dest: '<%= dirs.snapshot %>/<%= dirs.css %>/elements',
                    ext: '.css'
                }]
            },
            govukElementsDist: {
                options: {
                    style: 'compressed',
                    loadPath: ['<%= dirs.govuk.elements %>/govuk/public/sass']
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.govuk.elements %>/public/sass',
                    src: ['main*.scss'],
                    dest: '<%= dirs.temp %>/css/elements',
                    ext: '.css'
                }]

            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: '<%= dirs.temp %>/css',
                    ext: '.css'
                }]
            },
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: '<%= dirs.snapshot %>/stylesheets',
                    ext: '.css'
                }]
            }
        },
        copy: {
            renameCSStoMin: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.temp %>/css',
                    src: ['**/*.css'],
                    dest: '<%= dirs.public %>/stylesheets/',
                    rename: function(dest, src) {
                        return dest + src.replace(/\.css$/, ".min.css");
                    }
                }]
            },
            copyModernizr: {
                expand: true,
                src: ['javascripts/vendor/modernizr.js'],
                dest: '<%= dirs.public %>/'
            },
            copyImagesFromToolkit: {
                 expand: true,
                 cwd:'<%= dirs.govuk.toolkit %>/images',
                 src: ['**/*.png','**/*.gif'],
                 dest: 'images'
            },
            copyImagestoDist: {
               expand: true,
               cwd:'images',
               src: ['**/*.png','**/*.gif'],
               dest: '<%= dirs.public %>/images'
            },
            copyImagestoSnapshot: {
               expand: true,
               cwd:'images',
               src: ['**/*.png','**/*.gif'],
               dest: '<%= dirs.snapshot %>/images'
            },
            copyJavaScripttoSnapshot: {
               expand: true,
               cwd:'javascripts',
               src: ['**/*.js'],
               dest: '<%= dirs.snapshot %>/javascripts'
            }
        },
        watch: {
            jshint: {
                files: ['javascripts/**/*.js', '!node_modules/**'],
                tasks: ['jshint']
            },
            test: {
                files: ['test/specs/**/*.js'],
                tasks: ['karma:continuous']
            },
            compileCSS: {
                files: ['scss/**/*.scss'],
                tasks: ['clean:stylesheets', 'sass:dev']
            },
            updateJS: {
                files: ['javascripts/**/*.js'],
                tasks: ['clean:javascripts','copy:copyJavaScripttoSnapshot']
            }
        },
        // JsHint your javascript
        jshint: {
            all: [
                'javascripts/*.js',
                '!javascripts/stageprompt.2.0.1.js',
                '!javascripts/modernizr.js',
                '!javascripts/base64v1_0.js',
                '!javascripts/mdtpdf.js',
                '!javascripts/require.conf.js',
                '!javascripts/plugins/*.js',
                '!javascripts/vendor/**/*.js',
                '!javascripts/old_application.js'
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
        zipup: {
            build: {
                appName: '<%= pkg.name %>',
                version: '999',
                addGitCommitId: true,
                files: [{
                    cwd: 'public/',
                    src: '**',
                    expand: true
                }],
                outDir: '<%= dirs.dist %>',
                suffix: 'zip',
                template: '{{appName}}-{{version}}-SNAPSHOT.{{suffix}}'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [ 'clean:dest', 'express', 'jshint', 'copy:copyImagestoSnapshot', 'copy:copyJavaScripttoSnapshot', 'sass:govukElementsDev', 'sass:dev', 'watch']);
    grunt.registerTask('build', ['clean:dest', 'jshint', 'test', 'concatenate', 'sass:govukElementsDist', 'sass:dist', 'cssmin:combineAllCSS', 'copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'zipup:build', 'clean:tmp', 'clean:sass_cache']) ;
    grunt.registerTask('release', ['clean', 'jshint', 'test', 'concatenate', 'sass:dist','copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'copy:copyHealthCheck', 'zipup:release']) ;
    grunt.registerTask('test', ['karma:continuous']);
    grunt.registerTask('concatenate', ['clean:tmp', 'concat:single', 'concat:jquery', 'minify', 'concat:combineAll']);
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('copyMinCSS', ['copy:renameCSStoMin']);
};
