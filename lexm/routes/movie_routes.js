'use strict';

module.exports = (router, models) => {
  var Movie = models.Movie;

  router.route('/')
  .get((req, res) => {
    Movie.find({}, (err, movies) => {
      res.json({data: movies});
    });
  })
  .post((req, res) => {
    var newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      res.json(movie);
    });
  });
  router.route('movies/:id')
  .get((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      res.json(movie);
    });
  })
  .put((req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, (err, movie) => {
      if (err) return res.send(err);
      res.json(movie);
    });
  })
  .delete((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      movie.remove((err, movie) => {
        res.json({message: 'movie removed'});
      });
    });
  });

  router.route('/size')
  .get((req, res) => {
    Movie.find({}, (err, movies) => {
      res.write(movies.length.toString());
      res.end();
    });
  });

  router.route('/:id')
  .get((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      res.json(movie);
    });
  })
  .put((req, res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, (err, movie) => {
      if (err) return res.send(err);
      res.json(movie);
    });
  })
  .delete((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
      movie.remove(() => {
        res.json({message: 'movie removed'});
      });
    });
  });

}
