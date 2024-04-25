const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateAuth(req, res, next) {
  const { error } = authSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateAuth;
