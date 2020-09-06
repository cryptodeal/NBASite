import { updateUser, listUsers, verifyToken } from '../../mongoose'

export function get(req, res) {
	listUsers().then(users => {
    res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(users));
  }).catch(console.error)
}

export function post(req, res){
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      console.log(verifiedJwt)
      console.log(`User ID to modify: ${JSON.stringify(req.body.id)}`)
      updateUser(req.body.id, req.body.updated).then(updatedUser => {
        if(!updatedUser){
          console.log('User could not be updated')
          res.statusCode = 409
          res.end();
        } else{
          console.log(`User updated successfully: ${updatedUser}`)
          res.statusCode = 201
          res.end()
        }
      }).catch(err => {
        console.log(err)
        res.statusCode = 500
        res.end(JSON.stringify(err))
      })
    }
  })
}