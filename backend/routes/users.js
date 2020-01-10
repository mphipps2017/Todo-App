//Routes handle all HTTP requests

const express = require('express');
const usersmodel = require('../models/users.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    usersmodel.all((err, value) => {
        if (err) return next(err);
        res.json(value);
  });
});

//Retrieves list with the given id
router.get('/:id', (req, res, next) => {
    usersmodel.get(req.params.id, (err, value) => {
        if (err) return next(err);
        res.json(value);
    });
});

router.post('/', (req, res) => {
  // req.query gives the body of the post request
  // Like req.body but is located in URL bar.
    usersmodel.add(req.body, (err) => {
        if (err) return next(err);
        res.json({ success: true });
  });

  res.send(req.body);
});

router.put('/:id', (req, res, next) => {
    usersmodel.update(req.params.id, req.body, (err) => {
        if (err) return next(err);
        res.json({ success: true });
    });
});

router.delete('/:id', (req, res, next) => {
    usersmodel.delete(req.params.id, (err) => {
        if (err) return next(err);
        res.json({ success: true });
  });
});

module.exports = router;