const { Sequelize } = require("sequelize");

const types = [
  { type: "sqlite", string: "sqlite::memory:" },
  { type: "postgres", string: "postgres://user:pass@example.com:5432/dbname" },
];

const sequelize = new Sequelize(
  types.find((item) => item.type == process.env.DB_TYPE).string,
  {
    logging: process.env.DB_LOGS ? console.log : false,
  },
);

// try {
//   sequelize.authenticate();
//   console.log('[DB] Connected');
// } catch (error) {
//   console.error('[DB] Error:', error);
// }

module.exports = sequelize;
