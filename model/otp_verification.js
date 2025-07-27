const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema({
  phoneNumber: {},
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const OtpVerification = mongoose.model(
  "OtpVerification",
  otpVerificationSchema
);

module.exports = OtpVerification;
