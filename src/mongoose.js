import mongoose from 'mongoose'
require('dotenv').config();
import User from '@models/User';
import Post from '@models/Post';
import Category from '@models/Category'
import ScopeApp from '@models/ScopeApplication'
import { signingKey } from './server'
import jwt from 'jsonwebtoken'

mongoose.connect(process.env.MONGOOSE_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

//async function to check if email exists, then create user in mongodb.
export async function createUser(email, username, password, cb) {
  let emailCheck = await User.exists({ email: email })
  let usernameCheck = await User.exists({ username: username})
  if (emailCheck == false && usernameCheck == false){
    console.log(`inside createUser function email: ${email} and password: ${password}`)
    let user = new User ({
      email: email,
      username: username,
      password: password
    })
    user.save(function(err, userDoc) {
      if (err) return cb(err);
      return cb(null, userDoc);
    });
  } else {
    cb(null, null)
  }
}

export async function validateUser(email, password, cb) {
  let user = await User.findOne({email: email})
  if(!user){
    return cb(null, null)
  }
  user.comparePassword(password, async function(err, isMatch){
    if(err) return cb(err)
    if(!isMatch){
      return cb(null)
    } else {
      let result = await User.findOne({ email: email })
      return cb(null, result);
    }
  })
}

export async function createToken(user){
  let claims = {
    email:  user.email,
    username: user.username,
    //hard coding scope until admin panel allows scope to be set
    scope: [ 'admin' ],
    id: user._id,
    iss: 'http://127.0.0.1:3000/'
  }
  let token = await jwt.sign(claims, signingKey, { expiresIn: '1h' });
  return token;
}

export function verifyToken(token, cb){
  jwt.verify(token, signingKey, function(err, decoded) {
    if(err) return cb(err)
    return cb(null, decoded)
  });
}

export function routerVerify(token){
  return jwt.verify(token, signingKey, (err, verifiedJwt) => {
    if(err){
      return false
    }else{
      return verifiedJwt
    }
  })
}

export async function saveArticle(id, body){
  let result = await Post.exists(id)
  if (result == false ){
    //console.log(`inside savePost! title: ${title}, content extended: ${extended}, authors: ${author[0].value}, state: ${state}, date published: ${publishedDate}`)
    let authors = [];
    let categories = []
    if(body.author !== undefined){
      body.author.map(auth => authors.push(auth.value))
    }
    body.author = authors
    if(body.categories !== undefined){
      body.categories.map(cat => categories.push(cat.value))
    }
    body.categories = categories
    let article = new Post (body)
    return article.save()
  } else {
    let authors = [];
    let categories = [];
    if(body.author !== undefined){
      body.author.map(auth => authors.push(auth.value))
    }
    body.author = authors
    if(body.categories !== undefined){
      body.categories.map(cat => categories.push(cat.value))
    }
    body.categories = categories
    //console.log(`inside savePost! title: ${title}, content extended: ${extended}, authors: ${JSON.stringify(author)}`)
    return Post.findByIdAndUpdate(id, {$set: body}, {new: true}).exec()
  }
}

export function initArticle(title){
  let post = new Post({
    title: title,
    content: {
      extended: ''
    }
  })
  return post.save()
}

export function deleteArticle(id){
  return Post.findByIdAndDelete({_id: id})
}

export function listArticles(){
  return Post.find({}).exec()
}

export function listArticles2(page){
  return Post.paginate({}, {page: page, populate: 'categories author', sort: '-publishedDate', limit: 4})
}

export function listContributors(){
  return User.find().select('email').lean().exec();
}

export function findArticle(slug){
  return Post.find({slug: slug}).populate('author categories').exec();
}

export function listCategories(){
  return Category.find({}).exec()
}

export async function addCategory(name){
  let result = await Category.exists({ name: name })
  if (result == false ){
    //console.log(`inside savePost! title: ${title}, content extended: ${extended}, authors: ${author[0].value}, state: ${state}, date published: ${publishedDate}`)
    let category = new Category({
      name: name
    })
    return category.save()
  } else {
    return null
  }
}

export function listUsers(){
  return User.find({}).exec()
}

export function updateUser(id, updated) {
  return User.findByIdAndUpdate(id, {$set: updated}, {new: true}).exec()
}

export function updateCat(id, updated) {
  return Category.findByIdAndUpdate(id, {$set: updated}, {new: true}).exec()
}

//Functions related to User Applications (user side)
export async function submitScopeApp(application) {
  console.log(application)
  //this check needs to be made smarter. Needs to verify the user isn't already the state they're requesting (can also prevent client side)
  let result = await ScopeApp.exists({ user: application.user, scope: application.scope, state: 'pending review' })
  if (result == false ){
    let scopeApp = new ScopeApp(application)
    return scopeApp.save()
  } else {
    return null
  }
}

export function getUserApps(id) {
  return ScopeApp.find({ user: id }).exec()
}

//Functions related to User Applications (admin side)
export function listApps() {
  return ScopeApp.find({state: 'pending review'}).populate('user').sort('dateSubmitted').exec()
}

export function saveAppReview(id, feedback){
  console.log(feedback)
  return ScopeApp.findByIdAndUpdate(id, {$set: feedback}, {new: true}).exec()
}