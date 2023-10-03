const encuestaService = require('../services/preguntasService');
const statsService = require('../services/statsService');

// Traer las pregustas de la encuesta

async function getAllPoll(req, res) {
  const poll = await encuestaService.getPoll();
  res.status(200).send(poll);
}

// Traer una pregunta por id

async function getAskById(req, res, next) {
  const { id } = req.params;

  try {
    const ask = await encuestaService.getById(id);
    res.status(200).send(ask);
  } catch (error) {
    next(error);
  }
}

// Estadísticas

async function getStats(req, res) {
  // eslint-disable-next-line camelcase
  const id_pregunta = req.params.id;

  try {
    const stats = await statsService.getStats(id_pregunta);
    res.status(200).send(stats);
    // res.json({ stats });  JSON para que funcione con el front-end
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAllPoll,
  getAskById,
  getStats,
};
