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
            temp: ".tmp",
            dist: "dist"
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
            build: ['<%= dirs.dist%>'],
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
            release: {
                appName: '<%= pkg.name %>',
                version: '<%= pkg.version %>',
                addGitCommitId: true,
                files: [
                    {
                        cwd: 'public/', src: '**', expand: true
                    }
                ],
                outDir: '<%= dirs.dist%>',
                suffix: 'zip',
                template: '{{appName}}-999-SNAPSHOT.{{suffix}}.md5'
            }

        },
        hash: {
            options: {
                hashLength: 12,
                hashFunction: function(source, encoding){ // default is md5
                    return require('crypto').createHash('sha1').update(source, encoding).digest('hex');
                }
            },
            release: {
                src: '<%= dirs.temp%>/zipped/assets-frontend.zip',
                dest: 'dist/'
            }
        }


    });
    // will read the dependencies/devDependencies/peerDependencies in your package.json
    // and load grunt tasks that match the provided patterns.
    // Loading the different plugins
    require('load-grunt-tasks')(grunt);


    // Default task(s).
    grunt.registerTask('default', [ 'express', 'jshint', 'sass:dev', 'watch']);
    grunt.registerTask('build', ['clean', 'jshint', 'test', 'concatenate', 'sass:dist','copyMinCSS', 'copy:copyImagestoDist', 'copy:copyModernizr', 'zipup:release']) ;
    grunt.registerTask('test', ['karma:continuous']);
    grunt.registerTask('concatenate', ['clean:tmp', 'concat:single', 'concat:jquery', 'minify', 'concat:combineAll']);
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('copyMinCSS', ['copy:renameCSStoMin']);



};
