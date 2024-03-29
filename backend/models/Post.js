const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const Post = new Schema ({
  title: { type: String, required: true, index: true },
  state: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', required: true, index: true },
	author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, many: true }],
	publishedDate: { type: Date, index: true },
  content: {
		brief: { type: Object },
		extended: { type: Object },
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true, many: true }],
});

Post.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
})

Post.plugin(URLSlugs('title', {field: 'slug'}));
Post.plugin(mongoosePaginate);

module.exports = mongoose.models.Post || mongoose.model('Post', Post)
