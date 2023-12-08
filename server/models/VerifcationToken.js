const mongoose = require("mongoose");
const Joi = require("joi");
const verificationTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Post Modal
const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

module.exports = VerificationToken;
