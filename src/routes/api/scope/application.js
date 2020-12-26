import { verifyToken, submitScopeApp, updateScopeApp } from './../../../mongoose'

export function post(req, res){
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      console.log(verifiedJwt)
      console.log(`Saving scope application to database: \n${req.body.app} `)
      //This if statement is causing errors when attempting to update or create a new application
      if(req.body.app._id !== undefined){
        req.body.app.state = 'pending review'
        updateScopeApp(req.body.app).then(savedApp => {
          if(!savedApp){
            console.log('Could not save application')
            res.statusCode = 409
            res.end(JSON.stringify({
              message: `Could not save app`
            }));
          } else{
            console.log(`Application updated successfully: ${savedApp}`)
            res.statusCode = 201
            res.end(JSON.stringify({
                message: `Application updated successfully`
            }));
          }
        }).catch(console.error)
      } else {
        submitScopeApp(req.body.app).then(savedApp => {
          if(!savedApp){
            console.log('Could not save application')
            res.statusCode = 409
            res.end(JSON.stringify({
              message: `Could not save app`
            }));
          } else{
            console.log(`Application stored to database successfully: ${savedApp}`)
            res.statusCode = 201
            res.end(JSON.stringify({
                message: `Application saved successfully`
            }));
          }
        }).catch(console.error)
    }
    }
  })
}