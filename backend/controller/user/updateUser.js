const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;  // Logged-in user ID (from authentication middleware)
        const { userId, name, email, address } = req.body;  // `userId` passed in the request body
        const targetUserId = userId || sessionUser;  // If `userId` is not provided, assume the session user is updating themselves

        // Debugging logs
        console.log("sessionUser (from token):", sessionUser);
        console.log("userId (from request body):", userId);
        console.log("Target user for update:", targetUserId);

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(address && { address }),
        };

        const sessionUserDetails = await userModel.findById(sessionUser);
        if (!sessionUserDetails) {
            console.log("Session user not found in DB.");
            return res.status(404).json({
                message: "Session user not found",
                error: true,
                success: false
            });
        }

        // Prevent non-admin users from updating roles, force role to 'GENERAL'
        if (sessionUserDetails.role !== "ADMIN") {
            payload.role = "GENERAL";
        }

        console.log("Payload to update:", payload);

        const updatedUser = await userModel.findByIdAndUpdate(targetUserId, payload, { new: true });
        
        if (!updatedUser) {
            console.log("User to be updated not found in DB.");
            return res.status(404).json({
                message: "User to be updated not found",
                error: true,
                success: false
            });
        }

        // Fetch the user again to confirm changes were made
        const freshUser = await userModel.findById(targetUserId);
        console.log("Updated user after update:", freshUser); // Log the updated user details

        res.json({
            data: freshUser, // Return the freshly updated user
            message: "User Updated",
            success: true,
            error: false
        });
    } catch (err) {
        console.log("Error during user update:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
