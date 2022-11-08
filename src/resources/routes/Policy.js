const express = require('express');
const router = express.Router();
const { Controller_Home } = require('../controllers');

// System Router
router.get('/:slug', Controller_Home.GET_PolicyPage);

// Client Router
module.exports = router;
