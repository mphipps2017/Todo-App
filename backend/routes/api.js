const express = require('express');
const router = express.Router();
router.use('/lists', require('./lists'));
module.exports = router;