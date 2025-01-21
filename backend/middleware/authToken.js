require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        // Retrieve the token from cookies or Authorization header
        const tokenFromCookie = req.cookies?.token;
        let tokenFromHeader = req.headers['authorization'];

        // Extract Bearer token if available
        if (tokenFromHeader && tokenFromHeader.startsWith('Bearer ')) {
            tokenFromHeader = tokenFromHeader.slice(7, tokenFromHeader.length); // Remove 'Bearer ' from string
        }

        // Use token from cookie or Authorization header
        const token = tokenFromCookie || tokenFromHeader;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required. Please login.",
                error: true,
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT verification error: ", err);
                return res.status(403).json({
                    message: "Invalid or expired token. Please login again.",
                    error: true,
                    success: false,
                });
            }

            // Set the user ID in the request object for further use
            req.userId = decoded._id;

            // Proceed to the next middleware
            next();
        });

    } catch (err) {
        console.error("Error in authToken middleware: ", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
