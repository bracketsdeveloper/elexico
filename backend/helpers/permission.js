const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        // Ensure userId exists
        if (!userId) {
            throw new Error("User ID is missing");
        }

        // Find the user by ID
        const user = await userModel.findById(userId);

        // Check if the user exists
        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user has admin privileges
        if (user.role !== 'ADMIN') {
            return false;
        }

        // Permission granted
        return true;
    } catch (error) {
        console.error("Error in uploadProductPermission:", error.message);
        return false; // Return false if any error occurs
    }
};

module.exports = uploadProductPermission;
