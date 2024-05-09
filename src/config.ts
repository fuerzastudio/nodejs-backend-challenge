import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "/../.env"),
});

export const jwtScret = process.env.JWT_SECRET || "development test";
