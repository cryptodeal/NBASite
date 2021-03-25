const {findAllPlayerShots} = require('../../../utils/nba/shot.js');
const {findPlayerBySlug} = require('../../../utils/nba/player.js');

exports.getAllShotsByPlayer = async (req, res) => {
  const {slug} = req.params;
  const player = await findPlayerBySlug(slug)
  findAllPlayerShots(player._id).then(shots => {
    res.status(200)
    res.writeHeader('Content-Type', 'application/json')
    return res.send({points: shots, player: player});
  })
}