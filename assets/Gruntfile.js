var path = require("path");
module.exports = function (grunt) {
    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Loading the different plugins
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-replace');

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
            errorPages: "error_pages",
            tempErrorPages: ".tmp/temp_error_pages",
            govuk :{
                elements: "govuk_elements",
                template: "govuk_elements/govuk",
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
            },
            detailsPolyfill: {
                src: '<%= dirs.temp %>/javascripts/vendor/details.polyfill.js',
                dest: '<%= dirs.temp %>/minified/details.polyfill.min.js'

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
                dest: '<%= dirs.temp %>/concat/app.js'
            },
            jquery: {
                //concatenate jquery and all its plugins
                src: [
                    'javascripts/vendor/minified/jquery.min.js',
                    'javascripts/plugins/jquery/minified/jquery.validate.min.js',
                    'javascripts/plugins/jquery/minified/additional-methods.min.js',
                ],
                dest: '<%= dirs.temp %>/minified/jquery-combined.min.js'
            },
            govukJSwithAppJSDev: {

                    //combine govuk js with our application.js
                    src: [
                        '<%= dirs.temp %>/javascripts/govuk_application.js',
                        '<%= dirs.temp %>/javascripts/hmrc_application.js'
                    ],
                    dest: '<%= dirs.snapshot %>/javascripts/application.js'

            },
            govukJSwithAppJSProd: {

                    //combine govuk js with our application.js
                    src: [
                        '<%= dirs.temp %>/javascripts/govuk_application.js',
                        '<%= dirs.temp %>/javascripts/hmrc_application.js'
                    ],
                    dest: '<%= dirs.temp %>/javascripts/application.js'

            },
            combineAll: {
                //combine all scripts and copy to public folder
                src: [
                    'javascripts/vendor/minified/json3.min.js',
                    '<%= dirs.temp %>/minified/jquery-combined.min.js',
                    '<%= dirs.temp %>/minified/details.polyfill.min.js',
                    '<%= dirs.temp %>/minified/app.min.js'
                ],
                dest: '<%= dirs.public %>/javascripts/application.min.js'
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
            tmp: ['<%= dirs.temp %>'],
            sass_cache: ['.sass-cache'],
            stylesheets: ['<%= dirs.snapshot %>/stylesheets'],
            javascripts: ['<%= dirs.snapshot %>/javascripts'],
            tmpErrorPages: ['<%= dirs.tempErrorPages %>'],
            dest: ['<%= dirs.temp %>', '<%= dirs.tempErrorPages %>', '<%= dirs.dist %>', '<%= dirs.public %>', '<%= dirs.errorPages %>/assets'],
            govukElementsTemp: ['<%= dirs.public %>/stylesheets/elements']
        },
        sass: {
            govukElementsDev: {
                options: {
                    style: 'expanded',
                    sourcemap: true,
                    lineNumbers: true,
                    loadPath: ['<%= dirs.govuk.template %>/public/sass']
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
                    loadPath: ['<%= dirs.govuk.template %>/public/sass']
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
                    dest: '<%= dirs.snapshot %>/stylesheets',
                    ext: '.css'
                }]
            }
        },
        copy: {
            renameCSStoMin: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.temp %>/concat',
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
                files: [
                    {
                        expand: true,
                        cwd:'images',
                        src: ['**/*.png','**/*.gif'],
                        dest: '<%= dirs.public %>/<%= dirs.images %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.govuk.template %>/public/images/',
                        src: [
                        'gov.uk_logotype_crown*',
                        'open-government-licence*'
                        ],
                        filter: 'isFile',
                        dest: '<%= dirs.public %>/<%= dirs.images %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.govuk.template %>/public/stylesheets/images/',
                        src: [
                        'govuk-crest*',
                        'open-government-licence*'
                        ],
                        filter: 'isFile',
                        dest: '<%= dirs.public %>/<%= dirs.css %>/<%= dirs.images %>/'
                    }
                ]
            },
            copyImagestoSnapshot: {
                files: [
                    {
                        expand: true,
                        cwd:'images',
                        src: ['**/*.png','**/*.gif'],
                        dest: '<%= dirs.snapshot %>/<%= dirs.images %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.govuk.template %>/public/images/',
                        src: [
                        'gov.uk_logotype_crown*',
                        'open-government-licence*'
                        ],
                        filter: 'isFile',
                        dest: '<%= dirs.snapshot %>/<%= dirs.images %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.govuk.template %>/public/stylesheets/images/',
                        src: [
                        'govuk-crest*',
                        'open-government-licence*'
                        ],
                        filter: 'isFile',
                        dest: '<%= dirs.snapshot %>/<%= dirs.css %>/<%= dirs.images %>/'
                    }
                ]
            },
            copyGOVUKElementsJSandAppJS: {
                files: [
                    {
                        src: ['<%= dirs.govuk.elements %>/public/javascripts/application.js'],
                        dest: '<%= dirs.temp %>/javascripts/govuk_application.js',

                    },
                    {
                        src: ['<%= dirs.govuk.elements %>/public/javascripts/vendor/details.polyfill.js'],
                        dest: '<%= dirs.temp %>/javascripts/vendor/details.polyfill.js',

                    },
                    {
                        src: ['javascripts/application.js'],
                        dest: '<%= dirs.temp %>/javascripts/hmrc_application.js',

                    }
                ]
            },
            copyJavaScripttoSnapshot: {
                files: [
                    {
                        expand: true,
                        cwd:'javascripts',
                        src: ['**/*.js'],
                        dest: '<%= dirs.snapshot %>/javascripts/'
                    },
                    {
                        expand: true,
                        cwd:'<%= dirs.govuk.template %>/public/javascripts/',
                        src: ['**/*.js'],
                        dest: '<%= dirs.snapshot %>/javascripts/'
                    },
                    {
                        expand: true,
                        cwd:'<%= dirs.govuk.elements %>/public/javascripts/vendor/',
                        src: ['details.polyfill.js'],
                        dest: '<%= dirs.snapshot %>/javascripts/vendor/'
                    }
                ]
            },
            copyErrorPagesToSnapshot: {
                files: [
                    {
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
                    }
                ]
            },
            copyErrorPagesToDist: {
                files: [
                    {
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
                    }
                ]
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
        },
        replace: {
            build: {
                options: {
                  patterns: [
                    {
                      match: 'minify',
                      replacement: '.min'
                    }
                  ]
                },
                files: [
                  {expand: true, cwd: '<%= dirs.errorPages %>', flatten: true, src: ['*.html'], dest: '<%= dirs.tempErrorPages %>'}
                ]
            },
            dev: {
                options: {
                  patterns: [
                    {
                      match: 'minify',
                      replacement: ''
                    }
                  ]
                },
                files: [
                  {expand: true, cwd: '<%= dirs.errorPages %>', flatten: true, src: ['*.html'], dest: '<%= dirs.tempErrorPages %>'}
                ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [ 'clean:dest', 'express', 'jshint', 'replace:dev', 'copy:copyImagestoSnapshot', 'copy:copyJavaScripttoSnapshot', 'combineGOVUKJSwithAppJSDev', 'sass:govukElementsDev', 'sass:dev', 'copy:copyErrorPagesToSnapshot', 'watch']);
    //Build
    grunt.registerTask('build', ['clean:dest', 'jshint', 'test', 'combineGOVUKJSwithAppJSProd', 'concatenate', 'sass:govukElementsDist', 'sass:dist', 'cssmin:combineAllCSS', 'copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'clean:govukElementsTemp', 'replace:build', 'copy:copyErrorPagesToDist', 'zipup:build', 'clean:tmp', 'clean:sass_cache', 'clean:tmpErrorPages']);
    //Test
    grunt.registerTask('test', ['jshint','karma:continuous']);
    // Conatenate all Javascript
    grunt.registerTask('concatenate', ['concat:single', 'concat:jquery', 'minify', 'concat:combineAll']);
    //Obfuscate all Javascript
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('copyMinCSS', ['copy:renameCSStoMin']);
    // add GOVUK elements Javascript to application.js
    grunt.registerTask('combineGOVUKJSwithAppJSDev', ['copy:copyGOVUKElementsJSandAppJS', 'concat:govukJSwithAppJSDev']);
    grunt.registerTask('combineGOVUKJSwithAppJSProd', ['copy:copyGOVUKElementsJSandAppJS', 'concat:govukJSwithAppJSProd']);

};
