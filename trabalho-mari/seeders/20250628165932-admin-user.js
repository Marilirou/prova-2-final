"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaHash = await bcrypt.hash("123456", 10);
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@admin.com",
        password: senhaHash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { email: "admin@admin.com" });
  }
};
