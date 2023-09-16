const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class respuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  respuesta.init({
    pregunta_id: DataTypes.INTEGER,
    encuestado_id: DataTypes.INTEGER,
    opcion_respuesta_id: DataTypes.INTEGER,
    respuesta_abierta: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'respuesta',
  });
  return respuesta;
};
