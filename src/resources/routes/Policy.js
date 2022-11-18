const express = require('express');
const router = express.Router();
const { Controller_Policy } = require('../controllers');

// System Router
router.get('/create', Controller_Policy.GET_createPolicy);
router.post('/create', Controller_Policy.POST_createPolicy);

router.get('/storage', Controller_Policy.GET_policyStorage);
// Client Router
module.exports = router;
