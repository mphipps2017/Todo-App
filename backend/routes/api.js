const express = require('express');
const router = express.Router();
router.use('/lists', require('./lists'));
router.use('/todos', require('./todos'));
module.exports = router;