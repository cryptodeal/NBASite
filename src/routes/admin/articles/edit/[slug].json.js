// posts from './_posts.js';
import { findArticle, listCategories, listContributors } from '../../../../mongoose'

export async function get(req, res) {
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
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    let content = {
      article: article,
      categories: catFormatted,
      contributors: contFormatted
    }
    res.end(JSON.stringify(content))
  } else {
    console.log(`no article found!`)
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      message: `Not found`
    }));
  }
}