const express = require('express');
const { Controller_Orders } = require('../controllers');
const router = express.Router();

router.get('/storage', Controller_Orders.GET_orderStorage);
router.get('/preview/:id', Controller_Orders.GET_orderPreview);
router.get('/remove/:id', Controller_Orders.GET_orderRemove);
router.post('/complete/:id', Controller_Orders.POST_orderComplete);
router.get('/history', Controller_Orders.GET_orderHistory);

module.exports = router;
