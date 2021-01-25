const {listArticles, initArticle, verifyToken} = require('../../../utils/mongoose');

exports.adminGetArticles = (req, res) => {
  listArticles().then(articles => {
    let content = articles.map(article => ({ 
			title: article.title,
			slug: article.slug
    }));
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
		res.send(content);
  }).catch(console.error)
}

exports.adminPostArticles = (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
      }
    else {
      //console.log(verifiedJwt)
      const {title} = req.body;
      console.log(`initializing article: ${title}`)
      initArticle(title).then(article =>{
        let content = {
          slug: article.slug,
          title: article.title
        }
        res.status(200)
        res.writeHeader('Content-Type', 'application/json')
        res.send(content);
      }).catch(console.error)
    }
  })
}