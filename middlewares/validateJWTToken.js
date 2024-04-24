const jwt = require("jsonwebtoken");
require("dotenv").config();

SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const tokenString = tokenParts[1];

  jwt.verify(tokenString, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
