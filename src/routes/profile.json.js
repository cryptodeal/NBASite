import { updateUser, verifyToken, createToken, getUserApps } from '../mongoose'

export function get(req, res) {
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      console.log(verifiedJwt)
      getUserApps(verifiedJwt.id).then(apps => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(apps));
      }).catch(console.error)
    }
  })
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
          //create new authToken w updated User Info
          createToken(updatedUser).then(token =>{
            const expireInOne = new Date()
            expireInOne.setHours(expireInOne.getHours() + 6)
            console.log('creating token...')
            res.statusCode = 201
            res.setHeader('Set-Cookie', `authToken=${token}; Expires=${expireInOne}; HttpOnly; SameSite=Strict; Path=/`)
            res.end()
          })
        }
      }).catch(err => {
        console.log(err)
        res.statusCode = 500
        res.end(JSON.stringify(err))
      })
    }
  })
}