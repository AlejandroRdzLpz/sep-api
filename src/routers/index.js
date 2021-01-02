const express = require('express');

const ExamenRouter = require('./ExamenRouter')

const router = express.Router();

router.use(ExamenRouter);

module.exports = router;