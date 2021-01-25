const {addCategory, verifyToken, listCategories} = require('../../utils/mongoose');

exports.contentGetCat = (req, res) => {
	listCategories().then(categories => {
    let content = categories.map(category => ({ 
			value: category._id,
			label: category.name
    }));
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
		res.send(content);
  }).catch(console.error)
}

exports.contentPostCat = async (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
    } else {
      //console.log(verifiedJwt)
      const {name} = req.body;
      console.log(`POST request received! Category Name: ${name}`)
      addCategory(name).then(category => {
        if(!category){
          console.log('Category already exists')
          res.status(409)
          res.send('Category already exists');
        } else{
          console.log(`Category stored to database successfully: ${category}`)
          res.status(201)
          res.send(`Category stored to database successfully: ${category}`);
        }
      }).catch(console.error)
    }
  })
}

