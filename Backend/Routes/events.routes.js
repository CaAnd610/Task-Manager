const express = require('express');
const router = express.Router();

const eventsController = require('../Controllers/events.controller');
const verifyToken = require('../Middlewares/verifyToken');
const validate = require('../Middlewares/validateSchemas');
const eventSchema = require('../Schemas/event.schema');

router.use(verifyToken);

router.post('/', validate(eventSchema), eventsController.createEvent);


module.exports = router;

