const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/commentModel");
const { User } = require("../models/userModel");

/**
 * @description Create new comment
 * @router /api/comments
 * @method POST
 * @access private (only logged user)
 */

module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  // Create the comment without populating the 'user' field
  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    username: profile.username,
  });

  // Now, populate the 'user' field in the comment with additional information from the User model
  const populatedComment = await Comment.findById(comment._id).populate("user");

  res.status(201).json(populatedComment);
});

/**
 * @description Create all comments
 * @router /api/comments
 * @method GET
 * @access private (only admin)
 */

module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user", ["-passsword"]);

  res.status(200).json(comments);
});

/**
 * @description Delete  comment by id
 * @router /api/comments/:id
 * @method DELETE
 * @access private (only admin or owen of comment)
 */

module.exports.DeleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found !" });
  }

  if (req.user.isAdmin || req.user.id === comment.user._id.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Comment has been deleted" });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
});

/**
 * @description Update  comment by id
 * @router /api/comments/:id
 * @method PUT
 * @access private (owen of comment)
 */

module.exports.UpdateCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found !" });
  }

  if (req.user.id === comment.user._id.toString()) {
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    ).populate("user");
    return res
      .status(200)
      .json({ message: "Comment has been updated", updateComment });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
});
