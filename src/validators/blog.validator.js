const { body } = require('express-validator')

module.exports.create = [
  body('title', 'Title can`t be empty').not().isEmpty(),
  body('body', 'Body can`t be empty').not().isEmpty(),
  body('tags', 'Tags can`t be empty').not().isEmpty(),
]
