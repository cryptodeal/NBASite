import { verifyToken, listApps  } from '../../../mongoose'

export function get(req, res) {
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
      //console.log(`category id to modify: ${JSON.stringify(req.body.id)}`)
      if(req.body.id){
        updateCat(req.body.id, req.body.updated).then(updatedCat => {
          if(!updatedCat){
            console.log('category could not be updated')
            res.statusCode = 409
            res.end();
          } else{
            console.log(`category updated successfully: ${updatedCat}`)
            res.statusCode = 201
            res.end()
          }
        }).catch(err => {
          console.log(err)
          res.statusCode = 500
          res.end(JSON.stringify(err))
        })
      } else {
        addCategory(req.body.name).then(category => {
          if(!category){
            console.log('Category already exists')
            res.statusCode = 409
            res.end(JSON.stringify({
              message: `Category already exists`
            }));
          } else{
            console.log(`Category stored to database successfully: ${category}`)
            res.statusCode = 201
            res.end(JSON.stringify({
                message: `Category saved successfully`
            }));
          }
        }).catch(console.error)
      }
    }
  })
}
