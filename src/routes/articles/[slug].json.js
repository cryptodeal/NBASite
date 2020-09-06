// posts from './_posts.js';
import { findArticle } from '../../mongoose'

export function get(req, res, next) {
	const { slug } = req.params;
  console.log(`fetching article...`);
  findArticle(slug).then(article => {
    if(article){
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(article))
    } else {
      res.writeHead(404, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        message: `Not found`
      }));
    }
  }).catch(console.error)
}