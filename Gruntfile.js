
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
          { 'build/server.js':'server.js' },
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
          script: 'build/server.js'
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
            src: ['*.scss']
          }
        ]
      }
    },

    clean: {
      build: ['build']
    },

    webpack: {
      build: {
        entry: 'app/libs.js',
        output: {
          path: 'build/',
          filename: 'libs.js',
          stats: {
            colors: true,
            modules: true,
            reasons: true,
          },
          failOnError: true
        },
      }
    }
  })

  grunt.registerTask('build',['clean:build','sass:build','babel:build'])
  grunt.registerTask('serve',['express'])
  grunt.registerTask('default',['build','serve'])
}
