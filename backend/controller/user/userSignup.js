const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, address } = req.body; // Include address in destructuring

        // Check if name, email, and password are provided
        if (!name) throw "Please provide name";
        if (!email) throw "Please provide email";
        if (!password) throw "Please provide password";

        // Check if complete address information is provided
        if (!address || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
            throw "Please provide complete address information (street, city, state, postalCode, country)";
        }

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) throw "User already exists";

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) throw "Something went wrong while hashing the password";

        // Prepare the payload for the new user
        const payload = {
            name,
            email,
            role: "GENERAL",
            password: hashPassword,
            address // Include address in the payload
        };

        // Save the new user
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        console.log("User saved:", saveUser); // Log the saved user

        // Respond with success message
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err) {
        console.error("Error in userSignUpController:", err); // Log any errors
        res.status(500).json({
            message: err || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
