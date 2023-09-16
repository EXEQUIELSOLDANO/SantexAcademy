const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pregunta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  pregunta.init({
    numero: DataTypes.INTEGER,
    pregunta: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'pregunta',
  });
  return pregunta;
};
