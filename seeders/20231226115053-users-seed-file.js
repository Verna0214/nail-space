'use strict';
const bcrypt = require('bcryptjs')
const userData = require('./users_data.json').data

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashUserData = userData.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
      created_at: new Date(),
      updated_at: new Date()
    }))

    await queryInterface.bulkInsert('Users', hashUserData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
};
