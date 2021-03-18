const { createUser, createToken } = require('../../utils/mongoose');

exports.signUp = async (req, res) => {
  //REMOVE CONSOLE.LOG EMAIL AND PASSWORD BEFORE DEPLOYING TO PRODUCTION
  const {email, password, username} = req.body;
  console.log(email)
  console.log(password)
  console.log(username)
  createUser(email, username, password, function(err, user){
      if(err){
        console.log(err)
        res.status(500)
        res.send(err)
      }
      if(!user){
          console.log('user already exists')
          res.status(409)
          res.send('Error: user already exists')
      } else{
        createToken(user).then(token =>{
          const expireInOne = new Date()
          expireInOne.setHours(expireInOne.getHours() + 6)
          console.log('creating token...')
          res.status(201)
          res.setCookie('authToken', token, {
            expires: expireInOne,
            domain: 'localhost',
            path: '/',
            isSecure: false,
            httpOnly: true,
            sameSite: false,
          })
          res.end()
      })
      }
  })
}