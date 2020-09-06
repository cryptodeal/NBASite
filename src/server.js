import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import mongoSanitize from 'express-mongo-sanitize'
const { json } = require('body-parser');
const fileUpload = require('express-fileupload');
const secureRandom = require('secure-random');
import { routerVerify } from './mongoose'

export let signingKey = secureRandom(256, {type: 'Buffer'});

import { guard } from '@beyonk/sapper-rbac'
import routes from './config/routes.js'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    cookieParser(),
    json(),
    mongoSanitize(),
    fileUpload(),

    (req, res, next) => {
      const token = req.cookies['authToken']
      //const profile = token ? routerVerify(token) : false
      const profile = token ? jwt.decode(token) : false
      //console.log(profile)
      const options = {
        routes,
        deny: () => {
          res.writeHead(302, { Location: '/' })
          return res.end()
        },
        grant: () => {
          return sapper.middleware({
            session: () => {
              return {
                authenticated: !!profile,
                profile
              }
            }
          })(req, res, next)
        }
      }
      return guard(req.path, profile, options)
    }
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
