const { updateUser, listUsers, verifyToken } = require('../../utils/mongoose')

exports.adminGetUsers = (req, res) => {
	listUsers().then(users => {
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
		res.send(users);
  }).catch(console.error)
}

exports.adminPostUsers = (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      const {id, updated} = req.body
      //console.log(verifiedJwt)
      console.log(`User ID to modify: ${id}`)
      updateUser(id, updated).then(updatedUser => {
        if(!updatedUser){
          console.log('User could not be updated')
          res.status(409)
          res.send('User could not be updated');
        } else{
          console.log(`User updated successfully: ${updatedUser}`)
          res.status(201)
          res.send(`User updated successfully: ${updatedUser}`)
        }
      }).catch(err => {
        console.log(err)
        res.status(500)
        res.send(err)
      })
    }
  })
}