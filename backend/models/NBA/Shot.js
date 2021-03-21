const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Shot = new Schema ({
  game: {type: String, ref: 'Game', index: true},
  player: {type: Number, ref: 'Player', index: true},
  team: {type: String, ref: 'Team', index: true},
  gameEventId: {type: Number, require: true},
  period: {type: Number, require: true},
  minutesRemaining: {type: Number, require: true},
  secondsRemaining: {type: Number, require: true},
  eventType: {type: String, require: true},
  madeShot: {type: Boolean, require: true, index: true},
  actionType: {type: String, require: true},
  shotType: {type: String, require: true, index: true},
  shotZoneBasic: {type: String, require: true},
  shotZoneArea: {type: String, require: true},
  shotZoneRange: {type: String, require: true},
  shotDistance: {type: Number, require: true},
  locX: {type: Number, require: true},
  locY: {type: Number, require: true}
})

module.exports = mongoose.models.Shot || mongoose.model('Shot', Shot)
