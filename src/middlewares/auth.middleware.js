const jwtService = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const jwt = req.headers["authorization"];

  if (process.env.NODE_ENV == "test") {
    next();
    return;
  }

  jwtService.verify(jwt, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateUser,
};
