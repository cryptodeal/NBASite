const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coach = new Schema ({
  _id: {type: Number, require: true},
  //replaces firstName and lastName with name.first and name.last
  name: {
    first: {type: String, require: true, index: true},
    last: {type: String, require: true, index: true},
    full: {type: String, require: true, index: true}
  },
  seasons: [{
    season: {type: String, require: true, index: true},
    team: {type: String, ref: 'Team', index: true}
  }]
})

module.exports = mongoose.models.Coach || mongoose.model('Coach', Coach)

