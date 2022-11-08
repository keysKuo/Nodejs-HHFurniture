const express = require('express');
const { Controller_Category } = require('../controllers');
const router = express.Router();
router.get('/:slug', Controller_Category.GET_productsByCategory);
module.exports = router;
