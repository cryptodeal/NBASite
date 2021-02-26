const mongoose = require('mongoose');

//mongoose.set('debug', true);
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const User = new Schema ({
  email: { type: String, required: true, index: true, unique: true },
	username: { type: String },
	scope: { type: String, required: true, default: 'admin' },
	password: { type: String, required: true },
  subscriptions: [{type: String, required: false}],
	//twitter: { type: String },
  bio: { type: Object },
  name: { 
    first: { type: String },
    last: { type: String }
  },
	//TODO: Add User Image
	image: { type: String, required: false,  }
});

//storing salted and hashed password
User.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//compare the entered password against the salted and hashed password stored in database

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
//TODO: create User model that autokeys userkey from the name String, forcing unique.

module.exports = mongoose.models.User || mongoose.model('User', User);
