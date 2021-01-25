const { findArticle, listCategories, listContributors } = require('../../../../utils/mongoose');

exports.adminGetArticleSlug = async (req, res) => {
	const { slug } = req.params;
  console.log(`fetching article...`);
  let contributors = await listContributors().catch(console.error)
  let contFormatted = contributors.map(contributor => ({
    value: contributor._id,
    label: contributor.email
  }));
  let categories = await listCategories().catch(console.error)
  let catFormatted = categories.map(category => ({ 
    value: category._id,
    label: category.name
  }));
  let article = await findArticle(slug).catch(console.error)
  if(article.length){
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
    let content = {
      article: article,
      categories: catFormatted,
      contributors: contFormatted
    }
    res.send(content)
  } else {
    console.log(`Article with this slug could not be found`)
    res.status(404)
    res.send(`Article with this slug could not be found`)
  }
}