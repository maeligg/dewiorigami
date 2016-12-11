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

        postcss: {
            options: {
                map: true, // inline sourcemaps

                // or
                map: {
                  inline: false, // save all sourcemaps as separate files...
                  annotation: 'css/main.postcss.map' // ...to the specified directory
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
              src: 'css/main.css'
            }
        },

        watch: {
            scripts: {
                files: ['js/main.js'],
                tasks: ['uglify'],
            },
            images: {
                files: ['img/dev/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['sass'],
            },
            postcss: {
                files: ['sass/*.scss'],
                tasks: ['postcss'],
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'imagemin', 'sass', 'postcss', 'watch']);

};