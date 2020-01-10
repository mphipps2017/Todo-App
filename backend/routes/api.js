const express = require('express');
const router = express.Router();
router.use('/lists', require('./lists'));
router.use('/todos', require('./todos'));
router.use('/users', require('./users'));
module.exports = router;