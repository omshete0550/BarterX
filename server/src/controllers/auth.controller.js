const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { generateRefreshToken } = require("../utils/generateToken");

const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
});
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, avatar: user.avatar });
const issueSession = (res, user) => {
    res.cookie("refreshToken", generateRefreshToken(user._id, user.refreshTokenVersion), cookieOptions());
    return { user: publicUser(user), token: generateToken(user._id) };
};
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (await User.findOne({ email: email.toLowerCase() })) {
            const error = new Error("An account with this email already exists.");
            error.statusCode = 409;
            return next(error);
        }
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 12),
        });
        return res.status(201).json({ success: true, message: "Account created successfully.", data: issueSession(res, user) });
    } catch (error) { next(error); }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            const error = new Error("Invalid email or password.");
            error.statusCode = 401;
            return next(error);
        }
        return res.json({ success: true, message: "Login successful.", data: issueSession(res, user) });
    } catch (error) { next(error); }
};

const refresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) throw new Error("No active session.");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.type !== "refresh") throw new Error("Invalid session.");
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshTokenVersion !== decoded.version) throw new Error("Session has expired.");
        return res.json({ success: true, data: issueSession(res, user) });
    } catch (error) {
        error.statusCode = 401;
        error.message = "Session has expired. Please sign in again.";
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.type === "refresh") await User.findByIdAndUpdate(decoded.userId, { $inc: { refreshTokenVersion: 1 } });
            } catch { /* An expired cookie still needs clearing. */ }
        }
        res.clearCookie("refreshToken", cookieOptions());
        return res.json({ success: true, message: "Logged out successfully." });
    } catch (error) { next(error); }
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password -refreshTokenVersion");
        if (!user) { const error = new Error("User not found."); error.statusCode = 404; return next(error); }
        return res.json({ success: true, data: { user } });
    } catch (error) { next(error); }
};

module.exports = { register, login, refresh, logout, getMe };
