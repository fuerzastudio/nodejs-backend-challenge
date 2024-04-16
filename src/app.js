const express = require("express");
const userRoute = require("./routes/api/auth");
const blogRoute = require("./routes/api/blog");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoute);
app.use("/blogs", blogRoute);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${req.ip}`);
  next();
});

// Error Handling
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${req.ip}`);
  next();
});

app.use((err, req, res, next) => {
  console.log(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  res
    .status(err.status || 500)
    .send(err.message || "[SERVER] Internal Server Error");
});

// Start the server
app.listen(PORT, () => {
  console.info(`[SERVER] Server is running on port ${PORT}`);
});

module.exports = app;
