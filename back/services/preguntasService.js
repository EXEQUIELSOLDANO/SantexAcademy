const db = require('../models');

// Buscar encuesta
async function getPoll() {
  const poll = await db.pregunta.findAll();
  return poll;
}

// buscar pregunta por id

async function getById(id) {
  const pregunta = await db.pregunta.findByPk(id);

  if (pregunta == null) {
    throw new Error('Pregunta no encontrada');
  }
  return pregunta;
}

module.exports = {
  getPoll,
  getById,
};
