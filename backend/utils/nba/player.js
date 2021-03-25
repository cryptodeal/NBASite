const Player = require('../../models/NBA/Player');


exports.findPlayer = (params) => {
  return Player.findOne(params).exec()
}

exports.getAllPlayers = () => {
  return Player.find({playedCurrentSeason: {'$ne': false}}).exec()
}

exports.shotFindPlayer = (shot) => {
  return Player.findById(shot.playerId).exec()
}

exports.playerInfoProps = (distinctPlayers) => {
  return Player.find({_id: {$in : distinctPlayers}}).lean().select('name slug').exec()
}

exports.findPlayerBySlug = (slug) => {
  return Player.findOne({slug: slug}).exec()
}