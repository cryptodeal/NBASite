const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const Category = new Schema ({
  name: { type: String, required: true, index: true, unique: true},
});

Category.plugin(URLSlugs('name', {field: 'key'}));
module.exports = mongoose.models.Category || mongoose.model('Category', Category)
