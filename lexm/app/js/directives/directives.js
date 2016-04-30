(function() {
  var app = angular.module('directives', []);

  app.directive('createMovie', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/template/createMovie.html'
    };
  });

  app.directive('editMovie', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/template/editMovie.html'
    };
  });

  app.directive('createDirector', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/template/createDirector.html'
    };
  });

  app.directive('editDirector', function() {
    return {
      restrict: 'E',
      templateUrl: '../html/template/editDirector.html'
    };
  });

})();
