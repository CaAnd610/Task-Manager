const express = require('express');
const router = express.Router();

const eventsController = require('../Controllers/events.controller');
const verifyToken = require('../Middlewares/verifyToken');
const validateEvent = require('../Middlewares/validateEvent');

router.use(verifyToken);

router.post('/', validateEvent, eventsController.createEvent);


module.exports = router;

