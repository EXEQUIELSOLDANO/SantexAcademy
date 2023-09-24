const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class encuestado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  encuestado.init({
    n_encuestado: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'encuestado',
  });
  return encuestado;
};
