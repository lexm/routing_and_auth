'use strict';
var mongoose = require('mongoose');

module.exports = (router, models) => {
  var User = models.User;
  router.route('/')
  .post((req, res) => {
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      if(err) {
        console.log('posting error');
        if(!err.message.search('E11000')) {
          res.write('User ' + req.body.name + ' already exists');
        } else {
          console.log(err);
        }
      }
      res.end();
    });
  })
  .get((req, res) => {
    User.find({}, function (err, users) {
      if(err) {console.log(err);}
      res.json(users);
      res.end();
    });
  });
};
