import express from "express";
import "./config";
import routes from "./routes/api";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Status up!");
});

app.use("/api", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
