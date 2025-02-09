// backend/controller/user/userSignup.js
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, address } = req.body; 

        // Basic validations
        if (!name) throw "Please provide name";
        if (!email) throw "Please provide email";
        if (!password) throw "Please provide password";

        // Validate address fields if you want them mandatory
        if (!address || !address.street || !address.city || !address.state || !address.postalCode || !address.country) {
            throw "Please provide complete address information (street, city, state, postalCode, country)";
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) throw "User already exists";

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours

        // Create new user payload
        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
            address,
            role: "GENERAL",
            isVerified: false,
            verificationToken,
            verificationTokenExpiry
        });

        // Save user
        const savedUser = await newUser.save();

        // SEND VERIFICATION EMAIL
        // You must configure your transporter with your email service
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or another service
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS  // your email password or app password
            }
        });

        // Verification link (example route: /verify-email?token=...)
        const verificationLink = `https://elexico-eura.vercel.app/verify-email?token=${verificationToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,        // your email
            to: savedUser.email,                 // user's email
            subject: 'Verify your email address',
            html: `
                <h1>Email Verification</h1>
                <p>Hi ${savedUser.name}, please verify your email by clicking the link below:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>This link will expire in 24 hours.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        // Return success
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully. Verification email sent."
        });
    } catch (err) {
        console.error("Error in userSignUpController:", err);
        res.status(500).json({
            message: err || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
