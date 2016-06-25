module.exports = function(grunt) {

    'use strict';

    // 자동으로 grunt 태스크를 로드합니다. grunt.loadNpmTasks 를 생략한다.
    require('load-grunt-tasks')(grunt);

    // 작업시간 표시
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' ======================================================================== \n' +
        ' * Project   : <%= pkg.name %>(<%= pkg.description %>) v<%= pkg.version %>\n' +
        ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Publisher : <%= pkg.make.publisher %> (<%= pkg.make.email %>), (<%= pkg.make.blog %>)\n' +
        ' * Build     : <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * License   : <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
        ' ======================================================================== \n' +
        ' */\n',

        // css task

        scsslint: {
            options: {
                bundleExec: true,
                config: 'scss/.scss-lint.yml',
                reporterOutput: null
            },
            core: {
                src: ['scss/*.scss', '!scss/_normalize.scss']
            }
        },

        autoprefixer: {
             options: {
                browsers: [
                    'Android 2.3',
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24', // Firefox 24 is the latest ESR
                    'Explorer >= 8',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6'
                ]
            },
            dist: { // app -> dest 이동
                src: 'dist/css/<%= pkg.name %>.css',
            }
        },
        
        csscomb: {
            options: {
                config: 'grunt/.csscomb.json'
            },
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/'
            }
        },

        cssmin: {
            options: {
                // compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            dist: {
                src: 'dist/css/<%= pkg.name %>.css',
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },
        
        // javascript task
        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            grunt: {
                options: {
                    jshintrc: 'grunt/.jshintrc'
                },
                src: ['Gruntfile.js', 'package.js', 'grunt/*.js']
            },
            dist: {
                src: 'js/*.js'
            }
        },

        concat: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: [
                    'js/modal.js',
                    'js/transition.js',
                    'js/alert.js',
                    'js/button.js',
                    'js/carousel.js',
                    'js/collapse.js',
                    'js/dropdown.js',
                    'js/tooltip.js',
                    'js/popover.js',
                    'js/scrollspy.js',
                    'js/tab.js',
                    'js/affix.js'
                ],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: /^!|@preserve|@license|@cc_on/i
            },
            dist: {
                src: 'dist/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        // others task

        copy: {
            docs: {
                expand: true,
                cwd: 'dist/',
                src: [
                    '**/*'
                ],
                dest: 'docs/dist/'
            }
        },

        // watch task
        watch: {
            options: {livereload: true},
            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['newer:jshint:grunt']
            },
            scss: {
                files: ['scss/**/*.scss'],
                tasks: ['scss','csslint','autoprefixer','csscomb','concat']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: ['newer:jshint:dist','concat','uglify']
            },
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // keepalive: true,
                    base: 'dist',
                    open: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>/category1/page-02.html'
                }
            }
        },

    });


    
    // server
    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect', 'watch']);
        }
        grunt.task.run([
            'default', 
            'connect', 
            'watch'
        ]);
    });

    // css task
    grunt.registerTask('css', [
            // 'scsslint',
            'autoprefixer',
            'csscomb',
            'cssmin'
        ]
    );

    // javascript task
    grunt.registerTask('js', [
            'newer:jshint',
            'concat',
            'uglify'
        ]
    );

    grunt.registerTask('default', [
            'js',
            'concurrent'
        ]
    );

};
