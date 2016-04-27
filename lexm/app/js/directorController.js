module.exports = (app) => {
  app.controller('DirectorController', ['$http', 'movieSvc', DirectorController]);
  function DirectorController($http, movieSvc) {
    const directorRoute = 'http://localhost:3000/directors';
    this.directors = ['director'];
    this.getDirectors = function() {
      $http.get(directorRoute)
      .then((res) => {
        this.directors = res.data.data;
      },
      function(error) {
        console.error(error);
      });
    };
    this.createDirector = function(director) {
      $http.post(directorRoute, director)
      .then((res) => {
        this.directors.push(res.data);
      });
    };
    this.removeDirector = function(director) {
      if(director._id) {
        $http.delete(directorRoute + '/' + director._id)
        .then((res) => {
          this.directors = this.directors.filter((direc) => direc._id != director._id);
        });
      } else {
        console.log('no id!');
      }
    };
    this.saveOldDirector = function(director, oldDirector) {
      if(!oldDirector) {
        oldDirector = director;
      }
      return oldDirector;
    };

    this.showEditFlip = function(director) {
      return movieSvc.showEditFlip(director);
    };


    this.putDirector = function(direcEdit) {
      if(direcEdit._id) {
        $http.put(directorRoute + '/' + direcEdit._id, direcEdit)
        .then((res) => {
          this.directors = this.directors.map((direc) => {
            if(direc._id === direcEdit._id) {
              return direcEdit;
            } else {
              return direc;
            }
          });
        });
      } else {
        console.log('no id!');
      }
    };
    this.cancelEdit = function(direcEdit, director) {
      direcEdit._id = director._id;
      direcEdit.name = director.name;
      direcEdit.date_of_birth = director.date_of_birth;
    };
  }

};
