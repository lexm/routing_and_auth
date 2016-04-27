const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');

var directives = require('./directives');

const app = angular.module('MovieApp', ['angularMoment', 'directives']);

require('./services')(app);
require('./movieController')(app);
require('./directorController')(app);
