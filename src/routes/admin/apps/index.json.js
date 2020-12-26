import { verifyToken, listApps, saveAppReview, updateUserScope } from '../../../mongoose'

export function get(req, res) {
  //need to enable verifyToken on router level, but I suspect this is unnecessary since route guards are in place
  //removing this increases efficiency bc it halves the number of verifyTokens for this API call
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      listApps().then(apps => {
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
      req.body.updated.reviewedBy = verifiedJwt.id
        saveAppReview(req.body.id, req.body.updated).then(reviewedApp => {
          if(!reviewedApp){
            console.log('app could not be updated')
            res.statusCode = 409
            res.end();
          } else{
            console.log(`app review submitted; app updated successfully: ${reviewedApp}`)
            //update user w new permissions here if the reviewedApp is 'approved'
            if(reviewedApp.state === 'approved'){
              updateUserScope(reviewedApp.user, reviewedApp.scope).then(updatedUser => {
                console.log(`User permissions updated: ${updatedUser.scope}`)
                res.statusCode = 201
                res.end()
              })
            } else{
              res.statusCode = 201
              res.end()
            }
          }
        }).catch(err => {
          console.log(err)
          res.statusCode = 500
          res.end(JSON.stringify(err))
        })
    }
  })
}
