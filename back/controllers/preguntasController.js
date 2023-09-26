const encuestaService = require('../services/preguntasService');

// Traer las pregustas de la encuesta

async function getAllPoll(req, res) {
  const poll = await encuestaService.getPoll();
  res.status(200).send(poll);
}

// traer una pregunta por id

async function getAskById(req, res, next) {
  const { id } = req.params;

  try {
    const ask = await encuestaService.getById(id);
    res.status(200).send(ask);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPoll,
  getAskById,
};
