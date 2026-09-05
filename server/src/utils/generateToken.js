const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign(
        {
            userId,
            type: "access",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

const generateRefreshToken = (userId, version) => jwt.sign(
    { userId, version, type: "refresh" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
);

module.exports = generateToken;
module.exports.generateRefreshToken = generateRefreshToken;
