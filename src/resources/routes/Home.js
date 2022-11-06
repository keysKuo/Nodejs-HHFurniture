const express = require('express');
const { Controller_Home } = require('../controllers');
const router = express.Router();

router.get('/', Controller_Home.GET_Homepage);

router.get('/contact', Controller_Home.GET_Contact);

router.get('/ban-tin', Controller_Home.GET_News);

router.get('/khuyen-mai', Controller_Home.GET_Sales);

router.get('/thanh-toan', Controller_Home.GET_Payment);

// router.get('*', function (req, res) {
//     res.status(404).render('error', {
//         layout: 'main',
//         template: 'error-template',
//     });
// });
module.exports = router;
