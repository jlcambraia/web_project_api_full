const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const validateCardLink = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  validateAvatar,
  validateCardLink,
};
