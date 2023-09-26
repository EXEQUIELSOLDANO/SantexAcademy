const opcionRespService = require('../services/opcionRespService');

// Traer las respuestas de la encuesta

async function getAllAnswer(req, res) {
  const answer = await opcionRespService.getAnswer();
  res.status(200).send(answer);
}

// traer una respuesta por id

async function getAnsweryId(req, res, next) {
  const { id } = req.params;

  try {
    const answer = await opcionRespService.getById(id);
    res.status(200).send(answer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllAnswer,
  getAnsweryId,
};
