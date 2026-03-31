const express = require('express');
const router = express.Router();

const eventsController = require('../Controllers/events.controller');
const verifyToken = require('../Middlewares/verifyToken');
const validate = require('../Middlewares/validateSchemas');
const eventSchema = require('../Schemas/event.schema');

router.use(verifyToken);

router.post('/', validate(eventSchema), eventsController.createEvent);
router.get('/', eventsController.getEvents);
router.get('/:id', eventsController.getEventById);
router.put('/:id', validate(eventSchema), eventsController.updateEvent);
router.delete('/:id', eventsController.deleteEvent);


module.exports = router;

