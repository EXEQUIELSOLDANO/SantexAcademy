const express = require('express');
const respuestaController = require('../controllers/respuestaController');

const router = express.Router();

router.get('/respuestas', respuestaController.getAllAnswer);
router.get('/respuestas/:id', respuestaController.getAnswerById);

module.exports = router;
