const { verifyToken, listCategories, addCategory, updateCat } = require('../../utils/mongoose');

exports.adminGetCat = (req, res) => {
	listCategories().then(categories => {
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
		res.send(categories);
  }).catch(console.error)
}

exports.adminPostCat = (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      } else {
      //console.log(verifiedJwt)
      //console.log(`category id to modify: ${JSON.stringify(req.body.id)}`)
      const {id, updated} = req.body;
      if(id){
        updateCat(id, updated).then(updatedCat => {
          if(!updatedCat){
            console.log('category could not be updated')
            res.status(409)
            res.send('category could not be updated');
          } else{
            console.log(`category updated successfully: ${updatedCat}`)
            res.status(201)
            res.send(`category updated successfully: ${updatedCat}`)
          }
        }).catch(err => {
          console.log(err)
          res.status(500)
          res.send(err)
        })
      } else {
        const {name} = req.body;
        addCategory(name).then(category => {
          if(!category){
            console.log('Category already exists')
            res.status(409)
            res.send(`Category already exists`);
          } else{
            console.log(`Category stored to database successfully: ${category}`)
            res.status(201)
            res.send(`Category stored to database successfully: ${category}`)
          }
        }).catch(console.error)
      }
    }
  })
}
