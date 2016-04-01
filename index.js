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

const port = 9000;


export default const app = express()
log.add(log.transports.File, {filename: 'index.log'})
app.use(morgan('dev'))
.use(cookieparser())
.use(session({
  secret: 'aamazingsecretthatkeepseverythingsafe',
  resave: false
}))
.set('view engine','jade')
.set('views',__dirname+'/views')
.use(sass({
   src: __dirname + '/sass',
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

export const server = http.createServer(apps).listen(port);
server.on('listening',()=> { "server is listening on "+port+" ☺"; });
process.on('SIGINT',()=>{
  console.log("SIGINT received.")
  process.exit(0)
})

