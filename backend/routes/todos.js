//Routes handle all HTTP requests

const express = require('express');
const todosmodel = require('../models/todos.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    todosmodel.all((err, value) => {
        if (err) return next(err);
        res.json(value);
  });
});

//Retrieves list with the given id
router.get('/:id', (req, res, next) => {
    todosmodel.get(req.params.id, (err, value) => {
        if (err) return next(err);
        res.json(value);
    });
});

router.post('/:id', (req, res) => {
  // req.query gives the body of the post request
  // Like req.body but is located in URL bar.
    todosmodel.add(req.params.id, req.body, (err) => {
        if (err) return next(err);
        res.json({ success: true });
  });

  res.send(req.body);
});

router.put('/:id', (req, res, next) => {
    todosmodel.update(req.params.id, req.body, (err) => {
        if (err) return next(err);
        res.json({ success: true });
    });
});

router.delete('/:id', (req, res, next) => {
    todosmodel.delete(req.params.id, req.body, (err) => {
        if (err) return next(err);
        res.json({ success: true });
  });
});

module.exports = router;