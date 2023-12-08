const mongoose = require("mongoose");
const Joi = require("joi");
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Post Modal
const Comment = mongoose.model("Comment", commentSchema);

// Validate create post
function validateCreateComment(obj) {
  const schema = Joi.object({
    postId: Joi.string().required(),
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate update post
function validateUpdateComment(obj) {
  const schema = Joi.object({
    text: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = { Comment, validateCreateComment, validateUpdateComment };
