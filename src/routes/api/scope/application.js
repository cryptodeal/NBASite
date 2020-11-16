import { verifyToken, submitScopeApp } from './../../../mongoose'

export function post(req, res){
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      console.log(verifiedJwt)
      console.log(`Saving scope application to database: \n${req.body.application} `)
      //NOT CURRENTLY WORKING, ALWAYS RETURNS 'APPLICATION COULD NOT BE SAVED' 
      //REVIEW USING REGISTER FOR EXAMPLE
      submitScopeApp(req.body.application).then(savedApp => {
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
  })
}