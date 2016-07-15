var db = require('../config/db');
var bcrypt = require('bcryptjs');
var noteSchema = require('./noteSchema');

var userSchema = db.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_digest: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  notes: [noteSchema],
});

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

userSchema.methods.toJSON = function() {
  var user = this.toObject();
  delete user.password_digest;
  delete user.__v;
  return user;
};

userSchema.methods.authenticate = function(password) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password_digest, (err, isMatch) => {
      if (isMatch) {
        resolve(user);
      }
      else {
        reject(err);
      }
    });

  });
};

module.exports = userSchema;
