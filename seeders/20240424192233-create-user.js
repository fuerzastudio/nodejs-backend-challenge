"use strict";
const { generateId } = require("../src/helpers/utils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: generateId(),
          email: "user1@example.com",
          password: "password1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
