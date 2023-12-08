const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { Post } = require("../models/postModel");
const { Comment } = require("../models/commentModel");

const {
  uploadImageToCloudinary,
  deleteImageToCloudinary,
  deleteMultipleImageToCloudinary,
} = require("../utils/cloudinary");
const { log } = require("console");
/**
 * @description Get All User Profile
 * @router /api/users/profile
 * @method GET
 * @access private (only Admin)
 */

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**
 * @description Get  User Profile
 * @router /api/users/profile/:id
 * @method GET
 * @access public
 */

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "user",
        select: "-password", // Exclude the password field from the populated "user" field
      },
    });

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  res.status(200).json(user);
});

/**
 * @description Update  User Profile
 * @router /api/users/profile/:id
 * @method PUT
 * @access private (only user himself)
 */
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the password is provided in the request body
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  // Build the update object based on the fields provided in the request
  const updateObject = {
    username: req.body.username,
    bio: req.body.bio,
  };

  // Only include the password field if it is provided in the request
  if (req.body.password) {
    updateObject.password = req.body.password;
  }

  // Perform the update
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: updateObject },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});

/**
 * @description Get  User Count
 * @router /api/users/count
 * @method GET
 * @access private(only admin)
 */

module.exports.getUserCountCtrl = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  res.status(200).json(users);
});

/**
 * @description Upload user profile
 * @router /api/users/profile/photo
 * @method POST
 * @access private (only loged in user)
 */

module.exports.porfilePhotoCtrl = asyncHandler(async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const user = await User.findById(req.user.id);

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await uploadImageToCloudinary(imagePath);

  console.log("before");

  if (user.profilePhoto.public_id !== null) {
    await deleteImageToCloudinary(user.profilePhoto.public_id);
  }

  console.log("after");

  user.profilePhoto = {
    url: result.secure_url,
    public_id: result.public_id,
  };

  await user.save();

  res.status(200).json({
    message: "Image uploaded successfully !",
    profilePhoto: { url: result.secure_url, public_id: result.public_id },
  });
  fs.unlinkSync(imagePath);
});

/**
 * @description Delete user profile
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private(only admin or current user)
 */

module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found !" });
  }
  if (user.profilePhoto.public_id !== null) {
    await deleteImageToCloudinary(user.profilePhoto.public_id);
  }

  const posts = await Post.find({ user: user._id });
  const publicIds = posts?.map((post) => post.postPhoto.public_id);
  if (publicIds?.length > 0) {
    await deleteMultipleImageToCloudinary(publicIds);
  }

  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Your account was deleted successfully !" });
});
