const express = require('express');
const encuestaController = require('../controllers/encuestaController');

const router = express.Router();

router.get('/obtener_encuesta', encuestaController.getAllPoll);
router.get('/pregunta/:id', encuestaController.getAskById);

module.exports = router;
