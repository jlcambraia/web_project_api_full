const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Jacques Cousteau",
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: "Explorer",
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
      validate: {
        validator: (v) => {
          return /(http:\/\/|https:\/\/)(www\.)?(.+)(\/)?(#)?/gi.test(v);
        },
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Email ou Senha inválidos"));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Email ou Senha inválidos"));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
