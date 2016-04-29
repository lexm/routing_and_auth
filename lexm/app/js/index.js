const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');
require('angular-route');

var directives = require('./directives');

const app = angular.module('MovieApp', ['angularMoment', 'directives', 'ngRoute']);

require('./services')(app);
require('./auth_service')(app);
require('./error_service')(app);
require('./userController')(app);
require('./movieController')(app);
require('./directorController')(app);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'html/homePage.html',
      controller: 'HomeController'
    })
    .when('/directors', {
      templateUrl: 'html/directorPage.html',
      controller: 'DirectorController'
    })
    .when('/movies', {
      templateUrl: 'html/moviePage.html',
      controller: 'MovieController'
    })
    .otherwise({
      redirectTo: '/home'
      // templateUrl: 'html/homePage.html',
      // controller: 'HomeController'
    });
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Here\'s the main page.';
});
