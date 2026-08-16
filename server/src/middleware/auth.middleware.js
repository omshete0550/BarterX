const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const error = new Error("Authentication required.");
            error.statusCode = 401;
            return next(error);
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            const error = new Error("Invalid authorization format.");
            error.statusCode = 401;
            return next(error);
        }

        const token = parts[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        error.statusCode = 401;
        error.message = "Invalid or expired token.";
        next(error);
    }
};

module.exports = protect;