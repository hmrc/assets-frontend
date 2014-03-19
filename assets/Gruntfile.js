var path = require("path");
module.exports = function (grunt) {
    // Displays the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //destination directories
        dirs: {
            public: "public/",
            temp: ".tmp"
        },
        express: {
            server: {
                options: {
                    port: 3002,
                    server: path.resolve(__dirname, '../server.js'),
                    bases: path.resolve(__dirname, 'assets')
                }
            }
        },
        uglify: {

                js: {
                    src: '<%= dirs.temp%>/concat/app.js',
                    dest: '<%= dirs.temp%>/minified/app.min.js'
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
                dest: '<%= dirs.temp%>/concat/app.js'
            },
            jquery: {
                //concatenate jquery and all its plugins
                src: [
                    'javascripts/vendor/minified/jquery.min.js',
                    'javascripts/plugins/jquery/minified/jquery.validate.min.js',
                    'javascripts/plugins/jquery/minified/*.js'
                ],
                dest: '<%= dirs.temp%>/minified/jquery-combined.min.js'
            },
            //combine all scripts and copy to distribution folder
            combineAll: {
                src: ['javascripts/vendor/minified/json3.min.js', '<%= dirs.temp%>/minified/jquery-combined.min.js', '<%= dirs.temp%>/minified/app.min.js'],
                dest: '<%= dirs.public%>javascripts/application.min.js'
            }

        },
        clean: {
            build: ['<%= target%>dist'],
            tmp: ['<%= dirs.temp%>'],
            stylesheets: ['stylesheets']
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: '<%= dirs.temp%>/css',
                    ext: '.css'
                }]
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'stylesheets',
                    ext: '.css'
                }]

            }
        },
        copy: {
            renameCSStoMin: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.temp%>/css',
                        src: ['**/*.css'],
                        dest: '<%= dirs.public%>/stylesheets/',
                        rename: function(dest, src) {
                            return dest + src.replace(/\.css$/, ".min.css");
                        }
                    }
                ]
            },
            copyModernizr: {
                expand: true,
                src: ['javascripts/vendor/modernizr.js'],
                dest: '<%= dirs.public%>/'
            },
            copyImagesFromToolkit: {
                 expand: true,
                 cwd:'govuk_frontend_toolkit/images',
                 src: ['**/*.png','**/*.gif'],
                 dest: 'images',
            },
            copyImagestoDist: {
               expand: true,
               cwd:'images',
               src: ['**/*.png','**/*.gif'],
               dest: '<%= dirs.public%>/images',
            }
        },
        watch: {
            jshint: {
                files: ['**/*.js', '!node_modules/**'],
                tasks: ['jshint']
            },
            test: {
                files: ['test/specs/**/*.js'],
                tasks: ['karma:continuous']
            },
            compileCSS: {
                files: ['**/*.scss'],
                tasks: ['clean:stylesheets', 'sass:dev']
            }
        },
        // JsHint your javascript
        jshint: {
            all: ['javascripts/*.js', '!javascripts/stageprompt.2.0.1.js', '!javascripts/modernizr.js', '!javascripts/base64v1_0.js', '!javascripts/mdtpdf.js', '!javascripts/require.conf.js', '!javascripts/plugins/*.js', '!javascripts/vendor/**/*.js', '!javascripts/old_application.js'],
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true,
                force: true
            }
        },
        karma: {
          options: {
            configFile: 'test/config/karma.conf.js'//,
            //background: true
          },
          continuous: {
            singleRun: true,
            browsers: ['PhantomJS']
          }
        },
        zipup: {
            QA: {
                appName: '<%= pkg.name %>',
                version: '<%= pkg.version %>',
                addGitCommitId: true,
                files: [
                    {
                        cwd: 'public/', src: '**', expand: true
                    }
                ],
                outDir: 'dist/QA/',
                suffix: 'zip',
                template: '{{appName}}_v_{{version}}_BUILD_<%= grunt.task.current.args[0] %>.{{suffix}}'
            },
            RELEASE: {
                appName: '<%= pkg.name %>',
                version: '<%= pkg.version %>',
                addGitCommitId: true,
                files: [
                    {
                        cwd: 'public/', src: '**', expand: true
                    }
                ],
                outDir: 'dist/RELEASE/<%= pkg.version %>',
                suffix: 'zip',
                template: '{{appName}}_{{version}}.{{suffix}}'

            }

        }


    });
    // will read the dependencies/devDependencies/peerDependencies in your package.json
    // and load grunt tasks that match the provided patterns.
    // Loading the different plugins
    require('load-grunt-tasks')(grunt);


    // Default task(s).
    grunt.registerTask('default', [ 'express', 'jshint', 'sass:dev', 'watch']);
    grunt.registerTask('build', ['jshint', 'test', 'concatenate', 'sass:dist','copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'zipup']) ;
    // build task which requires a build number from the jenkins job
    grunt.registerTask('buildQA', function (build_number) {
        if(build_number == null) {
            grunt.warn("Build number must be specified");
        }
        console.log(build_number);
        grunt.task.run('test', 'concatenate', 'sass:dist','copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'zipup:QA:' + build_number);

    });
    grunt.registerTask('test', ['karma:continuous']);
    grunt.registerTask('concatenate', ['clean:tmp', 'concat:single', 'concat:jquery', 'minify', 'concat:combineAll']);
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('copyMinCSS', ['copy:renameCSStoMin']);



};
