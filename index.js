require('babel/register');

import http from 'http'
import path from 'path'
import assert from 'assert'

import express from 'express'
import session from 'express-session'
import cookieparser from 'cookie-parser'
import morgan from 'morgan'
import log from 'winston'
import sass from 'node-sass-middleware'
import browserify from 'browserify-middleware'

const port = 9000;



