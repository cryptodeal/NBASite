const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema ({
  _id: {type: Number, require: true},
  team: {type: String, ref: 'Team', index: true},
  meta: {
    isComplete: {type: Boolean, require: true, default: false},
    missingData: [{type: String, require: false}]
  },
  //possibly replace team with an array of objects, each containing a reference to the Team's _id + start/end date
  //enables lookup of all rosters player has been on incredibly quickly
  //replaces first_name and last_name with name.first and name.last
  name: {
    first: {type: String, require: true, index: true},
    last: {type: String, require: true, index: true},
    fullName: {type: String, require: true, index: true},
    downcaseName: {type: String, require: true, index: true},
  },
  slug: {type: String, require: true, index: true},
  birthdate: {type: Date, require: true},
  school: {type: String, require: true, index: true},
  country: {type: String, require: true},
  lastAffiliation: {type: String, require: true},
  height: {type: String, require: true},
  weight: {type: String, require: true},
  seasonExp: {type: Number, require: true, default: 0},
  jersey: {type: String, require: true},
  position: {type: String, require: true},
  rosterstatus: {type: String, require: true},
  playedCurrentSeason: {type: Boolean, require: false},
  PlayerCode: {type: String, require: true, index: true},
  fromYear: {type: Number, require: true},
  toYear: {type: Number, require: true},
  //dleagueFlag is a string 'N' or 'Y' from nba.com/stats -> transformed to boolean here bc string boolean is bad practice...
  dleagueFlag: {type: Boolean, require: true},
  //nbaFlag is a string 'N' or 'Y' from nba.com/stats -> transformed to boolean here bc string boolean is bad practice...
  nbaFlag: {type: Boolean, require: true},
  gamesPlayedFlag: {type: Boolean, require: true},
  draftYear: {type: String, require: true, index: true},
  draftRound: {type: String, require: true, index: true},
  draftNumber: {type: String, require: true, index: true},
  headlineStats: {
    //season is alias for nba stats 'timeframe'
    season: {type: String, require: false},
    pts: {type: Number, require: false},
    ast: {type: Number, require: false},
    reb: {type: Number, require: false},
    pie: {type: Number, require: false},
  },
  availableSeasons: [{seasonId: {type: String, require: false}}]
})

module.exports = mongoose.models.Player || mongoose.model('Player', Player)

