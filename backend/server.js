'use strict'
//CORE SERVER & MIDDLEWARE IMPORTS
const nanoexpress = require('nanoexpress');
const bodyParser = require('@nanoexpress/middleware-body-parser/cjs');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookie = require('cookie');
const {verifyToken} = require('./utils/mongoose')
const connections = {};


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
const {getDistinctPlayers} = require('./api/data/shots/distinct')
const {getAllShotsByPlayer} = require('./api/data/shots/:slug')

const corsConfigured = cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

const server = nanoexpress()
  server.use(corsConfigured)
  server.ws('/ws', {idleTimeout: 30}, async (req, res) => {
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
          let ticket = `ThisIsATestTicket`;
          ws.subscribe('test');
          ws.ticket = ticket;
          connections[ticket] = ws;
          //console.log(connections)
          server.publish('test', JSON.stringify({
            action: `pubsubtest`,
            ticket: 'testing the pub sub features of nanoexpress/uws'
          }))
          //ws.send(JSON.stringify({
          //  action: `auth`,
          //  ticket: ticket
          //}))
          ws.on('message', (msg) => {
            console.log(ws) 
            let json = JSON.parse(msg)
            console.log(`Client message: ${json.message}`)

            //HERE YOU SHOULD CHECK REDIS FOR THE TICKET (ENSURE TICKET EXISTS)
            //if(ws.ticket !== ticket){
              //ws.close()
            //}

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
  server.use(bodyParser({
    json: true,
    experimentalJsonParse: true
  }))
  server.use(fileUpload())
  server.post('/api/session', login)
  server.del('/api/session', logout)
  server.post('/api/signup', signUp)
  server.get('/api/articles', loadArticles)
  server.get('/api/articles/:slug', loadArticle)
  server.get('/api/user/profile', getProfile)
  server.post('/api/user/profile', postProfile)
  server.get('/api/admin/apps', adminGetApps)
  server.post('/api/admin/apps', adminPostApps)
  server.get('/api/admin/categories', adminGetCat)
  server.post('/api/admin/categories', adminPostCat)
  server.get('/api/admin/users', adminGetUsers)
  server.post('/api/admin/users', adminPostUsers)
  server.post('/api/user/scope/app', postScopeApp)
  server.post('/api/content/articles', contentPostArticle)
  server.del('/api/content/articles', contentDelArticle)
  server.get('/api/admin/articles', adminGetArticles)
  server.post('/api/admin/articles', adminPostArticles)
  server.get('/api/admin/articles/edit/:slug', adminGetArticleSlug)
  server.post('/api/content/images/picture', contentPostPic)
  server.get('/api/auth/ws', getTicket)
  server.get('/api/data/shots/distinct/players', getDistinctPlayers)
  server.get('/api/data/shots/:slug', getAllShotsByPlayer)

  //TODO ROUTES:

  // 1 - .post('/api/content/images/article-picture', contentPostArticlePic)
  // ENDPOINT WILL CHANGE, BUT WILL USE MULTIPLE UPLOAD HANDLERS DEPENDING
  // ON THE USE/CONTEXT OF THE IMAGE OR FILE IN QUESTION

  // 2 - WEBSOCKET PUB/SUB ROUTE FOR USERS TO GET REAL TIME NOTIFICATION UPDATES 
  // ENDPOINT WILL REQUIRE AUTHORIZATION UPON INITIAL WS CONNECTION
  // NEED TO VERIFY THAT USING WILDCARD WS (E.G. '/ws/api/:userID') DOES NOT INCREASE RESOURCE DRAIN

  // 3 - WEBRTC (FIND COOL USE CASE FOR THE P2P PROTOCOL???)



  server.listen(8000)

