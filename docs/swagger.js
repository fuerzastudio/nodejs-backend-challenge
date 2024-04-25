const options = {
  openapi: "3.0.0",
  language: "en-US",
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
  writeOutputFile: true,
};

const swaggerAutogen = require("swagger-autogen")(options);

const doc = {
  info: {
    version: "1.0.0",
    title: "REST API",
    description: "API documentation for NodeJs Backend Challenge",
    contact: {
      name: "Luciano Zembruzki",
      email: "luciano.zembruzki@gmail.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Posts",
      description: "API endpoints for managing posts",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/api/posts.js"];

swaggerAutogen(outputFile, routes, doc);
