const express = require('express');
const router = express.Router();
const { Controller_Products } = require('../controllers');
const { upload } = require('../middlewares/multer');


// System Router
router.get('/preview/:id', Controller_Products.GET_previewProduct);
router.get('/storage', Controller_Products.GET_managerProduct);
router.get('/create', Controller_Products.GET_createProduct);
router.post('/create', upload.array('products', 12), Controller_Products.POST_createProduct);
router.get('/update/:id', Controller_Products.GET_updateProduct);
router.post('/update/:id', upload.array('products', 12), Controller_Products.POST_updateProduct);
router.get('/delete/:id', Controller_Products.GET_removeProduct);

// Client Router
router.get('/:slug', Controller_Products.GET_productDetail);
module.exports = router;
