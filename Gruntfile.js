module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'js/main.js',
                dest: 'js/main-min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/dev/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },


        watch: {

                    scripts: {
                        files: ['js/main.js'],
                        tasks: ['uglify'],
                        options: {
                            spawn: false,
                        },
                    },

                    images: {
                        files: ['img/dev/*.{png,jpg,gif}'],
                        tasks: ['imagemin'],
                        options: {
                            spawn: false,
                        },
                    },

                    css: {
                        files: ['sass/*.scss'],
                        tasks: ['sass'],
                        options: {
                            spawn: false,
                        }
                    }
                }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'imagemin', 'sass']);

};