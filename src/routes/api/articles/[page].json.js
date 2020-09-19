//import posts from './_posts.js';
import { listArticles2 } from './../../../mongoose'

export function get(req, res) {
  const { page } = req.params;
  listArticles2(page).then(response => {
    console.log(response)
    let content = JSON.stringify(response.docs.map(article => ({ 
			title: article.title,
      slug: article.slug,
      author: article.author,
      date: article.publishedDate,
      brief: article.content.brief,
      categories: article.categories
    })));
    console.log(content)
    res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(content);
  }).catch(console.error)
}