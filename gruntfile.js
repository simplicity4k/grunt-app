'use strict';

var path = require('path');

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist'],
            tmp: ['.tmp'],
            all: [
                'coverage/**/*',
                'coverage',
                '.tmp',
                'dist',
                'node_modules',
                'src/public/bower_components'
            ]
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            build: [
                'gruntfile.js',
                'src/server.js',
                'src/route/**/*.js',
                'src/public/js/**/*.js',
                'test/**/*.js'
            ]
        },

        express: {
            dev: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: [path.resolve('src', 'src/public')],
                    server: path.resolve('src/server.js'),
                    debug: true,
                    livereload: true
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:<%= express.dev.options.port%>'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            conf: {
                files: ['gruntfile.js'],
                tasks: ['jshint'],
                options: {
                    reload: true
                }
            },
            jade: {
                files: ['src/view/**/*.jade']
            },
            css: {
                files: ['src/public/css/**/*.css']
            },
            js: {
                files: ['src/server.js', 'src/public/js/**/*.js'],
                tasks: ['jshint']
            },
            karma: {
                files: ['test/unit/**/*_test.js'],
                tasks: ['karma']
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            },
            dev: {
                singleRun: false
            },
            dist: {
                background: false,
                singleRun: true
            }
        },

        protractor: {
            options: {
                keepAlive: false,
                configFile: 'protractor.conf.js',
                args: {}
            },
            run: {}
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/*.js'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/route/*'],
                        dest: 'dist/route/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/view/*'],
                        dest: 'dist/view/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/public/favicon.ico'],
                        dest: 'dist/public/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/view/template/layout.jade'],
                        dest: 'dist/view/template/'
                    }
                ]
            }
        },

        useminPrepare: {
            html: ['src/view/template/layout.jade'],
            options: {
                root: 'src/public',
                assetsDirs: ['dist']
            }
        },

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> \n*/\n',
                preserveComments: false
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> \n*/\n',
                keepSpecialComments: 0
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    'dist/public/css/*.css',
                    'dist/public/js/*.js'
                ]
            }
        },

        usemin: {
            html: ['dist/view/template/layout.jade'],
            options: {
                assetsDirs: ['dist'],
                blockReplacements: {
                    css: function (block) {
                        return 'link(rel=\'stylesheet\', href=\'' + grunt.filerev.summary['dist\\' + block.dest.replace(/\//g, '\\')].replace(/\\/g, '/').replace('dist/public', '') + '\')';
                    },
                    js: function (block) {
                        return 'script(src=\'' + grunt.filerev.summary['dist\\' + block.dest.replace(/\//g, '\\')].replace(/\\/g, '/').replace('dist/public', '') + '\')';
                    }
                }
            }
        }
    });

    grunt.registerTask('server', [
        'express:dev',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'clean:tmp'
    ]);

};
