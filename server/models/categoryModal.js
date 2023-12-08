const mongoose = require("mongoose");
const Joi = require("joi");
const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Post Modal
const Category = mongoose.model("Category", categorySchema);

// Validate create post
function validateCreateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate update post
function validateUpdateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = { Category, validateCreateCategory, validateUpdateCategory };
