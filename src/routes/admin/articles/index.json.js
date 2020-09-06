import { listArticles, initArticle, verifyToken } from '../../../mongoose'

export function get(req, res) {
  listArticles().then(articles => {
    let content = JSON.stringify(articles.map(article => ({ 
			title: article.title,
			slug: article.slug
    })));
    res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(content);
  }).catch(console.error)
}

export function post(req, res) {
  verifyToken(req.cookies['authToken'], function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.statusCode = 401
      res.end()
      }
    else {
      console.log(verifiedJwt)
      console.log(`initializing article: ${req.body.title}`)
      initArticle(req.body.title).then(article =>{
        let content = JSON.stringify({
          slug: article.slug,
          title: article.title
        })
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(content);
      }).catch(console.error)
    }
  })
}