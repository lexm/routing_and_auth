'use strict';
var mongoose = require('mongoose');

module.exports = (router, models) => {
  var jwt = require('jsonwebtoken');
  var basicHTTP = require(__dirname + '/../lib/basic_http');
  var User = models.User;
  router.post('/', basicHTTP, (req, res) => {

    User.find({'name': req.basicHTTP.name}, function(err, user) {
      if (err) {
        return res.json({status: 'error'});
      }
      var valid = (!!user.length && user[0].compareHash(req.basicHTTP.password));
      if(!valid) {
        return res.json({status: 'failure', basicHTTP: req.basicHTTP});
      }
      var newToken = user[0].generateToken();
      res.json({token: newToken});
    });
  });
}
