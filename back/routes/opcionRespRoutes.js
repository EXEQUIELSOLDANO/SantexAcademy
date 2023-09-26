const express = require('express');
const opcionRespController = require('../controllers/opcionRespController');

const router = express.Router();

router.get('/respuestas', opcionRespController.getAllAnswer);
router.get('/respuestas/:id', opcionRespController.getAnsweryId);

module.exports = router;
