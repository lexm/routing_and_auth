'use strict';

module.exports = (router, models) => {
  var User = models.User;
  var jsonParser = require('body-parser').json();
  var handleDBError = require(__dirname + '/../lib/handle_db_error');

  router.post('/', jsonParser, (req, res) => {
    var newUser = new User();
    newUser.username = req.body.username || req.body.email;
    newUser.authentication.email = req.body.email;
    newUser.hashPassword(req.body.password);
    newUser.save((err, data) => {
      if (err) return handleDBError(err, res);
      res.status(200).json({token: data.generateToken()});
    });
  });
};
