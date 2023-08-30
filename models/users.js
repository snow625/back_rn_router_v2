const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseSchemaError } = require("../helpers");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseSchemaError);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().trim().required(),
});

const schemas = {
  registerSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
