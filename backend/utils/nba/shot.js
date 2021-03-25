const Shot = require('../../models/NBA/Shot');

exports.findShotsDistinct = () => {
  return Shot.find().distinct('teamId').lean().exec()
}

exports.findAllPlayerShots = (playerId) => {
  return Shot.find({'player': playerId}).select('locX locY madeShot').lean().exec()
}

exports.findAllDistinctPlayers = () => {
  return Shot.find().distinct('player').exec()
}
