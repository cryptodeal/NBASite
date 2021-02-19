'use strict'
//CORE SERVER & MIDDLEWARE IMPORTS
const nanoexpress = require('nanoexpress');
const bodyParser = require('@nanoexpress/middleware-body-parser/cjs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookie = require('cookie');
const {verifyToken} = require('./utils/mongoose')


//TODO - MIDDLEWARE:
//1 - mongoSanitize()


//ROUTE IMPORTS
const {routerVerify} = require('./utils/mongoose')
const {login, logout} = require('./api/auth/session');
const {signUp} = require('./api/auth/signup');
const {loadArticles} = require ('./api/articles/index');
const {loadArticle} = require('./api/articles/:slug');
const {getProfile, postProfile} = require('./api/user/profile');
const {adminGetApps, adminPostApps} = require('./api/admin/apps');
const {adminGetCat, adminPostCat} = require('./api/admin/categories');
const {adminGetUsers, adminPostUsers} = require('./api/admin/users');
const {postScopeApp} = require('./api/user/scope/app');
const {contentPostArticle, contentDelArticle} = require('./api/content/articles');
const {adminGetArticles, adminPostArticles} = require('./api/admin/articles/index');
const {adminGetArticleSlug} = require('./api/admin/articles/edit/:slug');
const {contentPostPic} = require('./api/content/images/picture');
const {contentPostArticlePic} = require('./api/content/images/article-image');
const {getTicket} = require('./api/auth/ws/ticket')
const connections = {};

const corsConfigured = cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

nanoexpress()
  .use(corsConfigured)
  .ws('/ws', {idleTimeout: 30}, async (req, res) => {
    //console.log(req.headers)
    console.log('Connecting...');

    //JWT is now being sent, use that for initial verification
    const {authToken} = req.cookies;
    let verified = await routerVerify(authToken)
      res.on('connection', (ws) => {
        if(verified === false){
          ws.close()
        } else {
          console.log('Connected');
          //AFTER INITIAL CONNECTION, CREATE WS TICKET AND STORE TO REDIS

          //Using connections object to store ws connections for testing
          let ticket = `ThisIsATestTicket`
          ws.ticket = ticket
          connections[ticket] = ws
          //console.log(connections)
          ws.send(JSON.stringify({
            action: `auth`,
            ticket: ticket
          }))
          ws.on('message', (msg) => {
            console.log(ws) 
            let json = JSON.parse(msg)
            console.log(`Client message: ${json.message}`)

            //if(connections[json.ticket]){
              //ws.send(JSON.stringify({
              //  action: `receipt`,
              //  message: `Your data was received by the server`
              //}))
            //}else{ 
            //  ws.close()
            //}
            
            //ws.send(msg)
            ws.send(JSON.stringify({
              action: `receipt`,
              message: json.message
            }))
          });
          ws.on('close', (code, message) => {
            console.log('Connection closed', { code, message });
            delete connections[ticket]
            //console.log(connections)
          });
        }
      });

    //res.on('upgrade', () => {
    //  console.log('Connection upgrade');
    //});
  })
  .use(bodyParser({
    json: true,
    experimentalJsonParse: true
  }))
  .use(fileUpload())
  .post('/api/session', login)
  .del('/api/session', logout)
  .post('/api/signup', signUp)
  .get('/api/articles', loadArticles)
  .get('/api/articles/:slug', loadArticle)
  .get('/api/user/profile', getProfile)
  .post('/api/user/profile', postProfile)
  .get('/api/admin/apps', adminGetApps)
  .post('/api/admin/apps', adminPostApps)
  .get('/api/admin/categories', adminGetCat)
  .post('/api/admin/categories', adminPostCat)
  .get('/api/admin/users', adminGetUsers)
  .post('/api/admin/users', adminPostUsers)
  .post('/api/user/scope/app', postScopeApp)
  .post('/api/content/articles', contentPostArticle)
  .del('/api/content/articles', contentDelArticle)
  .get('/api/admin/articles', adminGetArticles)
  .post('/api/admin/articles', adminPostArticles)
  .get('/api/admin/articles/edit/:slug', adminGetArticleSlug)
  .post('/api/content/images/picture', contentPostPic)
  .get('/api/auth/ws', getTicket)

  //TODO ROUTES:

  // 1 - .post('/api/content/images/article-picture', contentPostArticlePic)
  // ENDPOINT WILL CHANGE, BUT WILL USE MULTIPLE UPLOAD HANDLERS DEPENDING
  // ON THE USE/CONTEXT OF THE IMAGE OR FILE IN QUESTION

  // 2 - WEBSOCKET PUB/SUB ROUTE FOR USERS TO GET REAL TIME NOTIFICATION UPDATES 
  // ENDPOINT WILL REQUIRE AUTHORIZATION UPON INITIAL WS CONNECTION
  // NEED TO VERIFY THAT USING WILDCARD WS (E.G. '/ws/api/:userID') DOES NOT INCREASE RESOURCE DRAIN

  // 3 - WEBRTC (FIND COOL USE CASE FOR THE P2P PROTOCOL???)



  .listen(8000)

