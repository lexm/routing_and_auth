var models = require(__dirname + '/../models');
var User = models.User;
var jwt = require('jsonwebtoken');
var config = require(__dirname + '/../config/dbconfig');

module.exports = exports = function(req, res, next) {
  var decrypt;
  try {
    decrypt = jwt.verify(req.headers.token, process.env.APP_SECRET || config.secret);
  } catch(e) {
    debugger;
    return res.status(401).json({msg: 'auth error 1: decrypt'});
  }
  console.log('decrypt: ', decrypt);
  User.findOne({_id: decrypt._id}, (err, user) => {
    if(err) {
      console.log(err);
      return res.status(401).json({msg: 'auth error 2: find'});
    }
    if(!user) {
      return res.status(401).json({msg: 'auth error 3: no user'});
    }

    req.user = user;
    next();
  });
};
