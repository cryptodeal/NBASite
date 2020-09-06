import { createUser, createToken } from '../../mongoose'

export async function post(req, res){
//REMOVE CONSOLE.LOG EMAIL AND PASSWORD BEFORE DEPLOYING TO PRODUCTION
  console.log(req.body.email)
  console.log(req.body.password)
  createUser(req.body.email, req.body.password, function(err, user){
      if(err){
        console.log(err)
        res.statusCode = 500
          res.end()
      }
      if(!user){
          console.log('user already exists')
          res.statusCode = 409
          res.end()
      } else{
        createToken(user).then(token =>{
          const expireInOne = new Date()
          expireInOne.setHours(expireInOne.getHours() + 6)
          console.log('creating token...')
          res.statusCode = 401
          //res.setHeader('Set-Cookie', `authToken=${token}; Expires=${expireInOne}; HttpOnly; Path=/`)
          res.end()
      })
      }
  })
}
