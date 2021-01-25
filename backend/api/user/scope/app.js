const { verifyToken, submitScopeApp, updateScopeApp } = require('../../../utils/mongoose');

exports.postScopeApp = (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      //console.log(verifiedJwt)
      const {app} = req.body;
      console.log(`Saving scope application to database: \n${app} `)
      //This if statement is causing errors when attempting to update or create a new application
      if(app._id !== undefined){
        app.state = 'pending review'
        updateScopeApp(app).then(savedApp => {
          if(!savedApp){
            console.log('Could not save application')
            res.status(409)
            res.send(`Could not save app`);
          } else{
            console.log(`Application updated successfully: ${savedApp}`)
            res.status(201)
            res.send(`Application updated successfully: ${savedApp}`);
          }
        }).catch(console.error)
      } else {
        submitScopeApp(req.body.app).then(savedApp => {
          if(!savedApp){
            console.log('Could not save application')
            res.status(409)
            res.send(`Could not save app`);
          } else{
            console.log(`Application stored to database successfully: ${savedApp}`)
            res.status(201)
            res.send(`Application stored to database successfully: ${savedApp}`);
          }
        }).catch(console.error)
    }
    }
  })
}