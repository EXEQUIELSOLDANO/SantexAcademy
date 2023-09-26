const express = require('express');
const opcionRespController = require('../controllers/opcionRespController');

const router = express.Router();

router.get('/opcion-respuestas', opcionRespController.getAllAnswer);
router.get('/opcion-respuestas/:id', opcionRespController.getAnswerById);

module.exports = router;
