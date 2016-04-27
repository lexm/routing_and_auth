(function() {
  var app = angular.module('directives', []);

  app.directive('createMovie', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/createMovie.html'
    };
  });

  app.directive('editMovie', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/editMovie.html'
    };
  });

  app.directive('createDirector', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/createDirector.html'
    };
  });

  app.directive('editDirector', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/editDirector.html'
    };
  });

})();
