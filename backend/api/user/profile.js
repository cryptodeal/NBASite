const {verifyToken, getUserApps, updateUser, createToken} = require('../../utils/mongoose');

exports.getProfile = (req, res) => {
  console.log(`trying to get user data`)
  const { authToken } = req.cookies;
  console.log(authToken)
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      console.log(verifiedJwt)
      getUserApps(verifiedJwt.id).then(apps => {
        res.status(200)
        res.writeHeader('Content-Type', 'application/json')
        res.send(apps);
      }).catch(console.error)
    }
  })
}

exports.postProfile = (req, res) => {
  const { authToken } = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      console.log(verifiedJwt)
      console.log(`User ID to modify: ${verifiedJwt.id}`)
      const {updated} = req.body;
      console.log(updated)
      updateUser(verifiedJwt.id, updated).then(updatedUser => {
        if(!updatedUser){
          console.log('User could not be updated')
          res.status(409)
          res.send(`User could not be updated`);
        } else{
          console.log(`User updated successfully: ${updatedUser}`)
          //create new authToken w updated User Info
          createToken(updatedUser).then(token =>{
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
      }).catch(err => {
        console.log(err)
        res.status(500)
        res.send(err)
      })
    }
  })
}