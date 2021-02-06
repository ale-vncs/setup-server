'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('gender', [
      { name: 'Desconhecido' },
      { name: 'Masculino' },
      { name: 'Feminino' }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('gender', null, {})
  }
}
