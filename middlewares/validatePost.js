const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
});

function validatePost(req, res, next) {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validatePost;
