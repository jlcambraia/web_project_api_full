const { celebrate, Joi } = require("celebrate");
const validateURL = require("./validateUrl");

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
