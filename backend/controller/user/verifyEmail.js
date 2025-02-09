// backend/controller/user/verifyEmail.js
const userModel = require("../../models/userModel");

async function verifyEmailController(req, res) {
  try {
    const { token } = req.query;  // e.g., /verify-email?token=abc123
    
    if (!token) {
      return res.status(400).json({ success: false, message: "Missing token" });
    }

    const user = await userModel.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() } // check token not expired
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error("Error in verifyEmailController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

module.exports = verifyEmailController;
