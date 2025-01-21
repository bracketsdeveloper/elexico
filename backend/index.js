const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require("./routes");
const cookieParser = require('cookie-parser');

const app = express();

// CORS Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from your frontend domain
    credentials: true, // Allow cookies to be sent with requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
}));

app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies

// Middleware to handle setting SameSite=None for cookies
app.use((req, res, next) => {
    // This will ensure that all cookies have the SameSite=None and Secure flags
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

    // Ensure cookies are set with SameSite=None and Secure attributes
    res.cookie('yourCookieName', 'cookieValue', {
        httpOnly: true,       // Prevents XSS attacks
        secure: true,         // Ensures cookies are only sent over HTTPS
        sameSite: 'None',     // Allows cross-site cookies
    });

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

// API Routes
app.use("/api", router);

// Set the PORT from the environment or fallback to 8080
const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log(`Server is listening on port ` + PORT);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});
