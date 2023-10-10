/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    // Elimina la columna 'createdAt'
    await queryInterface.removeColumn('pollsters', 'createdAt');

    // Elimina la columna 'updatedAt'
    await queryInterface.removeColumn('pollsters', 'updatedAt');
  },

  async down(queryInterface, Sequelize) {
    // Agrega nuevamente la columna 'createdAt'
    await queryInterface.addColumn('pollsters', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });

    // Agrega nuevamente la columna 'updatedAt'
    await queryInterface.addColumn('pollsters', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
