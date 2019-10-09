//Routes handle all HTTP requests

const express = require('express');
const listsmodel = require('../models/lists.js');

const router = express.Router();

// Route handler for retrieving all the lists in the db
router.get('/', (req, res, next) => {
  listsmodel.all((err, value) => {
    if (err) return next(err);
    res.json(value);
  });
});

// Ruute handler for retrieving lists with the given id
router.get('/:id', (req, res, next) => {
    listsmodel.get(req.params.id, (err, value) => {
      if (err) return next(err);
      res.json(value);
    });
});

// Route handler for post requests
router.post('/', (req, res) => {
  // req.query gives the body of the post request
    listsmodel.add(req.query, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });

  res.send(req.query);
});

// Route handler for put requests
router.put('/:id', (req, res, next) => {
    listsmodel.update(req.params.id, req.query, (err) => {
        if (err) return next(err);
        res.json({ success: true });
    });
});

// Route handler for delete requests
router.delete('/:id', (req, res, next) => {
  listsmodel.delete(req.params.id, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

router

module.exports = router;