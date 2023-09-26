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

module.exports = {
  getAllAnswer,
  getAnswerById,
};
