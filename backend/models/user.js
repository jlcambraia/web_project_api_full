const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("user", userSchema);
