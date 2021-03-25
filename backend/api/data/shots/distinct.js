const {findAllDistinctPlayers} = require('../../../utils/nba/shot.js');
const {playerInfoProps} = require('../../../utils/nba/player.js');

exports.getDistinctPlayers = (req, res) => {
  findAllDistinctPlayers().then(distinctPlayers => {
    playerInfoProps(distinctPlayers).then(playerInfoProps => {
      res.status(200)
      res.writeHeader('Content-Type', 'application/json')
      res.send(playerInfoProps);
    })
  })
}