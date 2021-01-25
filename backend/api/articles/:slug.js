const { findArticle } = require('../../utils/mongoose');

exports.loadArticle = async (req, res) => {
  const { slug } = req.params;
  console.log(`fetching article...`);
  findArticle(slug).then(article => {
    if(article){
      res.status(200)
      res.writeHeader('Content-Type', 'application/json')
      res.send(article)
    } else {
      res.status(404)
      res.writeHeader('Content-Type', 'application/json')
      res.send('Article not found')
    }
  }).catch(console.error)
}