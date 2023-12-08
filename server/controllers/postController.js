const path = require("path");
const fs = require("fs");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/postModel");
const asyncHandler = require("express-async-handler");
const {
  uploadImageToCloudinary,
  deleteImageToCloudinary,
} = require("../utils/cloudinary");
const { Comment } = require("../models/commentModel");
const { User } = require("../models/userModel");

/**
 * @description Create new post
 * @router /api/posts/create
 * @method POST
 * @access private (only logged user)
 */

module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file priveded !" });
  }
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await uploadImageToCloudinary(imagePath);

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    postPhoto: {
      url: result.secure_url,
      public_id: result.public_id,
    },
    user: req.user.id,
  });
  await post.populate("user");
  res.status(201).json(post);
  fs.unlinkSync(imagePath);
});

/**
 * @description Get all posts
 * @router /api/posts
 * @method GET
 * @access public
 */

module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 4;
  const { page, category } = req.query;
  let posts;
  if (page) {
    posts = await Post.find()
      .skip((page - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"])
      .populate("comments");
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"])
      .populate("comments");
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"])
      .populate("comments");
  }
  res.status(200).json(posts);
});

/**
 * @description Get single post
 * @router /api/posts/:id
 * @method GET
 * @access public
 */

module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
    .populate("user", ["-password"])
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: User,
        select: "-password", // Exclude password field from the populated user
      },
    });

  if (!post) {
    res.status(404).json({ message: "Post not found!" });
    return;
  }

  res.status(200).json(post);
});
/**
 * @description Get posts count
 * @router /api/posts/count
 * @method GET
 * @access public
 */

module.exports.getCountPostCtrl = asyncHandler(async (req, res) => {
  const posts = await Post.countDocuments();
  res.status(200).json(posts);
});

/**
 * @description Delete single post
 * @router /api/posts/:id
 * @method DELETE
 * @access private (only currentUser or admin )
 */

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]);
  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }
  if (req.user.isAdmin || req.user.id === post.user._id.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await deleteImageToCloudinary(post.postPhoto.public_id);
    await Comment.deleteMany({ postId: post._id });
    res.status(200).json({ message: "Your post was deleted successfully !" });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
});

/**
 * @description Update  post
 * @router /api/post/:id
 * @method PUT
 * @access private (only user himself)
 */
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id).select("-password");
  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }
  if (req.user.id !== post.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  res.status(200).json(updatePost);
});

/**
 * @description Update post image
 * @router /api/posts/upload/:id
 * @method POST
 * @access private (only loged in user)
 */

module.exports.postPhotoCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file priveded !" });
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }

  if (req.user.id !== post.user._id.toString()) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await deleteImageToCloudinary(post.postPhoto.public_id);

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await uploadImageToCloudinary(imagePath);

  const updatePostImage = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        postPhoto: {
          url: result.secure_url,
          public_id: result.public_id,
        },
      },
    },
    { new: true }
  ).populate("user", ["-password"]);
  res.status(200).json(updatePostImage);

  fs.unlinkSync(imagePath);
});

/**
 * @description Toggle like
 * @router /api/like/:id
 * @method PUT
 * @access private (only user logged in)
 */

module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found !" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === req.user.id
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likes: req.user.id,
        },
      },
      {
        new: true,
      }
    ).populate("user");
  } else {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          likes: req.user.id,
        },
      },
      {
        new: true,
      }
    ).populate("user");
  }
  res.status(200).json(post);
});

/**
 * @description Get the latest 4 posts
 * @router /api/posts/latest
 * @method GET
 * @access public
 */

module.exports.getLatestPostsCtrl = asyncHandler(async (req, res) => {
  const latestPosts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .populate("user", ["-password"]);
  res.status(200).json(latestPosts);
});
