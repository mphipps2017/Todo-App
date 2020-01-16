const express = require('express');
const router = express.Router();
router.use('/lists', require('./lists'));
router.use('/todos', require('./todos'));
router.use('/users', require('./users'));
router.use('/fNotes', require('./flashNotes'));
module.exports = router;