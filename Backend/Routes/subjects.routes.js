const express = require('express');

const router = express.Router();
const validate = require('../Middlewares/validateSchemas');

const subjectsController = require('../Controllers/subjects.controller');
const verifyToken = require('../Middlewares/verifyToken');
const subjectSchema = require('../Schemas/subject.schema');

router.use(verifyToken);

router.post('/', validate(subjectSchema), subjectsController.createSubject);
router.get('/', subjectsController.getAllSubjects);
router.get('/:id', subjectsController.getSubjectById);
router.put('/:id', validate(subjectSchema), subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);

module.exports = router;