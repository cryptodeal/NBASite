//import posts from './_posts.js';
import { listArticles } from '../../mongoose'

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