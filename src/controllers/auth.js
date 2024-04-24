const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

SECRET_KEY = process.env.SECRET_KEY;

// Function to authenticate a user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  login,
};
