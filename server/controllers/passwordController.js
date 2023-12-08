const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const VerificationToken = require("../models/VerifcationToken");
const sendEmails = require("../utils/sendEmails");
const {
  validateEmail,
  validatePassword,
  User,
} = require("../models/userModel");
const { log } = require("console");

/**
 * @description sendResetLink
 * @router /api/password/reset
 * @method POST
 * @access public
 */

const sendResetLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateEmail(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email } = req.body;
  const emailExists = await User.findOne({ email });
  if (!emailExists) {
    return res.status(404).json({ message: "This email doesn't exist" });
  }

  let verficationToken = await VerificationToken.findOne({
    user: emailExists._id,
  });
  if (!verficationToken) {
    verficationToken = new VerificationToken({
      user: emailExists._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verficationToken.save();
  }

  const link = `http://localhost:5173/auth/reset/${emailExists._id}/${verficationToken.token}`;
  const htmlTemplate = `<p><a href="${link}" >${link}</a></p>`;
  await sendEmails(emailExists.email, "Verify your email", htmlTemplate);

  res.status(201).json({ message: "We sent to you a link to reset password" });
});

/**
 * @description check valid link
 * @router /api/password/reset/:userId/:token
 * @method GET
 * @access public
 */

const CheckValidCtrl = asyncHandler(async (req, res) => {
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
  res.status(200).json({ message: "Valid Link" });
});

/**
 * @description reset new password
 * @router /api/password/reset/:userId/:token
 * @method POST
 * @access public
 */

const resetPasswordCtrl = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { error } = validatePassword(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findById(req.params.userId);
  console.log("good");
  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }
  const verificationToken = await VerificationToken.findOne({
    user: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid link" });
  }

  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();

  const deletionResult = await VerificationToken.deleteOne({
    user: user._id,
    token: req.params.token,
  });

  if (deletionResult.deletedCount === 0) {
    console.error("Verification Token not found or not deleted.");
  }
  res.status(200).json({ message: "Your password was reseted !" });
});

module.exports = {
  sendResetLinkCtrl,
  resetPasswordCtrl,
  CheckValidCtrl,
};
