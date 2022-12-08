const express = require('express');
const router = express.Router();
const { Controller_Policy } = require('../controllers');

// System Router
router.get('/create', Controller_Policy.GET_createPolicy);
router.post('/create', Controller_Policy.POST_createPolicy);

router.get('/storage', Controller_Policy.GET_policyStorage);

router.get('/update/:id', Controller_Policy.GET_policyUpdate);
router.post('/update/:id', Controller_Policy.POST_updatePolicy);

router.get('/delete/:id', Controller_Policy.GET_deletePolicy);
// Client Router
module.exports = router;
