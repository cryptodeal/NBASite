'use strict'
//CORE SERVER & MIDDLEWARE IMPORTS
const nanoexpress = require('nanoexpress');
const bodyParser = require('@nanoexpress/middleware-body-parser/cjs');
const fileUpload = require('express-fileupload');
const cors = require('cors');

//TODO - MIDDLEWARE:
//1 - mongoSanitize()

//ROUTE IMPORTS
const {login, logout} = require('./api/session');
const {signUp} = require('./api/signup');
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


const corsConfigured = cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

nanoexpress()
  .use(corsConfigured)
  .ws('/ws', async (req, res) => {
    console.log('Connecting...');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.on('connection', (ws) => {
      console.log('Connected');

      ws.on('message', (msg) => {
        // eslint-disable-next-line security-node/detect-crlf
        console.log('Message received', msg);
        ws.send(msg);
      });
      ws.on('close', (code, message) => {
        // eslint-disable-next-line security-node/detect-crlf
        console.log('Connection closed', { code, message });
      });
    });
    res.on('upgrade', () => {
      console.log('Connection upgrade');
    });
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

  //TODO ROUTES:

  // 1 - .post('/api/content/images/article-picture', contentPostArticlePic)
  // ENDPOINT WILL CHANGE, BUT WILL USE MULTIPLE UPLOAD HANDLERS DEPENDING
  // ON THE USE/CONTEXT OF THE IMAGE OR FILE IN QUESTION

  // 2 - WEBSOCKET PUB/SUB ROUTE FOR USERS TO GET REAL TIME NOTIFICATION UPDATES 
  // ENDPOINT WILL REQUIRE AUTHORIZATION UPON INITIAL WS CONNECTION
  // NEED TO VERIFY THAT USING WILDCARD WS (E.G. '/ws/api/:userID') DOES NOT INCREASE RESOURCE DRAIN

  // 3 - WEBRTC (FIND COOL USE CASE FOR THE P2P PROTOCOL???)



  .listen(8000)

