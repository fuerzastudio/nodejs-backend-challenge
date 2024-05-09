import express from "express";
import passport from "passport";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import "./config";
import "./passaport/passport-jwt-config";
import routes from "./routes/api";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send({ success: true, data: "Status up!" });
});

app.use("/api", routes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
