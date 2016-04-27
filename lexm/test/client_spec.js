require('../app/js/index.js');
const angular = require('angular');
require('angular-mocks');

describe('testing MovieController', () => {
  var movieController;
  // var directorController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('MovieApp'));
  beforeEach(angular.mock.inject(function($controller) {
    movieController = $controller('MovieController');
    // directorController = $controller('DirectorController');
  }));
  it('should construct movieController', () => {
    expect(typeof movieController).toBe('object');
    expect(movieController.movies[0]).toBe('movie');
    expect(typeof movieController.getMovies).toBe('function');
  });

  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get movies', () => {
      $httpBackend.expectGET('http://localhost:3000/movies')
        .respond(200, {movies: [{name: 'Traffic', release_date:'12/27/2000'}]});
      movieController.getMovies();
      $httpBackend.flush();
      console.log(movieController.movies);
      expect(movieController.movies.length).toBeGreaterThan(0);
      expect(movieController.movies[0].name).toBe('Traffic');
      expect(movieController.movies[0].release_date).toBe('12/27/2000');
    });

    it('should add a new movie', () => {
      $httpBackend.expectPOST('http://localhost:3000/movies', {name: 'Jaws', release_date: '06/20/1975'})
        .respond(200, {name: 'Jaws', release_date: '06/20/1975'});
      movieController.createMovie({name: 'Jaws', release_date: '06/20/1975'});
      $httpBackend.flush();
      expect(movieController.movies.length).toBe(2);
      expect(movieController.movies[1].name).toBe('Jaws');
      expect(movieController.movies[1].release_date).toBe('06/20/1975');
    });
  });
});
