const express = require('express');
const celebritiesRouter = express.Router();
const Celebrity = require('../models/celebrity');

celebritiesRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase
  })
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findOneAndUpdate(
    { _id: id },
    {
      name,
      occupation,
      catchPhrase
    }
  )
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
