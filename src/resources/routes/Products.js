const express = require('express');
const router = express.Router();
const { Products_Controller } = require('../controllers');
const upload = require('../middlewares/multer');


router.get('/create', Products_Controller.GET_createProduct);
router.post('/create', upload.array('product-img', 12), Products_Controller.POST_createProduct);

router.get('/update/:id', Products_Controller.GET_updateProduct);
router.put('/update/:id', upload.array('update-img', 12), Products_Controller.PUT_updateProduct);

router.delete('/delete/:id', Products_Controller.DELETE_removeProduct);

module.exports = router;