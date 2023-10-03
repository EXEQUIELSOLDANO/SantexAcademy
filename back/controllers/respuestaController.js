/* eslint-disable camelcase */
const respuestaService = require('../services/respuestaService');

// Traer las respuestas de la encuesta

async function getAllAnswer(req, res) {
  const respuestas = await respuestaService.getAllAnswer();
  res.status(200).send(respuestas);
}

// traer una respuesta por id

async function getAnswerById(req, res, next) {
  const { id } = req.params;

  try {
    const respuesta = await respuestaService.getAnswerById(id);
    res.status(200).send(respuesta);
  } catch (error) {
    next(error);
  }
}

// crear una respuesta

async function createAnswer(req, res) {
  try {
    const {
      pregunta_id,
      // eslint-disable-next-line camelcase
      encuestado_id,
      opcion_respuesta_id,
      respuesta_abierta,
    } = req.body;
    const answer = await respuestaService.createAnswer(
      pregunta_id,
      encuestado_id,
      opcion_respuesta_id,
      respuesta_abierta,
    );
    res.status(200).send(answer);
  } catch (error) {
    throw Error(error);
  }
}

module.exports = {
  getAllAnswer,
  getAnswerById,
  createAnswer,
};
