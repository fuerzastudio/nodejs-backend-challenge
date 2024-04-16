const { DataTypes } = require('sequelize');

const db = require("../db/db");

const Post = db.define(
  'posts',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
    },
  },
);

Post.sync({ alter: true });

module.exports = Post;
