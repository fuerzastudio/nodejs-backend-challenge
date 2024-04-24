/**
 * Express application for the backend server.
 * @module app
 */

const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/database");
const swaggerFile = require("./docs/swagger-output.json");
const postsRouter = require("./src/routes/api/posts");
const authRouter = require("./src/routes/api/auth");

require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

// Start server
const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    /**
     * Starts the server on the specified port.
     * @function
     * @name listen
     * @param {number} port - The port number to listen on.
     * @param {Function} callback - The callback function to be executed when the server starts listening.
     */
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

module.exports = app;
