const express = require('express');
const opcionRespController = require('../controllers/opcionRespController');

const router = express.Router();

router.get('/respuesta', opcionRespController.getAllAnswer);
router.get('/respuesta/:id', opcionRespController.getAnsweryId);

module.exports = router;
