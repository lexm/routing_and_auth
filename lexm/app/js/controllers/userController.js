module.exports = (app) => {
  app.controller('UserController', ['$http', '$location', 'AuthService', 'ErrorService', UserController]);
  function UserController($http, $location, AuthService, ErrorService) {
    var baseRoute = 'http://localhost:3000/';
    var vm = this;
    vm.error = ErrorService();
    console.log(vm.error);
    vm.signUp = function(user) {
      AuthService.createUser(user, function(err, res) {
        if(err) return ErrorService('Problem Creating User');
        $location.path('/');
      });
    };
    vm.signOut = function() {
      AuthService.signOut(() => {
        $location.path('/signup');
      });
    };
    vm.signIn = function(user) {
      AuthService.signIn(user, (err, res) => {
        if (err) return ErrorService('Problem Creating User');
        vm.error = ErrorService(null);
        $location.path('/home');
      });
    };
  }
};
