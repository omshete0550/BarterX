const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { generateRefreshToken } = require("../utils/generateToken");
const sendEmail = require("../utils/email");

const clientOrigin = () => (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",")[0].trim();
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth",
});
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, avatar: user.avatar, isEmailVerified: user.isEmailVerified });
const issueSession = (res, user) => {
    res.cookie("refreshToken", generateRefreshToken(user._id, user.refreshTokenVersion), cookieOptions());
    return { user: publicUser(user), token: generateToken(user._id) };
};
const verificationLink = (token) => `${clientOrigin()}/verify-email?token=${token}`;

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (await User.findOne({ email: email.toLowerCase() })) {
            const error = new Error("An account with this email already exists.");
            error.statusCode = 409;
            return next(error);
        }
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 12),
            emailVerificationToken: hashToken(verificationToken),
            emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
        });
        await sendEmail({ to: user.email, subject: "Verify your BarterX email", text: `Verify your account: ${verificationLink(verificationToken)}` });
        return res.status(201).json({ success: true, message: "Account created. Check your email to verify it.", data: issueSession(res, user) });
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
        const user = await User.findById(req.user.userId).select("-password -refreshTokenVersion -passwordResetToken -emailVerificationToken");
        if (!user) { const error = new Error("User not found."); error.statusCode = 404; return next(error); }
        return res.json({ success: true, data: { user } });
    } catch (error) { next(error); }
};

const verifyEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ emailVerificationToken: hashToken(req.body.token), emailVerificationExpires: { $gt: Date.now() } });
        if (!user) { const error = new Error("Verification link is invalid or expired."); error.statusCode = 400; return next(error); }
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        return res.json({ success: true, message: "Email verified successfully." });
    } catch (error) { next(error); }
};

const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (user) {
            const token = crypto.randomBytes(32).toString("hex");
            user.passwordResetToken = hashToken(token);
            user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
            await user.save();
            await sendEmail({ to: user.email, subject: "Reset your BarterX password", text: `Reset your password: ${clientOrigin()}/reset-password?token=${token}` });
        }
        return res.json({ success: true, message: "If the account exists, a password-reset link has been sent." });
    } catch (error) { next(error); }
};

const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ passwordResetToken: hashToken(req.body.token), passwordResetExpires: { $gt: Date.now() } });
        if (!user) { const error = new Error("Reset link is invalid or expired."); error.statusCode = 400; return next(error); }
        user.password = await bcrypt.hash(req.body.password, 12);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        user.refreshTokenVersion += 1;
        await user.save();
        return res.json({ success: true, message: "Password reset successfully.", data: issueSession(res, user) });
    } catch (error) { next(error); }
};

module.exports = { register, login, refresh, logout, getMe, verifyEmail, forgotPassword, resetPassword };
