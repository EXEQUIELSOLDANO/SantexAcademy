/* eslint-disable camelcase */
const db = require('../models');

// Buscar respuesta
async function getAllAnswer() {
  const respuestas = await db.respuesta.findAll();
  return respuestas;
}

// Buscar resp por id

async function getAnswerById(id) {
  const respuesta = await db.respuesta.findByPk(id);

  if (respuesta == null) {
    throw new Error('Respuesta no encontrada');
  }
  return respuesta;
}

// Guardar respuesta de la persona encuestada

async function createAnswer(
  pregunta_id,
  encuestado_id,
  opcion_respuesta_id,
  respuesta_abierta,
) {
  // eslint-disable-next-line new-cap
  const answer = new db.respuesta();
  answer.pregunta_id = pregunta_id;
  answer.encuestado_id = encuestado_id;
  answer.opcion_respuesta_id = opcion_respuesta_id;
  answer.respuesta_abierta = respuesta_abierta;
  const answerCreate = await answer.save();
  return answerCreate;
}

module.exports = {
  getAllAnswer,
  getAnswerById,
  createAnswer,
};
