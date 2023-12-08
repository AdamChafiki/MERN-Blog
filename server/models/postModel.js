const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postPhoto: {
      type: Object,
      default: {
        url: "",
        public_id: null,
      },
    },
    category: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

// Post Modal
const Post = mongoose.model("Post", postSchema);

// Validate create post
function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(50).required(),
    description: Joi.string().trim().min(5).max(100).required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate create post
function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(50),
    description: Joi.string().trim().min(5).max(100),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = { Post, validateCreatePost, validateUpdatePost };
