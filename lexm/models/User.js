'use strict';

module.exports = (mongoose, models) => {
  // var mongoose = require('mongoose');
  var bcrypt = require('bcrypt');
  var jwt = require('jsonwebtoken');
  var config = require(__dirname + '/../config/dbconfig');

  var userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    authentication: {
      email: {
        type: String,
        required: true
      },
      group: String,
      password: {
        type: String,
        required: true
      }
    }
  });

  userSchema.pre('save', function(next) {
    this.authentication.password = bcrypt.hashSync(this.authentication.password, bcrypt.genSaltSync(10));
    next();
  });

  userSchema.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.authentication.password);
  };

  userSchema.methods.generateToken = function() {
    return jwt.sign({_id: this._id, group: this.group}, config.secret);
  };

  var User = mongoose.model('User', userSchema);
  models.User = User;

};
