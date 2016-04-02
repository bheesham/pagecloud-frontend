import http         from 'http'
import path         from 'path'
import assert       from 'assert'
import url          from 'url'

import express      from 'express'
import session      from 'express-session'
import cookieparser from 'cookie-parser'
import morgan       from 'morgan'
import log          from 'winston'
import proxy        from 'express-http-proxy'

const port = process.env.PORT|| 9000;
const basedir = __dirname+'/../..'

export const app = express();


log.add(log.transports.File, {filename: 'index.log'})


app.use(morgan('dev'))
.use(cookieparser())
.use(session({
  secret: 'aamazingsecretthatkeepseverythingsafe',
  resave: false,
   saveUninitialized: true,
}))
.set('view engine','jade')
.set('views',basedir+'/views')
.use('/tests',express.static(basedir+'/tests'))
.use('/js',express.static(basedir+'/build/app'))
.use('/webpack',express.static(basedir+'/build/webpack'))
.use('/style/',express.static(basedir+'/build/style'))
.use('/node_modules/bootstrap-sass',express.static(basedir+'/node_modules/bootstrap-sass'))
.use('/api',proxy('0.0.0.0:5000',{
  filter: (req,res)=>{return req.method =='GET'},
  forwardPath: (req,res)=>{return url.parse(req.url).path}
}))
.get('/',(req,res,next)=>res.render('index'))


export const server = http.createServer(app).listen(port);
server.on('listening',()=> { console.log("server is listening on "+port+" ☺"); });
process.on('SIGINT',()=>{
  console.log("SIGINT received.")
  process.exit(0)
})

