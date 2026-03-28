const express = require('express');

const router = express.Router();
const subjectsController = require('../Controllers/subjects.controller');
const verifyToken = require('../Middlewares/verifyToken');
const validateSubject = require('../Middlewares/validateSubject');

router.use(verifyToken);

router.post('/', validateSubject, subjectsController.createSubject);
router.get('/', subjectsController.getAllSubjects);
router.get('/:id', subjectsController.getSubjectById);
router.put('/:id', validateSubject, subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);

module.exports = router;