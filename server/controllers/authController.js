const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/userModel");
const VerificationToken = require("../models/VerifcationToken");
const sendEmails = require("../utils/sendEmails");

/**
 * @description Register User
 * @router /api/auth/register
 * @method POST
 * @access public
 */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Email is already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  const verficationToken = new VerificationToken({
    user: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  await verficationToken.save();

  const link = `http://localhost:5173/users/${user._id}/verify/${verficationToken.token}`;

  const htmlTemplate = `<p><a href="${link}" >${link}</a></p>`;

  await sendEmails(user.email, "Verify your email", htmlTemplate);

  res
    .status(201)
    .json({ message: "We sent to you a link to verify your email" });
});

/**
 * @description Login User
 * @router /api/auth/login
 * @method POST
 * @access public
 */

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Email or password is invalid" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email or password is invalid" });
  }

  if (!user.isAccountVerified) {
    res
      .status(400)
      .json({ message: "You must verifiy your account !" });
  }

  const token = await jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.ACCESS_TOKEN_SECRET
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
    maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  });

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token: token,
    user: user.username,
  });
});

/**
 * @description Register User
 * @router /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 */

module.exports.verfiyUserAccountCtrl = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }
  const verificationToken = await VerificationToken.findOne({
    user: req.params.userId,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link" });
  }
  user.isAccountVerified = true;
  await user.save();

  const deletionResult = await VerificationToken.deleteOne({
    user: user._id,
    token: req.params.token,
  });

  if (deletionResult.deletedCount === 0) {
    console.error("Verification Token not found or not deleted.");
  }
  res.status(200).json({ message: "Your account was verified !" });
});
