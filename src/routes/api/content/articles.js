import { saveArticle, verifyToken, deleteArticle } from '../../../mongoose'

export function post(req, res){
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end(JSON.stringify(err))
      }
    else {
      console.log(verifiedJwt)
      console.log(`article id to modify: ${JSON.stringify(req.body.id)}`)
      saveArticle(req.body.id, req.body.article).then(article => {
        if(!article){
          console.log('Post already exists')
          res.statusCode = 409
          res.end(JSON.stringify({
              message: `Post already exists`
          }));
        } else{
          console.log(`Post stored to databased successfully: ${article}`)
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

export async function del(req, res) {
	verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end()
      }
    else {
      console.log(verifiedJwt)
      console.log(`DELETE request received! ID: ${req.body.id}`)
      deleteArticle(req.body.id).then(deleted => {
        if(!deleted){
          console.log('cannot find post to delete')
          res.statusCode = 409
          res.end(JSON.stringify({
              message: `no post to delete`
          }));
        } else {
          console.log(`Post deleted successfully: ${deleted}`)
          res.statusCode = 201
          res.end(JSON.stringify({
              message: `Post deleted successfully`
          }));
        }
      }).catch(console.error)
    }
  })
}