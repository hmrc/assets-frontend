var path = require('path');
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
            public: 'public',
            temp: '.tmp',
            dist: 'dist',
            snapshot: 'public/999-SNAPSHOT',
            sass: 'scss',
            css: 'stylesheets',
            images: 'images',
            errorPages: 'error_pages',
            bower: 'bower_components',
            tempErrorPages: '.tmp/temp_error_pages',
            govuk :{
                elements: 'govuk_elements',
                template: 'govuk_elements/govuk',
                toolkit: 'govuk_frontend_toolkit'
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
                files: [{
                    expand: true,
                    cwd: '<%= dirs.temp %>/concat',
                    src: '*.js',
                    dest: '<%= dirs.temp %>/minified',
                    ext: '.min.js'
                }]
            },
            detailsPolyfill: {
                src: '<%= dirs.temp %>/javascripts/vendor/details.polyfill.js',
                dest: '<%= dirs.temp %>/minified/details.polyfill.min.js'
            },
            json3: {
                src: '<%= dirs.bower %>/json3/lib/json3.js',
                dest: '<%= dirs.temp %>/minified/json3.min.js'
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
                    '<%= dirs.temp %>/javascripts/application.js'
                ],
                dest: '<%= dirs.temp %>/concat/app.js',
                nonull: true
            },
            jquery: {
                //concatenate jquery and all its plugins
                src: [
                    '<%= dirs.bower %>/jquery/jquery.js',
                    '<%= dirs.bower %>/jquery-validation/jquery.validate.js',
                    '<%= dirs.bower %>/jquery-validation/additional-methods.js',
                ],
                dest: '<%= dirs.temp %>/concat/jquery-combined.js',
                nonull: true
            },
            govukJSwithAppJSDev: {
                //combine govuk js with our application.js
                src: [
                    '<%= dirs.temp %>/javascripts/govuk_application.js',
                    '<%= dirs.temp %>/javascripts/hmrc_application.js'
                ],
                dest: '<%= dirs.temp %>/javascripts/application.js',
                nonull: true
            },
            govukJSwithAppJSProd: {
                //combine govuk js with our application.js
                src: [
                    '<%= dirs.temp %>/javascripts/govuk_application.js',
                    '<%= dirs.temp %>/javascripts/hmrc_application.js'
                ],
                dest: '<%= dirs.temp %>/javascripts/application.js',
                nonull: true
            },
            combineAll: {
                //combine all scripts and copy to public folder
                src: '<%= dirs.temp %>/minified/{json3,jquery-combined,details.polyfill,app}.min.js',
                dest: '<%= dirs.public %>/javascripts/application.min.js',
                nonull: true
            }
        },
        cssmin: {
            combineAllCSS: {
                files: {
                    '<%= dirs.temp%>/concat/application.css': [
                        '<%= dirs.temp%>/css/elements/main.css',
                        '<%= dirs.temp%>/css/application.css'
                    ],
                    '<%= dirs.temp%>/concat/application-ie7.css': [
                        '<%= dirs.temp%>/css/elements/main-ie7.css',
                        '<%= dirs.temp%>/css/application-ie7.css'
                    ],
                    '<%= dirs.temp%>/concat/application-ie.css': [
                        '<%= dirs.temp%>/css/elements/main-ie8.css',
                        '<%= dirs.temp%>/css/application-ie.css'
                    ]
                }
            }
        },
        clean: {
            tmp: '<%= dirs.temp %>',
            sass_cache: '.sass-cache',
            stylesheets: '<%= dirs.snapshot %>/stylesheets',
            javascripts: '<%= dirs.snapshot %>/javascripts',
            tmpErrorPages: '<%= dirs.tempErrorPages %>',
            govukElementsTemp: '<%= dirs.public %>/stylesheets/elements',
            dest: [
                '<%= dirs.temp %>',
                '<%= dirs.tempErrorPages %>',
                '<%= dirs.dist %>',
                '<%= dirs.public %>',
                '<%= dirs.errorPages %>/assets'
            ]
        },
        sass: {
            govukElementsDev: {
                options: {
                    style: 'expanded',
                    sourcemap: true,
                    lineNumbers: true,
                    loadPath: '<%= dirs.govuk.template %>/public/sass'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.govuk.elements %>/public/sass',
                    src: ['main*.scss'],
                    dest: '<%= dirs.temp %>/css/elements',
                    ext: '.css'
                }]
            },
            govukElementsDist: {
                options: {
                    style: 'compressed',
                    loadPath: '<%= dirs.govuk.template %>/public/sass'
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
                    sourcemap: true,
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: '<%= dirs.temp %>/css',
                    ext: '.css'
                }]
            }
        },
        copy: {
            renameCSStoMinDist: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.temp %>/concat',
                    src: ['**/*.css'],
                    dest: '<%= dirs.public %>/stylesheets/',
                    rename: function(dest, src) {
                        return dest + src.replace(/\.css$/, '.min.css');
                    }
                }]
            },
            renameCSStoMinDev: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.temp %>/concat',
                    src: ['**/*.css'],
                    dest: '<%= dirs.snapshot %>/stylesheets/',
                    rename: function(dest, src) {
                        return dest + src.replace(/\.css$/, '.min.css');
                    }
                }]
            },
            copyImagestoSnapshot: {
                files: [{
                    expand: true,
                    cwd:'<%= dirs.govuk.template %>/public/images/',
                    src: ['**/*.png','**/*.gif'],
                    dest: '<%= dirs.snapshot %>/<%= dirs.images %>/'
                }]
            },
            copyImagestoPublic: {
                files: [{
                    expand: true,
                    cwd:'<%= dirs.govuk.template %>/public/images/',
                    src: ['**/*.png','**/*.gif'],
                    dest: '<%= dirs.public %>/<%= dirs.images %>/'
                }]
            },
            copyGOVUKElementsJSandAppJS: {
                files: [{
                    src: '<%= dirs.govuk.elements %>/public/javascripts/application.js',
                    dest: '<%= dirs.temp %>/javascripts/govuk_application.js'
                },
                {
                    src: '<%= dirs.govuk.elements %>/public/javascripts/vendor/details.polyfill.js',
                    dest: '<%= dirs.temp %>/javascripts/vendor/details.polyfill.js'
                },
                {
                    src: 'javascripts/application.js',
                    dest: '<%= dirs.temp %>/javascripts/hmrc_application.js'
                }]
            },
            modernizrDev: {
                files: [{
                    src: '<%= dirs.bower %>/modernizr/modernizr.js',
                    dest: '<%= dirs.snapshot %>/javascripts/vendor/modernizr.js'
                }]
            },
            copyErrorPagesToSnapshot: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.tempErrorPages %>',
                    src: ['*.html'],
                    filter: 'isFile',
                    dest: '<%= dirs.snapshot %>'
                },
                {
                    expand: true,
                    cwd: '<%= dirs.govuk.template %>/public/stylesheets/',
                    src: ['govuk-template*', 'fonts*'],
                    filter: 'isFile',
                    dest: '<%= dirs.snapshot %>/<%= dirs.css %>/'
                }]
            },
            copyErrorPagesToDist: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.tempErrorPages %>',
                    src: ['*.html'],
                    filter: 'isFile',
                    dest: '<%= dirs.public %>'
                },
                {
                    expand: true,
                    cwd: '<%= dirs.govuk.template %>/public/stylesheets/',
                    src: ['govuk-template*', 'fonts*'],
                    filter: 'isFile',
                    dest: '<%= dirs.public %>/<%= dirs.css %>/'
                }]
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
                tasks: ['clean:stylesheets', 'sass:govukElementsDev', 'sass:dev']
            },
            updateJS: {
                files: ['javascripts/**/*.js'],
                tasks: ['requirejs', 'copy:modernizrDev']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },
        modernizr: {
            dist: {
                devFile : 'javascripts/vendor/modernizr.js',
                outputFile : '<%= dirs.public %>/javascripts/vendor/modernizr.js',
                extra : {
                    shiv : true,
                    cssclasses : true
                },
                extensibility : {
                    teststyles : true,
                    prefixes : true,
                }
            }
        },
        jshint: {
            all: [
                'javascripts/**/*.js',
                '!javascripts/base64v1_0.js',
                '!javascripts/mdtpdf.js',
                '!javascripts/vendor/**/*.*',
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
        },
        replace: {
            build: {
                options: {
                    patterns: [{
                        match: 'minify',
                        replacement: '.min'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.errorPages %>',
                    flatten: true,
                    src: ['*.html'],
                    dest: '<%= dirs.tempErrorPages %>'
                }]
            },
            dev: {
                options: {
                    patterns: [{
                        match: 'minify',
                        replacement: ''
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.errorPages %>',
                    flatten: true,
                    src: ['*.html'],
                    dest: '<%= dirs.tempErrorPages %>'
                }]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= dirs.bower %>',
                    copy: false
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'javascripts',
                    paths: {
                        'json3': '../<%= dirs.bower %>/json3/lib/json3',
                        'jquery': '../<%= dirs.bower %>/jquery/jquery',
                        'jquery.validate': '../<%= dirs.bower %>/jquery-validation/jquery.validate',
                        'jquery.validate.additional-methods': '../<%= dirs.bower %>/jquery-validation/additional-methods',
                        'details.polyfill': '../<%= dirs.govuk.elements %>/public/javascripts/vendor/details.polyfill',
                        'stageprompt': '../<%= dirs.bower %>/stageprompt/script/stageprompt',
                        'govuk-elements': '../<%= dirs.govuk.elements %>/govuk/public/javascripts/govuk-template',
                        'base64': 'base64v1_0',
                        'mdtpdf': 'mdtpdf'
                    },
                    shim: {
                        'jquery.validate': ['jquery'],
                        'jquery.validate.additional-methods': ['jquery']
                    },
                    include: [
                        'json3',
                        'details.polyfill',
                        'base64',
                        'mdtpdf',
                        'govuk-elements',
                        'modules/fingerprint',
                        'application'
                    ],
                    name: '../<%= dirs.bower %>/almond/almond',
                    out: '<%= dirs.snapshot %>/javascripts/application.min.js',
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                    optimize: 'none',
                    // uglify2: {
                    //     mangle: false
                    // },
                    // wrap: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
        'clean:dest',
        'express',
        'bower:install',
        'jshint',
        'replace:dev',
        'copy:copyImagestoSnapshot',
        'requirejs',
        'copy:modernizrDev',
        'combineGOVUKJSwithAppJSDev',
        'sass:govukElementsDev',
        'sass:dev',
        'cssmin:combineAllCSS',
        'copy:renameCSStoMinDev',
        'copy:copyErrorPagesToSnapshot',
        'watch'
    ]);

    //Build
    grunt.registerTask('build', [
        'clean:dest',
        'bower:install',
        // 'test',
        'copy:copyImagestoPublic',
        'combineGOVUKJSwithAppJSProd',
        'concatenate',
        'sass:govukElementsDist',
        'sass:dist',
        'cssmin:combineAllCSS',
        'copy:renameCSStoMinDist',
        'modernizr:dist',
        'clean:govukElementsTemp',
        'replace:build',
        'copy:copyErrorPagesToDist',
        'zipup:build',
        'clean:tmp',
        'clean:sass_cache',
        'clean:tmpErrorPages'
    ]);

    //Test
    grunt.registerTask('test', ['jshint', 'karma:continuous']);
    // Conatenate all Javascript
    grunt.registerTask('concatenate', ['concat:single', 'concat:jquery', 'uglify', 'concat:combineAll']);
    // add GOVUK elements Javascript to application.js
    grunt.registerTask('combineGOVUKJSwithAppJSDev', ['copy:copyGOVUKElementsJSandAppJS', 'concat:govukJSwithAppJSDev']);
    grunt.registerTask('combineGOVUKJSwithAppJSProd', ['copy:copyGOVUKElementsJSandAppJS', 'concat:govukJSwithAppJSProd']);
};
