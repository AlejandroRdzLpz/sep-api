const express = require('express');
const { ExamenController } = require('../controllers/index.js');

const router = express.Router();

router.get('/:escolaridad', ExamenController.create)

router.post('/:escolaridad/:grado/:asignatura/:modulo', ExamenController.post)

router.get('/:escolaridad/:id', ExamenController.getOne)

router.patch('/:escolaridad/:grado/:asignatura/:modulo/:id', ExamenController.edit)

router.put('/:escolaridad/:grado/:asignatura/:modulo/:id', ExamenController.addQuestion)

router.delete('/:escolaridad/:grado/:asignatura/:modulo/:id/:pregunta', ExamenController.deleteQuestion)

router.delete('/:escolaridad/:id', ExamenController.deleteExam)

module.exports = router;