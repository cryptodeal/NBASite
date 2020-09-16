//import posts from './_posts.js';
import { listArticles } from '../../mongoose'

export function get(req, res) {
  listArticles().then(response => {
    console.log(response)
    let content = JSON.stringify(response.docs.map(article => ({ 
			title: article.title,
      slug: article.slug,
      author: article.author,
      date: article.publishedDate,
      brief: article.content.brief,
      categories: article.categories
    })));
    res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(content);
  }).catch(console.error)
}