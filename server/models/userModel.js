const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        public_id: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// User Modal
const User = mongoose.model("User", userSchema);
// Validate register user
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(5).max(50).required(),
    email: Joi.string().trim().min(5).max(50).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}
// generate token
// userSchema.methods.generateToken = function () {
//   return jwt.sign(
//     { id: this._id, isAdmin: this.isAdmin },
//     process.env.ACCESS_TOKEN_SECRET
//   );
// };

// Validate register user
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(50).required().email(),
    password: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate register user
function validateUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(5).max(50),
    password: Joi.string().trim().min(8).allow(""), // Making password optional and allowing empty string
    bio: Joi.string(),
  });
  return schema.validate(obj);
}

// validate email
function validateEmail(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(50).required().email(),
  });
  return schema.validate(obj);
}

// validate password
function validatePassword(obj) {
  const schema = Joi.object({
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmail,
  validatePassword,
};
