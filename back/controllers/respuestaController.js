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

module.exports = {
  getAllAnswer,
  getAnswerById,
};
