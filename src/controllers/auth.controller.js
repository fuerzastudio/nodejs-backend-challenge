const jwt = require("jsonwebtoken");
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = await jwt.sign({ user: user }, 'secret', {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true }, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error'});
  }
};

module.exports = {
  login,
};
