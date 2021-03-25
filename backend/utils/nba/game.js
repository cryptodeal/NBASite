const Game = require('../../models/NBA/Game');


exports.findGameInDB = (gameId) => {
  return Game.findById(gameId)
}
exports.listAllGames = () => {
  return Game.find({"helpers.year": null}).exec()
}
exports.findGame = (gameId) => {
  return Game.findById(gameId)
}


exports.shotFindGame = (shot) => {
  return Game.findById(shot.gameId).exec()
}



exports.listAllRecentGames = () => {
  return Game.find({"helpers.year": { $in : ['2015','2016','2017','2018','2019','2020','2021']}, 'meta.isComplete': {'$ne': true}}).exec()
}

exports.listAllOldGames = () => {
  return Game.find({"helpers.year": { $in : ['1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']}, 'meta.isComplete': {'$ne': true}}).exec()
}


exports.listAllDistinctDates = () => {
  return Game.find().distinct('date', {"visitor.id": null}).exec()
}

exports.listAllDistinctDatesEspn = () => {
  const acceptedYears = ['2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
  return Game.find().distinct('date', {"helpers.espnGameId": null, "helpers.year": { $in : acceptedYears}}).exec()
}

exports.checkIsOldDate = (date) => {
  const oldYears = ['1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
  if(oldYears.includes(date.slice(0,4))){
    return true
  }else{
    return false;
  }
}

exports.findEspnGameIdOnly = () => {
  return Game.find({_id: null}).exec()
}


exports.getDistinctDatesEspnImport = () => {
  const acceptedYears = ['2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
  return Game.find().distinct('date',{"helpers.year": {$in :['2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']}}).exec()
}
