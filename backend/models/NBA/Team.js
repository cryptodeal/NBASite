const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema ({
  _id: {type: String, require: true},
  meta: {
    isComplete: {type: Boolean, require: true, default: false},
    missingData: [{type: String, require: false}]
  },
  infoCommon: {
    seasonYear: {type: String, require: true, default: ''},
    city: {type: String, require: true, default: ''},
    name: {type: String, require: true},
    abbreviation: {type: String, require: true},
    nickname: {type: String, require: false},
    key: {type: String, require: false},
    conference: {type: String, require: true},
    division: {type: String, require: true},
    code: {type: String, require: true},
    slug: {type: String, require: true},
    w: {type: Number, require: true, default: 0},
    l: {type: Number, require: true, default: 0},
    pct: {type: Number, require: true, default: 0},
    confRank: {type: Number, require: true},
    divRank: {type: Number, require: true},
    minYear: {type: String, require: true},
    maxYear: {type: String, require: true}
  },
  seasonRanks: {
    //leagueId: {type: mongoose.Schema.Types.ObjectId, ref: 'League', index: true, many: false},
    //seasonId: {type: mongoose.Schema.Types.ObjectId, ref: 'Season', index: true, many: false},
    leagueId: {type: String, require: true},
    seasonId: {type: String, require: true},
    ptsRank: {type: Number, require: true, default: 0},
    ptsPg: {type: Number, require: true, default: 0},
    rebRank: {type: Number, require: true, default: 0},
    rebPg: {type: Number, require: true, default: 0},
    astRank: {type: Number, require: true, default: 0},
    astPg: {type: Number, require: true, default: 0},
    oppPtsRank: {type: Number, require: true, default: 0},
    oppPtsPg: {type: Number, require: true, default: 0}
  },
  teamShooting: {
    gamesPlayed: {type: Number, require: false},
    games: {type: Number, require: false},
    fgaFrequency: {type: Number, require: false},
    fgm: {type: Number, require: false},
    fga: {type: Number, require: false},
    fgPct: {type: Number, require: false},
    efgPct: {type: Number, require: false},
    fg2aFrequency: {type: Number, require: false},
    fG2M: {type: Number, require: false},
    fG2A: {type: Number, require: false},
    fg2Pct: {type: Number, require: false},
    fg3aFrequency: {type: Number, require: false},
    fG3M: {type: Number, require: false},
    fG3A: {type: Number, require: false},
    fg3Pct: {type: Number, require: false},
  },
  availableSeasons: [{
    seasonId: {type: String, require: false},
    roster: {
      coaches: [{type: String, ref: 'Coach', index: true, many: true}],
      players: [{type: String, ref: 'Player', index: true, many: true}]
    }
  }]
  //seasons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Season', index: true, many: true}]
})

module.exports = mongoose.models.Team || mongoose.model('Team', Team)
