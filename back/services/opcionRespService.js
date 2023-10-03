const db = require('../models');

// Buscar respuesta
async function getAnswer() {
  const answer = await db.opcion_respuesta.findAll();
  return answer;
}

// Buscar resp por id

async function getById(id) {
  const respuesta = await db.opcion_respuesta.findByPk(id);

  if (respuesta == null) {
    throw new Error('Pregunta no encontrada');
  }
  return respuesta;
}

module.exports = {
  getAnswer,
  getById,
};
