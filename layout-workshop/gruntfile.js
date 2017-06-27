module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: 'sass/*.scss',
                tasks: ['sass']
            },
            options: {
                livereload: true,
            }
        },
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/main.scss'
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};
