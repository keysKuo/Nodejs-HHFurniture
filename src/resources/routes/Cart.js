const express = require('express');
const { Controller_Cart } = require('../controllers');
const router = express.Router();

router.get('/', Controller_Cart.GET_CartPage);

// router.get('*', function (req, res) {
//     res.status(404).render('error', {
//         layout: 'main',
//         template: 'error-template',
//     });
// });
module.exports = router;
