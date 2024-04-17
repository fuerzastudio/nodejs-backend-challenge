const { body } = require("express-validator");

module.exports.login = [
  body("email", "Email can`t be empty").not().isEmpty(),
  body("email", "Invalid email format").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 4,
  }),
];
