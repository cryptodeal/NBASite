const { saveArticle, verifyToken, deleteArticle } = require('../../utils/mongoose');

exports.contentPostArticle = (req, res) => {
  const {authToken} = req.cookies
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      const {id, updatedArticle} = req.body;
      //console.log(verifiedJwt)
      console.log(`article id to modify: ${JSON.stringify(id)}`)
      saveArticle(id, updatedArticle).then(article => {
        if(!article){
          console.log('Post already exists')
          res.status(409)
          res.send('Post already exists');
        } else{
          console.log(`Post stored to databased successfully: ${article}`)
          res.status(201)
          res.send(`Post stored to databased successfully: ${article}`)
        }
      }).catch(err => {
        console.log(err)
        res.status(500)
        res.send(err)
      })
    }
  })
}

exports.contentDelArticle = async (req, res) => {
  const {authToken} = req.cookies
	verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      //console.log(verifiedJwt)
      const {id} = req.body;
      console.log(`DELETE request received! ID: ${id}`)
      deleteArticle(id).then(deleted => {
        if(!deleted){
          console.log('cannot find post to delete')
          res.status(409)
          res.send('cannot find post to delete');
        } else {
          console.log(`Post deleted successfully: ${deleted}`)
          res.status(201)
          res.send(`Post deleted successfully: ${deleted}`);
        }
      }).catch(console.error)
    }
  })
}