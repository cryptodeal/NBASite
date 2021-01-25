const mongoose = require('mongoose');
//mongoose.set('debug', true);
const Schema = mongoose.Schema;

const ScopeApp = new Schema ({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  scope: {type: String, enum: ['admin', 'contributor', 'moderator'], required: true, index: true },
  state: { type: String, enum: ['pending review', 'approved', 'rejected'], default: 'pending review', required: true, index: true },
  justification: { type: String, required: true },
  qualifications: { type: String, required: true },
  feedback: { type: String },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  //ensure date is set by default upon submission
  dateSubmitted: { type: Date, default: Date.now, index: true },
  //ensure date is changed whenever app is revised
  //dateRevised: { type: Date, index: true }
});

//ScopeApp.pre('findOneAndUpdate', function (next) {
//  if(this._update.$set.state === 'rejected'){
//    this._update.state = 'pending review'
//    next();
//  } else{
//    next();
//  }
//});



module.exports = mongoose.models.ScopeApp || mongoose.model('ScopeApp', ScopeApp);
