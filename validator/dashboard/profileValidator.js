const {body} = require('express-validator')
const validator = require('validator')

const linkValidator = value => {
  if (value) {
    if (!validator.isURL(value)) {
      throw new Error("Please Provide Valid URL");
    }
  }
  return true
};

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name Can Not Be Empty")
    .isLength({ max: 50 })
    .withMessage("Name Can Not Be More Than 50 Chars")
    .trim(),
  body("tittle")
    .not()
    .isEmpty()
    .withMessage("Titlte Can not Be Empty")
    .isLength({ max: 100 })
    .withMessage("Tittle can not be more than 100 chars")
    .trim(),
  body("bio")
    .not()
    .isEmpty()
    .withMessage("Bio Can not Be Empty")
    .isLength({ max: 500 })
    .withMessage("Bio can not be more than 500 chars")
    .trim(),

  body("website").custom(linkValidator),
  body("facebook").custom(linkValidator),
  body("twitter").custom(linkValidator),
  body("github").custom(linkValidator),
];