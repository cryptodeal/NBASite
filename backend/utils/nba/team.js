const Team = require('../../models/NBA/Team');

exports.getAllTeams = () => {
  //return Team.find({'meta.isComplete': {'$ne': true}}).exec()
  return Team.find({}).exec()
}

exports.shotFindTeam = (shot) => {
  return Team.findById(shot.teamId).exec()
}