const express = require("express");
const router = express.Router();
const {
  sendVerificationCode,
  verifyVerificationCode,
} = require("../controller/auth");

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-verification-code", verifyVerificationCode);

module.exports = router;
