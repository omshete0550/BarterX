const express = require("express");
const { rateLimit } = require("express-rate-limit");
const { body } = require("express-validator");
const { register, login, refresh, logout, getMe, verifyEmail, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middleware/validation.middleware");
const protect = require("../middleware/auth.middleware");

const router = express.Router();
const sensitiveLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false, message: { success: false, message: "Too many attempts. Please try again later." } });
const emailValidator = [body("email").isEmail().withMessage("A valid email is required")];
const tokenValidator = [body("token").isString().isLength({ min: 32, max: 128 }).withMessage("A valid token is required")];
const resetValidator = [...tokenValidator, body("password").isString().isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters")];

router.post("/register", sensitiveLimit, registerValidator, validate, register);
router.post("/login", sensitiveLimit, loginValidator, validate, login);
router.post("/refresh", sensitiveLimit, refresh);
router.post("/logout", logout);
router.post("/verify-email", sensitiveLimit, tokenValidator, validate, verifyEmail);
router.post("/forgot-password", sensitiveLimit, emailValidator, validate, forgotPassword);
router.post("/reset-password", sensitiveLimit, resetValidator, validate, resetPassword);
router.get("/me", protect, getMe);

module.exports = router;
