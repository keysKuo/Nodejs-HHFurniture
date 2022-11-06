const express = require('express');
const router = express.Router();
const { Controller_News } = require('../controllers');
const { upload2 } = require('../middlewares/multer');

router.get('/preview/:id', Controller_News.GET_previewNews);
router.get('/storage', Controller_News.GET_managerNews);

router.get('/create', Controller_News.GET_createNews);
router.post('/create', upload2.array('news', 12), Controller_News.POST_createNews);

router.get('/update/:id', Controller_News.GET_updateNews);
router.post('/update/:id', upload2.array('news', 12), Controller_News.POST_updateNews);

router.get('/delete/:id', Controller_News.GET_removeNews);

router.get('/:slug', Controller_News.GET_newsDetail);
module.exports = router;
