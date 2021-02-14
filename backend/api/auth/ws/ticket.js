const { verifyToken } = require('../../../utils/mongoose');

exports.getTicket = (req, res) => {
  const {authToken} = req.cookies;
  verifyToken(authToken, function(err, verifiedJwt){
    if(err){
      console.log(err)
      res.status(401)
      res.send(err)
    } else {
      const content = {ticket: `ThisIsATestTicket`}
      res.status(201)
      res.send(content)
    }
  })
}