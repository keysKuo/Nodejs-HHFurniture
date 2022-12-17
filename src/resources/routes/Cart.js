const express = require('express');
const { Controller_Cart } = require('../controllers');
const router = express.Router();

router.get('/', Controller_Cart.GET_CartPage);
router.post('/add-order', Controller_Cart.POST_AddOrder)
// router.get('*', function (req, res) {
//     res.status(404).render('error', {
//         layout: 'main',
//         template: 'error-template',
//     });
// });
module.exports = router;
