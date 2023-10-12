const express = require('express');
const encuestaController = require('../controllers/preguntasController');

const router = express.Router();

router.get('/preguntas', encuestaController.getAllPoll);
router.get('/preguntas/:id', encuestaController.getAskById);
router.get('/preguntas/:id/estadisticas', encuestaController.getStats);

module.exports = router;
