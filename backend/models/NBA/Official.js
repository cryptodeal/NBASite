const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Official = new Schema ({
  _id: {type: String, require: true},
  name: {
    first: {type: String, require: true},
    last: {type: String, require: true, index: true}
  }
})

module.exports = mongoose.models.Official || mongoose.model('Official', Official)

