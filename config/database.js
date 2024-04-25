const { Sequelize } = require("sequelize");
const config = require("./config.js");

const environment = process.env.NODE_ENV || "development";
const { username, password, database, host, dialect } = config[environment];

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: environment === "development" ? console.log : false,
});

module.exports = sequelize;
