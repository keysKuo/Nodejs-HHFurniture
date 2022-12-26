const express = require('express');
const { Controller_Category } = require('../controllers');
const router = express.Router();

// System Controllers
router.get('/create', Controller_Category.GET_createCategory);
router.post('/create', Controller_Category.POST_createCategory);
router.get('/storage', Controller_Category.GET_categoryStorage);
router.post('/delete/:id', Controller_Category.POST_removeCategory);
router.post('/sort', Controller_Category.POST_sortCategory);
// CLient Controllers
//router.get('/:slug', Controller_Category.GET_CategoryPage);

// Ajax
router.post('/filter', Controller_Category.AJAX_POST_filterCategory)
module.exports = router;
