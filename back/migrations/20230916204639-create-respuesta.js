/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respuesta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pregunta_id: {
        type: Sequelize.INTEGER,
      },
      encuestado_id: {
        type: Sequelize.INTEGER,
      },
      opcion_respuesta_id: {
        type: Sequelize.INTEGER,
      },
      respuesta_abierta: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('respuesta');
  },
};
