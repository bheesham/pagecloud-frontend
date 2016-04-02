
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    babel: {
      options: {
        // TODO: is this redundant or overriden by .babelrc (should be, not documented, check source in grunt-babel by sindre)
        sourceMap: true,
        presets: ['es2015','stage-2']
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            dest: 'build/app',
            src: ['*.js','*.es6','*.es']
          }
        ]
      }
    },
    express: {
      dev: {
        options: {
          port: 9000,
          script: 'build/app/server.js'
        }
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'style/',
            dest: 'build/style',
            src: ['*.scss'],
            ext: '.css'
          }
        ]
      }
    },

    clean: {
      build: ['build']
    },

    webpack: {
      options: {
        output: {
          path: 'build/webpack',
          stats: {
            colors: true,
            modules: true,
            reasons: true,
          },
          failOnError: true,
          keepalive: true,
          watch: true
        }
      },
      libs: {
        entry: './build/app/libs.js',
        output: {
          filename: 'libs.js',
        },
      },
      index: {
        entry: './build/app/index.js',
        output: {
          filename: 'index.js',
        },
      }
    },

    watch: {
      express: {
        files: [ 'server.js','app/**/*.js' ],
        tasks: ['babel:build','express'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.registerTask('buildjs',['babel:build','webpack:libs','webpack:index'])
  grunt.registerTask('build',['clean:build','buildjs','sass:build'])
  grunt.registerTask('serve',['express','watch'])
  grunt.registerTask('default',['build','serve'])
}
