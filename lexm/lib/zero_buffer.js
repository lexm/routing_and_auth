'use strict';

module.exports = exports = function(buff) {
  for(var i = 0; i < buff.length; i += 1) {
    buff.writeUInt8(0, i);
  }
};
