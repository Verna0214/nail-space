'use strict';
const servicesData = require('./services_data.json').data

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Services', servicesData.map(service => {
      return {
        ...service,
        created_at: new Date(),
        updated_at: new Date()
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {})
  }
};
