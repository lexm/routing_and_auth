'use strict';

module.exports = (router, models) => {
  var express = require('express');
  var User = require(__dirname + '/../models/User');
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


    // var newUser = new User();
    // newUser.username = req.body.username || req.body.email;
    // newUser.authentication.email = req.body.email;
    // newUser.hashPassword(req.body.password);
    // newUser.save((err, data) => {
    //   if (err) return handleDBError(err, res);
    //   res.status(200).json({token: data.generateToken()});
    // });
  });

};
