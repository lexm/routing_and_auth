'use strict';

module.exports = (router, models) => {
  var Director = models.Director;

  router.route('/')
  .get((req, res) => {
    Director.find({}, (err, directors) => {
      res.json({data: directors});
    });
  })
  .post((req, res) => {
    var newDirector = new Director(req.body);
    console.log(newDirector);
    newDirector.save((err, director) => {
      res.json(director);
    });
  });
  router.route('directors/:id')
  .get((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      res.json(director);
    });
  })
  .put((req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
      if (err) return res.send(err);
      res.json(director);
    });
  })
  .delete((req, res) => {
    Director.findById(req.params.id, authJwt, (err, director) => {
      director.remove((err, director) => {
        res.json({message: 'director removed'});
      });
    });
  });

  router.route('/size')
  .get((req, res) => {
    Director.find({}, (err, directors) => {
      res.write(directors.length.toString());
      res.end();
    });
  });

  router.route('/:id')
  .get((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      res.json(director);
    });
  })
  .put((req, res) => {
    Director.findByIdAndUpdate(req.params.id, req.body, (err, director) => {
      if (err) return res.send(err);
      res.json(director);
    });
  })
  .delete((req, res) => {
    Director.findById(req.params.id, (err, director) => {
      if (err) return res.send(err);
      if (!director) {
        return res.json({msg: 'no director found'});
      }
      director.remove(() => {
        res.json({message: 'director removed'});
      });
    });
  });

};
