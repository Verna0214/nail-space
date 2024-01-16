'use strict';
const itemsData = require('./items_data.json').data

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const services = await queryInterface.sequelize.query(
      'SELECT id, name FROM Services;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Items', itemsData.map(item => {
      const serviceMatch = services.find(service => service.name === item.service_id)
      console.log(serviceMatch)
      return {
        ...item,
        service_id: serviceMatch.id,
        created_at: new Date(),
        updated_at: new Date()
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
