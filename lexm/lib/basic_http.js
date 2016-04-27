var zeroBuffer = require(__dirname + '/zero_buffer');

module.exports = exports = function(req, res, next) {
  try {
    var authorizationArray = req.headers.authorization.split(' ');
    var method = authorizationArray[0];
    var base64ed = authorizationArray[1];
    var authBuffer = new Buffer(base64ed, 'base64');
    var authArray = authBuffer.toString().split(':');
    zeroBuffer(authBuffer);

    var name = authArray[0];
    var password = authArray[1];
    //
    // var authString = req.headers.authorization;
    // var base64String = authString.split(' ')[1];
    // var authBuf = new Buffer(base64String, 'base64');
    // var utf8AuthString = authBuf.toString();
    // var authArr = utf8AuthString.split(':');

    zeroBuffer(authBuffer);
    if(name.length && password.length) {
      req.basicHTTP = {
        name: name,
        password: password
      };
      return next();
    }
  } catch(err) {
    console.log(err);
  }
  res.status(401).json({msg: 'auth error 4: basicHTTP'});
};
