const express = require('express');

const router = express.Router();
const authController = require('../Controllers/auth.controller');
const userSchema = require('../Schemas/user.schema');
const validate = require('../Middlewares/validateSchemas');

router.get('/login', authController.loginUser);
router.post('/signup', validate(userSchema), authController.signupUser);


module.exports = router;