'use strict';

module.exports = (router, models) => {
  var express = require('express');
  var User = models.User;
  var jsonParser = require('body-parser').json();

  var basicHTTP = require(__dirname + '/../lib/basic_http');

  router.get('/', basicHTTP, (req, res) => {
    User.findOne({'authentication.email': req.basicHTTP.email}, (err, user) => {
      if(err) {
        console.error(err);
        return res.status(401).json({msg: 'authentication failed'});
      }
      if(!user) return res.status(401).json({msg: 'authentication failed'});
      if(!user.comparePassword(req.basicHTTP.password)) return res.status(401).json({msg: 'authentication failed'});
      res.json({token: user.generateToken()});
    });

  });

};
