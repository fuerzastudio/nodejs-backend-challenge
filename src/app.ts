import express from "express";
import "./config";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Status up!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
