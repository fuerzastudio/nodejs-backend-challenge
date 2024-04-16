const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
const sequelize = new Sequelize("sqlite::memory:");

// try {
//   sequelize.authenticate();
//   console.log('[DB] Connected');
// } catch (error) {
//   console.error('[DB] Error:', error);
// }

module.exports = sequelize;
