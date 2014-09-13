
module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('bower.json'),

    target_dir: 'dist',
    demo_dir: 'demo',

    clean: [
      '<%= target_dir %>/<%= demo_dir %>',
      'bower_components/',
    ],

    copy: {
      // copy content of src/html, including subdirectories
      html: {
        files: [
          {
            expand: true,
            cwd: './src/html/',
            src: '**',
            dest: '<%= target_dir %>/<%= demo_dir %>/',
          },
        ],
      },
      css: {
        files: [
          {
            expand: true,
            cwd: './src/css/',
            src: '**',
            dest: '<%= target_dir %>/<%= demo_dir %>/css/',
          },
        ],
      },
      js: {
        files: [
          {
            expand: true,
            cwd: './src/js/',
            src: 'init.js',
            dest: '<%= target_dir %>/<%= demo_dir %>/js/',
          },
        ],
      },
    },

    uglify: {
      'scroll.to.top': {
        files: {
          '<%= target_dir %>/<%= pkg.name %>.js': 'src/js/<%= pkg.name %>.js',
        },
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          footer: '\n',
        },
      },
    },

    bowerful: {
      dist: {
        packages: {
          jquery: '2.1.x',
          'normalize-css': '3.0.x',
        },
        store: 'bower_components',
        dest: '<%= target_dir %>/<%= demo_dir %>' + '/lib/',
        destfile: 'bower',
      },
    },

    // serve content of target dir on http://localhost:8000/
    // includes watching for changes
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8000,
          open: {
            target: 'http://localhost:8000/demo/'
          },
          base: '<%= target_dir %>',
          livereload: 35729, // default
        },
      },
    },

    // watch files for changes, works w/ connect
    watch: {
      options: {
        livereload: 35729, // default
      },
      bower: {
        files: ['bower.json'],
        tasks: ['uglify'],
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['bowerful', 'uglify'],
      },
      html: {
        files: ['./src/html/**/*.html'],
        tasks: ['copy:html'],
      },
      css: {
        files: ['./src/css/**/*.css'],
        tasks: ['copy:css'],
      },
      js: {
        files: ['./src/js/**/*.js'],
        tasks: ['copy:js', 'uglify:scroll.to.top'],
      },
    },

  });

  [
    'grunt-bowerful',
    'grunt-contrib-clean',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-contrib-uglify',
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('build', [
    'copy:html',
    'copy:css',
    'copy:js',
    'uglify:scroll.to.top',
    'bowerful',
  ]);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);
};
