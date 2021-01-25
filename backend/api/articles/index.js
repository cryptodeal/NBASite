const { listArticles2 } = require('../../utils/mongoose');

exports.loadArticles = (req, res) => {
  //console.log(req)
  const { pg } = req.query;
  listArticles2(pg).then(response => {
    console.log(response)
    const content = response.docs.map(article => ({ 
			title: article.title,
      slug: article.slug,
      author: article.author,
      date: article.publishedDate,
      brief: article.content.brief,
      categories: article.categories
    }));
    //console.log(content)
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
    res.send(content);
  }).catch(console.error)
}