const db = require('../models');
const preguntasService = require('./preguntasService');

// eslint-disable-next-line camelcase
async function getStats(id_pregunta) {
  try {
    // Buscar pregunta por su ID
    const pregunta = await preguntasService.getById(id_pregunta);

    if (!pregunta) {
      throw new Error('Pregunta no encontrada');
    }

    // Objeto para almacenar las estadísticas
    const estadisticas = {};

    // Obtener las opciones de respuesta asociadas a la pregunta
    const opcionesRespuesta = await db.opcion_respuesta.findAll({
      where: {
        id_pregunta,
      },
    });

    // Contar el total de respuestas para la pregunta
    const totalRespuestasPregunta = await db.respuesta.count({
      where: {
        pregunta_id: id_pregunta,
      },
    });

    // Array de promesas para las consultas asincrónicas
    const promesasConsulta = opcionesRespuesta.map(async (opcion) => {
      const opcionId = opcion.id;

      // Contar las respuestas dadas por el encuestado para esta opción de respuesta
      const totalRespuestasOpcion = await db.respuesta.count({
        where: {
          opcion_respuesta_id: opcionId,
        },
      });

      // Calcula el porcentaje en función del total de respuestas para la pregunta
      // eslint-disable-next-line max-len
      const porcentaje = parseFloat(((totalRespuestasOpcion / totalRespuestasPregunta) * 100).toFixed(2));

      // Agregar las estadisticas al objeto
      estadisticas[opcionId] = {
        total: totalRespuestasOpcion,
        porcentaje,
      };
    });

    // Resolver las promesas
    await Promise.all(promesasConsulta);

    // Devolver las estadisticas
    return { estadisticas };
  } catch (error) {
    throw Error(error);
  }
}

module.exports = {
  getStats,
};
