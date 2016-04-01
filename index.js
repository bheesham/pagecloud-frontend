import http         from 'http'
import path         from 'path'
import assert       from 'assert'

import express      from 'express'
import session      from 'express-session'
import cookieparser from 'cookie-parser'
import morgan       from 'morgan'
import log          from 'winston'
import sass         from 'node-sass-middleware'
import browserify   from 'browserify-middleware'

const port = process.env.PORT|| 9000;


export const app = express();

log.add(log.transports.File, {filename: 'index.log'})

browserify.settings({
  ignoreMissing: false,
  detectGlobals: true,
  insertGlobals: true,
  transform: [ ["babelify",{sourceMaps:true, presets:["es2015","stage-2"]}] ],
  cache: true,
  precompile: true,
  minify: false,
  mangle: false,
  warnings: true,
  compress: true,
  debug: true,
  gzip: true,
  run: true,
  external: [ 'jquery', 'plotly.js' ]
})

const libs_bundle = Array.prototype.concat([{[__dirname+'/app/libs.js']: {run:true}}],browserify.settings.external)

app.use(morgan('dev'))
.use(cookieparser())
.use(session({
  secret: 'aamazingsecretthatkeepseverythingsafe',
  resave: false,
   saveUninitialized: true,
}))
.set('view engine','jade')
.set('views',__dirname+'/views')
.use(sass({
   src: __dirname + '/style',
   dest: __dirname + '/static',
   response: true,
   debug: false,
   outputStyle: 'compressed',
   sourceComments: false,
   sourceMap: 'static/sourcemap',
   sourceMapEmbed: true,
   error: () => {
      console.log("error with sass middleware")
   }
}))
.get('/js/libs.js',browserify(libs_bundle,{cache:'20 minutes'}))
.use('/js',browserify(path.join(__dirname,"app"),{run:true}))
.get('/',(req,res,next)=>res.render('index'))


export const server = http.createServer(app).listen(port);
server.on('listening',()=> { console.log("server is listening on "+port+" ☺"); });
process.on('SIGINT',()=>{
  console.log("SIGINT received.")
  process.exit(0)
})

