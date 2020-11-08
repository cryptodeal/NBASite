import { validateUser, createToken } from '../../mongoose'

//implement server side form validation

export function post(req, res){
//REMOVE CONSOLE.LOG EMAIL AND PASSWORD BEFORE DEPLOYING TO PRODUCTION
  console.log(`email: ${req.body.email}`)
  console.log(`password ${req.body.password}`)
  let email = req.body.email
  let pwd = req.body.pwd
  validateUser(req.body.email, req.body.password, function(err, user){
    if (err){
      console.log(err)
      res.statusCode = 500
      res.end()
    } else if (user) {
      createToken(user).then(token =>{
          const expireInOne = new Date()
          expireInOne.setHours(expireInOne.getHours() + 6)
          console.log('creating token...')
          console.log(`Token: ${token}`)
          res.statusCode = 201
          res.setHeader('Set-Cookie', `authToken=${token}; Expires=${expireInOne}; HttpOnly; SameSite=Strict; Path=/`)
          res.end()
      }).catch(console.error)
    } else {
      res.statusCode = 401
        res.end()
    }
  })
    
}
//Logout by expiring auth cookie
export function del(req, res){
  res.statusCode = 200
  res.setHeader('Set-Cookie', `authToken=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict; Path=/`)
  res.end()
}
