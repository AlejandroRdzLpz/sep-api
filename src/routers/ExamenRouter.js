const express = require('express');
const { ExamenController } = require('../controllers/index.js');

const router = express.Router();

router.get('/:escolaridad', ExamenController.create)

router.post('/:escolaridad/:grado/:asignatura/:modulo', ExamenController.post)

router.get('/:escolaridad/:grado/:asignatura/:modulo', ExamenController.get)


module.exports = router;