const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const OtpVerification = require("../model/otp_verification");

const sendVerificationCode = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }
    console.log(phoneNumber);
    const client = new twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const message = `Your verification code is ${verificationCode}`;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    await OtpVerification.create({
      phoneNumber,
      verificationCode,
    });

    return res
      .status(200)
      .json({ success: true, message: "Verification code sent" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return res.status(500).json({ error: error.message });
  }
};

const verifyVerificationCode = async (req, res) => {
  try {
    const { phoneNumber, verificationCode } = req.body;

    const otp = await OtpVerification.findOne({
      phoneNumber,
      verificationCode,
    });
    if (!otp) {
      throw new Error("Invalid verification code");
    }
    const user = await User.findOne({ phoneNumber });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).json({ token });
    }

    const newUser = await User.create({ phoneNumber });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error verifying verification code:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { sendVerificationCode, verifyVerificationCode };
