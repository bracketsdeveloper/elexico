const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: 'Please provide token and new password',
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date().toISOString() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid or expired Link',
        error: true,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password has been reset successfully',
      success: true,
      error: false,
    });
  } catch (err) {
    console.error('Error in resetPasswordController:', err);
    res.status(500).json({
      message: err.message || 'Internal Server Error',
      error: true,
      success: false,
    });
  }
};

module.exports = resetPasswordController;
