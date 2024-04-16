const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("../db/db");

const User = db.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync({ alter: true }).then(() => {
  // Note: creating a user for testing purposes
  User.create({
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync(
      "admin",
      parseInt(process.env.BCRYPT_ROUNDS) || 10,
    ),
  });
});

module.exports = User;
