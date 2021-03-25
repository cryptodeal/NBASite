const Coach = require('../../models/NBA/Coach');

exports.addCoach = async (coach) => {
  let result = await Coach.findById(coach.coachId)
  if (result == null){
    let newCoach = new Coach({
      _id: coach.coachId,
      name: {
        first: coach.firstName,
        last: coach.lastName,
        full: coach.coachName
      },
      seasons: [{
        season: coach.season,

      }]
    })
    return newCoach.save().catch(function(err) {
      console.error(err);
    });
  } else {
    return result
  }
}
