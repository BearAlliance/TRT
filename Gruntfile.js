module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {}
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/index.html': 'index.html',     // 'destination': 'source'
          'build/views/repair.html': 'views/repair.html',
          'build/views/fit.html': 'views/fit.html',
          'build/views/rental.html': 'views/rental.html',
          'build/views/modals.html': 'views/modals.html',
          'build/views/nav.html': 'views/nav.html',

          //  css
          'build/css/custom.css': 'css/custom.css'
        }
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['img/*'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['fonts/*'], dest: 'build/', filter: 'isFile'},
          {expand: false, src: ['favicon.ico'], dest: 'build/'}

          // includes files within path and its sub-directories
          //{expand: true, src: ['path/**'], dest: 'dest/'},

          // makes all src relative to cwd
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}

          // flattens results to a single level
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ]
      }
    },
    clean: ["build/"],
    serve: {
      'path': 'index.html'
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          onCreateServer: function(server, connect, options) {
            var io = require('socket.io').listen(server);
            io.sockets.on('connection', function(socket) {
              // do something with socket
            });
          }
        }
      }
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['copy']
      },
      scripts: {
        files: ['**/*.js'],
        tasks: ['copy'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['**/*.html'],
        tasks: ['copy'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['**.*.css'],
        tasks: ['copy'],
        options: {

        }
      }
    },
    open : {
      dev : {
        path: 'http://localhost:9000/index.html',
        app: 'Google Chrome'
      },
      build : {
        path : 'localhost:9000/build/index.html',
        app: 'Google Chrome'
      },
      file : {
        path : '/etc/hosts'
      },
      custom: {
        path : function () {
          return grunt.option('path');
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //html minification
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  //copy
  grunt.loadNpmTasks('grunt-contrib-copy');

  //clean
  grunt.loadNpmTasks('grunt-contrib-clean');

  //watch
  grunt.loadNpmTasks('grunt-contrib-watch');

  //serve
  grunt.loadNpmTasks('grunt-serve');

  //open
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'htmlmin', 'copy']);

  // Build
  grunt.registerTask('build', ['clean', 'htmlmin', 'copy']);

  // Server
  grunt.registerTask('server', ['open:dev', 'serve']);

};