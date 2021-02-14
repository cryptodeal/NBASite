const { validateUser, createToken } = require('../../utils/mongoose');

exports.login = (req, res) => {
  const {email, pwd} = req.body
  console.log(`password: ${pwd}`)
  console.log(`email: ${email}`)
  validateUser(email, pwd, function(err, user){
    if (err){
      console.log(err)
      res.status(500)
      res.send(err)
    } else if (user) {
      createToken(user).then(token =>{
          const expireInOne = new Date()
          expireInOne.setHours(expireInOne.getHours() + 6)
          console.log('creating token...')
          console.log(`Token: ${token}`)
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
      }).catch(console.error)
    }
  })
};

exports.logout = (req, res) => {
  console.log(`trying to log out`)
  res.status(200)
  res.removeCookie('authToken', {
    domain: 'localhost',
    path: '/',
    isSecure: false,
    httpOnly: true,
    sameSite: false,
  })
  res.end()
}