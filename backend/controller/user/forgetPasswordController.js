const userModel = require('../../models/userModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    console.log(`Generated Token: ${resetToken}, Expiry: ${resetTokenExpiry}`); // Debugging

    await user.save();

    const appBaseUrl = process.env.FRONTEND_URL;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "prakritiwoodpressed@gmail.com",
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `${appBaseUrl}/reset-password?token=${resetToken}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Password reset link has been sent to your email',
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error in forgetPasswordController:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = forgetPasswordController;
