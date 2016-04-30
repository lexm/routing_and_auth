const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');
require('angular-route');

var directives = require('./directives/directives');

const app = angular.module('MovieApp', ['angularMoment', 'directives', 'ngRoute']);

require('./services/services')(app);
require('./services/auth_service')(app);
require('./services/error_service')(app);
require('./controllers/userController')(app);
require('./controllers/movieController')(app);
require('./controllers/directorController')(app);

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
    .when('/signup', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'html/template/signup.html'
    })
    .when('/signin', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'html/template/signin.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Here\'s the main page.';
});
