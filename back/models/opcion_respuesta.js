const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line camelcase
  class opcion_respuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  opcion_respuesta.init({
    id_pregunta: DataTypes.INTEGER,
    respuesta: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'opcion_respuesta',
  });
  // eslint-disable-next-line camelcase
  return opcion_respuesta;
};
