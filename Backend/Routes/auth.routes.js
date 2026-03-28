const express = require('express');

const router = express.Router();
const authController = require('../Controllers/auth.controller');

router.get('/login', authController.loginUser);
router.post('/signup', authController.signupUser);


module.exports = router;