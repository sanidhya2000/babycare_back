const express = require('express');
const router = express.Router();

const todoRoute = require('./todo');

router.use('/todo', todoRoute);

module.exports = router;