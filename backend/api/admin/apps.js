const { verifyToken, listApps, saveAppReview, updateUserScope } = require('../../utils/mongoose');

exports.adminGetApps = (req, res) => {
  //need to enable verifyToken on router level, but I suspect this is unnecessary since route guards are in place
  //removing this increases efficiency bc it halves the number of verifyTokens for this API call
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      listApps().then(apps => {
        res.status(200)
        res.writeHeader('Content-Type', 'application/json')
        res.send(apps);
      }).catch(console.error)
    }
  })
}

exports.adminPostApps = (req, res) => {
  console.log(`made it to admin post apps`)
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      console.log(`successfully verified authToken`)
      const {updated, id} = req.body
      console.log()
      updated.reviewedBy = verifiedJwt.id
        saveAppReview(id, updated).then(reviewedApp => {
          if(!reviewedApp){
            console.log('app could not be located')
            res.status(409)
            res.send('app could not be located');
          } else{
            console.log(`app review submitted; app updated successfully: ${reviewedApp}`)
            //update user w new permissions here if the reviewedApp is 'approved'
            if(reviewedApp.state === 'approved'){
              updateUserScope(reviewedApp.user, reviewedApp.scope).then(updatedUser => {
                console.log(`User permissions updated: ${updatedUser.scope}`)
                res.status(201)
                res.send(`User permissions updated: ${updatedUser.scope}`)
              })
            } else{
              res.status(201)
              res.send(`User app updated: ${reviewedApp}`)
            }
          }
        }).catch(err => {
          console.log(err)
          res.status(500)
          res.send(err)
        })
    }
  })
}
